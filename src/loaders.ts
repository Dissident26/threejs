import { TextureLoader } from 'three';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';

export const textureLoader = new TextureLoader();

export const materialLoader = new MTLLoader();
export const objectLoader = new OBJLoader();

export const objMtlLoader = async (objUrl: string, mtlUrl: string) => {
  const mtl = await materialLoader.loadAsync(mtlUrl);
  objectLoader.setMaterials(mtl);
  const obj = await objectLoader.loadAsync(objUrl);

  return obj;
};
