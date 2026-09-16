import {GeometryType} from "./geometry/geometry.js";

export class Renderer{
    canvas=document.createElement("canvas");
    gl=this.canvas.getContext("webgl2");
    geometries=[];

    constructor(){
        this.gl.clearColor(0,0,0,0.8);
        
        window.addEventListener("resize", this.resize)
        this.resize();
    }

    compileShader(source, type){
        const gl=this.gl;
        const s=gl.createShader(gl[type])
        gl.shaderSource(s, source);
        gl.compileShader(s);

        if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
            throw new Error("Error al compilar el shader:\n"+gl.getShaderInfoLog(s));
        }
        return s;
    }
    createProgram(vertex, fragment){
        const gl=this.gl;
        const p=gl.createProgram();

        gl.attachShader(p, vertex);
        gl.attachShader(p, fragment);
        gl.linkProgram(p);

        if(!gl.getProgramParameter(p, gl.LINK_STATUS)){
            throw new Error("Error al crear el programa:\n"+gl.getProgramInfoLog(p));
        }
        return p;
    }
    
    resize(){
        const c=this.canvas;
        c.width=c.clientWidth;
        c.height=c.clientHeight;

        this.gl.viewport(0, 0, c.width, c.height);
    }
    loadGeometry(base, atribs){
        this.geometries.push(new GeometryType(this.gl, base, atribs));
        
    }

    clear(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    render(program){
        this.gl.useProgram(program);
        this.geometries.forEach(e=>{
            e.render();
        });
    }
}