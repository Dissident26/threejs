import { PointLight } from 'three';
import { videoSettings } from '../../../settings';

export const createPlayerAttackPointLight = () => {
  const pointLight = new PointLight(0xc88253, 1, 100);

  pointLight.position.z = 0.02;

  if (videoSettings.isShadowsEnabled) {
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 0.001;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.bias = 0.00005;
  }

  return pointLight;
};
