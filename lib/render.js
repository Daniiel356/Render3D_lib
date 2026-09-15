import Renderer from "./engine/renderer.js";

export class Render{
    #engine=new Renderer();
    
    constructor(){
        
    }
    draw(){
        this.#engine.clear();
    }

    getElement=()=>this.#engine.canvas;
}