import { DirectionalLight, HemisphereLight, Scene } from 'three';

import { getBasicSurface, getGlobalDirectionalLight, globalHemisphereLight } from '..';

export const createSceneBase = () => {
  const scene = new Scene();
  const surface = getBasicSurface();
  const globalDirectionalLight = getGlobalDirectionalLight();

  globalDirectionalLight.position.set(2, 2, 2);

  scene.add(surface, globalHemisphereLight, globalDirectionalLight);

  const globalHemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.5);

  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, 2);

  scene.add(globalHemisphereLight, directionalLight);
  console.log(scene.children);
  return scene;
};
