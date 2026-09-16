import {Render} from "/lib/render.js";

const render=new Render();
const canvas=render.getElement();

document.body.appendChild(canvas);
const program=await render.createProgram("./lib/shaders/source/vertex_2D.glsl", "./lib/shaders/source/fragment_2D.glsl")

render.addGeometry(
    [
        -0.5,  0.5, 1, 0, 0, 1,
        -0.5, -0.5, 1, 0, 0, 1,
         0.5, -0.5, 1, 0, 0, 1,
         0.5, -0.5, 1, 0, 0, 1,
         0.5,  0.5, 1, 0, 0, 1,
        -0.5,  0.5, 1, 0, 0, 1
    ],
    [{
        pos: 0,
        size: 2,
        type: "FLOAT",
        normalize: false,
        stride: 24,
        offset: 0
    },
     {
         pos: 1,
         size: 4,
         type: "FLOAT",
         normalize: false,
         stride: 24,
         offset: 8
     }]
)
render.draw(program);