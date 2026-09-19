import {AtlasPacker} from "./packer.js";

export class TextureManager{
    manipCanvas=document.createElement("canvas");
    gl=document.querySelector("canvas")?.getContext("webgl2");
    textures=[];
    packager=new AtlasPacker(4096, 4096);

    constructor(gl){
        this.gl=gl;
    }


    colorTexture(data){
        let x={...{r:0,g:0,b:0,a:1},...data};
        const c=this.manipCanvas;
        const ctx=c.getContext("2d");
        c.width=1; c.height=1;
        ctx.fillStyle=`rgba(${x.r}, ${x.g}, ${x.b}, ${x.a})`;
        ctx.fillRect(0,0,1,1);
        const img=new Image(1,1);
        return new Promise(res=>{
            img.onload=()=>{
                res(img);
            }
            img.src=c.toDataURL("image/png");
        });
    }

    add(img){
        const texture=new Texture(this.textures.length, img);
        this.textures.push(texture);
        return texture;
    }
    async loadTextures(id){
        const [canvas, uvs]=await this.packager.generateAtlas(this.textures.map(e=>e.img));
        this.textures.forEach(e=>{
            const uv=uvs.find(y=>y.id==e.id).data;
            [e.x, e.y, e.xw, e.yh]=uv;
        });
        const img=new Image();

        await new Promise((res)=>{
            img.onload=res;
            img.src=canvas.toDataURL("image/png");
        });
        
        const gl=this.gl;
        const texture=gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            gl.NEAREST
        );
        
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MAG_FILTER,
            gl.NEAREST
        );

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img
        );
        gl.activeTexture(gl["TEXTURE"+id]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
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
    get uvs(){return [this.x, this.y, this.xw, this.yh]};
}