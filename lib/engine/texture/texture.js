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
    manipCanvas=document.createElement("canvas");
    gl=document.querySelector("canvas")?.getContext("webgl2");
    textures=[];
    packager=new AtlasPacker(4096, 4096);

    constructor(gl){
        this.gl=gl;
    }

    colorTexture(data){
        const c=this.manipCanvas;
        const ctx=c.getContext("2d");
        c.width=1; c.height=1;
        ctx.fillStyle=`rgba(${data.r},${data.g},${data.b},${data.a})`;
        ctx.fillRect(0,0,1,1);
        const img=new Image(1,1);
        let res;
        img.onload=()=>{
            res(img);
        }
        img.src=c.toDataURL("image/png");
        return new Promise((r)=>res=r);
    }

    add(img){
        const texture=new Texture(this.textures.length);
        this.textures.push(texture);
        return texture;
    }
    async loadTexture(){
        canst [canvad, uvs]=await this.packager.generateAtlas(this.textures.map(e=>e.img));
        alert(uvs);
    }
}

export class Texture{
    id=-1;
    x=0; y=0;
    xw=0; yh=0;
    img=null;

    constructor(id, img){
        this.id=id;
        this.img=img;
        img.identiefer=id;
    }
}