export function createFragmentTextures(sizes){
    let str="";

    sizes.forEach(e=>{
        str+="uniform sampler2DArray u_t"+e[0]+"x"+e[1]+";\n";
    });
    
    rerurn `#version 300 es
    presicion mediump float;

    ${str}

    in int b_textureSize;
    in int b_textureId;
    in vec2 b_uv;
    out vec4 out_Color;

    void main(){
        
    }
    `;
}