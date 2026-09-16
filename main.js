import {Render} from "/lib/render.js";

const render=new Render();
const canvas=render.getElement();

document.body.appendChild(canvas);
const program=await render.createProgram("./lib/shaders/source/vertex_2D.glsl", "./lib/shaders/source/fragment_2D.glsl")

render.addGeometry(
    [
        -0.5,  0.5,
        -0.5, -0.5,
         0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5,
        -0.5,  0.5
    ],
    [{
        pos: 0,
        size: 2,
        type: "FLOAT",
        normalize: false,
        stride: 8,
        offset: 0
    }]
)
render.draw(program);