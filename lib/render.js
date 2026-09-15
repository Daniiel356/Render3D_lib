import Renderer from "./engine/renderer.js";

export class Render{
    #engine=new Renderer();
    
    constructor(){
        
    }

    getElement=()=>this.#engine.canvas;
}