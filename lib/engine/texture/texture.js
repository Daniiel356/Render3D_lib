import {AtlasPacker} from "./packer.js";

export function createTexture(gl, type, data){
    if(type==0)return colorTexture(gl, data);
}

function colorTexture(gl, data){
    const texture=gl.createTexture();
    const img=new Uint8Array([data.r, data.g, data.b, data.a]);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, 
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNALED,
        img
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}


export class TextureManager{
    gl=document.querySelector("canvas").getContext("webgl2");
    textures=[];
    packager=new AtlasPacker()

    constructor(gl){
        this.gl=gl;
    }

    colorTexture(data){
        const gl=this.gl;
        const texture=gl.createTexture();
        const img=new Uint8Array([data.r, data.g, data.b, data.a]);
    
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0, 
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNALED,
            img
        );
        gl.bindTexture(gl.TEXTURE_2D, null);
        return this.add({texture, size: {w: 1, h:1}});
    }

    add(texture){
        if(!this.textures.includes(texture))this.textures.push(texture);
        return this.textures.length-1;
    }
    getTexturesSizes(){
        const res=[];

        this.textures.forEach(e=>{
            if(!res.includes([e.size.w, e.size.h]))res.push([e.size.w, e.size.h]);
        });
        
        return res;
    }
}
