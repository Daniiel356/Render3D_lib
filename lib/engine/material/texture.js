export function createTexture(gl, type, data){
    if(type==0)return colorTexture(gl, data);
}

function colorTexture(gl=document.querySelector("canvas").getContext("webgl2"), data){
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