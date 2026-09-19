export class Material{
    uvs=[0,0,0,0];
    
    cosntructor(texture){
        this.uvs=texture.uvs;
    }
}