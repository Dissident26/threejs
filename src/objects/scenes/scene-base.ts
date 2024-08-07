import { Scene } from 'three';

import { footPrintGroup, getBasicSurface, getGlobalDirectionalLight, globalHemisphereLight } from '..';

export const createSceneBase = () => {
  const scene = new Scene();
  const surface = getBasicSurface();
  const globalDirectionalLight = getGlobalDirectionalLight();

  globalDirectionalLight.position.set(2, 2, 2);

  scene.add(surface, globalHemisphereLight, globalDirectionalLight, footPrintGroup);

  return { scene, surface };
};
