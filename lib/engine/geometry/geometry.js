export class GeometryType{
    gl=document.querySelector("canvas").getContext("webgl2"); //TEMPORARL: para usar el autocompletado
    baseBuffer;
    vao;

    constructor(gl, base, atribs){
        const baseBuffer=gl.createBuffer();
        const vao=gl.createVertexArray();

        gl.bindBuffer(gl.ARRAY_BUFFER, baseBuffer);
        gl.bindVertexArray(vao);

        atribs.forEach((e)=>{
            gl.enableVertexAttribArray(e.pos);
            gl.vertexAttribPointer(
                e.pos,
                e.size,
                e.normalize,
                e.stride,
                e.offset
            );
        });

        gl.bindVertexArray(null);
        
        this.gl=gl;
        this.baseBuffer=baseBuffer;
        this.vao=vao;
    }
}