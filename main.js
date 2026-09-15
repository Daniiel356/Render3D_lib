import {Render} from "/lib/render.js";

const render=new Render();
const canvas=render.getElement();

document.body.appendChild(canvas);
render.draw();