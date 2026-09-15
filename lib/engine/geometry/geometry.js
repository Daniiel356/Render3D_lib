export class GeometryType{
    gl=document.querySelector("canvas").getContext("webgl2"); //TEMPORARL: para usar el autocompletado
    baseBuffer;
    vao;

    constructor(gl, base, atribs){
        this.baseBuffer=gl.createBuffer();
        this.vao=gl.createVertexArray();

        
        this.gl=gl;
    }
}