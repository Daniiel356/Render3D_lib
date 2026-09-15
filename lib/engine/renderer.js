
export class Renderer{
    canvas=document.createElement("canvas");
    gl=this.canvas.getContext("webgl2");

    constructor(){
        this.gl.clearColor(0,0,0,0.8);
        
        window.addEventListener("resize", this.resize)
        this.resize();
    }
    resize(){
        const c=this.canvas;
        c.width=c.clientWidth;
        c.height=c.clientHeight;

        this.gl.viewport(0, 0, c.width, c.height);
    }

    clear(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}