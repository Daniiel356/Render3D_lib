#version 300 es
precision mediump float;

//uniform sampler2D u_texture;

//in vec2 b_uv;
out vec4 out_Color;

void main(){
    out_Color=vec4(1,0,0,1);//texture(u_texture, b_uv);
}