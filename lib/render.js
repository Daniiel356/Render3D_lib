import {Renderer} from "./engine/renderer.js";

export class Render{
    #engine=new Renderer();
    
    constructor(){
        window.addEventListener("resize", this.resize);
    }
    draw(program){
        this.#engine.clear();
        this.#engine.render(program);
    }
    
    addGeometry(base, atribs){
        this.#engine.loadGeometry(base, atribs)
    }
    
    async createProgram(vertexURL, fragmentURL){
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
            this.#engine.compileShader(fs, "FRAGMENT_SHADER")
        );
        return p;
    }
    resize(){
        const c=this.#engine.canvas;
        c.width=c.clientWidth;
        c.height=c.clientHeight;
        this.#engine.resize();
    }

    getElement=()=>this.#engine.canvas;
}