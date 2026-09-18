#version 300 es

layout(location = 0) in vec2 a_base_pos;
layout(location = 1) in vec2 a_pos;
//layout(location = 2) in vec2 a_scale;
//layout(location = 3) in vec2 a_uv;

//out vec2 b_uv;

void main(){
    vec2 pos=a_base_pos+a_pos;//(a_base_pos * a_scale) + a_pos;
    gl_Position=vec4(pos, 0.0, 1.0);
 //   b_uv=a_uv;
}