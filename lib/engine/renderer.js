import {GeometryType} from "./geometry/geometry.js";

export class Renderer{
    canvas=document.createElement("canvas");
    gl=this.canvas.getContext("webgl2");
    geometries=[];
    textures=[];
    textureBuffer=this.gl.createBuffer();

    constructor(){
        this.gl.clearColor(0,0,0,0.8);
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
    
    compileTexture(texture){
        this.textures.push(texture);
        const gl=this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bufferData()
    }
    resize(){
        const c=this.canvas;
        this.gl.viewport(0, 0, c.width, c.height);
    }
    loadGeometry(base, atribs, texture){
        this.geometries.push(new GeometryType(this.gl, base, atribs, texture));
        this.tempT=texture;
    }

    clear(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    render(program){
        const gl=this.gl;
        gl.useProgram(program);
        const location=gl.getUniformLocation(program, this.tempT.name);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.tempT.value);
        gl.uniform1i(location, 0);
        
        this.geometries.forEach(e=>{
            e.render();
        });
    }
}