import { Scene } from 'three';

import { getBasicSurface, getGlobalDirectionalLight, globalHemisphereLight } from '..';

export const createSceneBase = () => {
  const scene = new Scene();
  const surface = getBasicSurface();
  const globalDirectionalLight = getGlobalDirectionalLight();

  globalDirectionalLight.position.set(2, 2, 2);

  scene.add(surface, globalHemisphereLight, globalDirectionalLight);

  return scene;
};
