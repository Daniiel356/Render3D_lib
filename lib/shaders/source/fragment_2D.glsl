#version 300 es
precision mediump float;

uniform sampler2D u_texture;

in vec2 b_uv;
out vec4 out_Color;

void main(){
    texture(u_texture, b_uv);
}