import {Render} from "/lib/render.js";

const render=new Render();
const canvas=render.element;

document.body.appendChild(canvas);
render.resize();
const program=await render.createProgram("./lib/shaders/source/vertex_2D.glsl", "./lib/shaders/source/fragment_2D.glsl", 0)
const textureManager=render.textureManager;

const redTexture=textureManager.add(await textureManager.colorTexture({r:255}));
const cube=render.createGeometry(
    [
        0, 0,
        0, 1,
        1, 1,
        0, 0,
        1, 0,
        1, 1,
    ],
    [{
        pos: 0,
        size: 2,
        type: "FLOAT",
        normalize: false,
        stride: 0,
        offset: 0,
        base: true
    },{
        pos: 1,
        size: 2,
        type: "FLOAT",
        normalize: false,
        stride: 16,
        offset: 0,
    },{
         pos: 2,
         size: 2,
         type: "FLOAT",
         normalize: false,
         stride: 16,
         offset: 8
     }/*,{
         pos: 3,
         size: 2,
         type: "FLOAT",
         normalize: false,
         stride: 24,
         offset: 16
     }*/
    ]
);
await render.init();
alert(redTexture.uvs)
cube.addInstance([-0.25,-0.5, 0.5, 1])

render.draw(program);