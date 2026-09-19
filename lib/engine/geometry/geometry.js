export class GeometryType{
    gl=document.querySelector("canvas").getContext("webgl2"); //TEMPORARL: para usar el autocompletado
    baseBuffer;
    instancesBuffer;
    vao;
    instances=[];
    baseCount=0;
    instanceCount=0;

    constructor(gl, base, atribs){
        const baseBuffer=gl.createBuffer();
        const instancesBuffer=gl.createBuffer();
        const vao=gl.createVertexArray();

        gl.bindBuffer(gl.ARRAY_BUFFER, baseBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(base), gl.STATIC_DRAW);
        gl.bindVertexArray(vao);

        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(
            0, 2, "FLOAT", false, 0, 0
        );
        
        const a=atribs.filter(e=>e[2]);
        const fa=[]; let aOffset=0;
        
        a.forEach((e)=>{
            fa.push([[...e], aOffset]);
            if(e[2]=="FLOAT"){
                offset+=e[1]*4;
            }
            alert()
        });
        
        gl.bindBuffer(gl.ARRAY_BUFFER, instancesBuffer);
        
        fa.forEach((e)=>{
            gl.enableVertexAttribArray(e.pos);
            gl.vertexAttribPointer(
                ...e[0],
                false,
                aOffset,
                e[1]
            );
            gl.vertexAttribDivisor(e.pos, 1)
        })

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        
        this.gl=gl;
        this.baseBuffer=baseBuffer;
        this.baseCount=base.length/2;
        this.instancesBuffer=instancesBuffer;
        this.vao=vao;
    }

    addInstance(instance){
        this.instances.push(...instance);
        this.instanceCount++;
    }
    
    render(){
        console.log(this.instanceCount, this.instances)
        const gl=this.gl;
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instancesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.instances), gl.DYNAMIC_DRAW);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, this.baseCount, this.instanceCount);
    }
}