import {Render} from "/lib/render.js";
import {Material} from "./lib/engine/material.js";
    
const render=new Render();
const canvas=render.element;

document.body.appendChild(canvas);
render.resize();
const program=await render.createProgram("./lib/shaders/source/vertex_2D.glsl", "./lib/shaders/source/fragment_2D.glsl", 0)
const textureManager=render.textureManager;

const cube=render.createGeometry(
    [
        0, 0,
        0, 1,
        1, 1,
        0, 0,
        1, 0,
        1, 1,
    ], render.BASIC_GEOMETRY
);
const texture=textureManager.add(await textureManager.colorTexture({r:255}));
const material=new Material(texture);


await render.init();
cube.addInstance([-0.25,-0.5, 0.5, 1, ...redTexture.uvs])

render.draw(program);