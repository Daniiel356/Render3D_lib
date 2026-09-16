export class GeometryType{
    gl=document.querySelector("canvas").getContext("webgl2"); //TEMPORARL: para usar el autocompletado
    baseBuffer;
    vao;

    constructor(gl, base, atribs){
        const buffer=gl.createBuffer();
        const vao=gl.createVertexArray();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(base), gl.STATIC_DRAW);
        gl.bindVertexArray(vao);

        atribs.forEach((e)=>{
            gl.enableVertexAttribArray(e.pos);
            gl.vertexAttribPointer(
                e.pos,
                e.size,
                gl[e.type],
                e.normalize,
                e.stride,
                e.offset
            );
        });

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        
        this.gl=gl;
        this.baseBuffer=buffer;
        this.vao=vao;
    }
    render(){
        this.gl.bindVertexArray(this.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}