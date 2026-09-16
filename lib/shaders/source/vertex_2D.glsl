#version 300 es

layout(location = 0) in vec2 a_pos;
layout(location = 1) in vec4 a_color;
layout(location = 2) in vec2 a_uv;

out vec4 b_color;
out b_uv;

void main(){
    gl_Position=vec4(a_pos, 0.0, 1.0);
    b_color=a_color;
    b_uv=a_uv;
}