import {Renderer} from "./engine/renderer.js";

export class Render{
    #engine=new Renderer();
    
    constructor(){
        window.addEventListener("resize", this.resize);
    }

    async init(){
        await this.#engine.init();
    }
    draw(program){
        this.#engine.clear();
        this.#engine.render(program);
    }
    
    createGeometry(base, type){
        let atribs=[]
        if(type==this.BASIC_GEOMETRY){
            atrib=[
                [0, 2, "FLOAT", true],
                [1, 2, "FLOAT"],
                [2, 2, "FLOAT"],
                [3, 4, "FLOAT"]   
            ]
        }
        return this.#engine.loadGeometry(base, atribs)
    }
    
    async createProgram(vertexURL, fragmentURL, type){
        let vs, fs;
        vs=await fetch(vertexURL)
            .then(e=>e.text())
            .catch(e=>{
                throw new Error("Error al cargar vertexSource: "+e.message);
            });
        fs=await fetch(fragmentURL)
            .then(e=>e.text())
            .catch(e=>{
                throw new Error("Error al cargar fragmentSource: "+e);
            });
        const p=this.#engine.createProgram(
            this.#engine.compileShader(vs, "VERTEX_SHADER"),
            this.#engine.compileShader(fs, "FRAGMENT_SHADER"),
            type
        );
        return p;
    }
    resize(){
        const c=this.#engine.canvas;
        c.width=c.clientWidth;
        c.height=c.clientHeight;
        this.#engine.resize();
    }

    BASIC_GEOMETRY=0;

    get element(){return this.#engine.canvas};
    get textureManager(){return this.#engine.geometryTextureManager};
}