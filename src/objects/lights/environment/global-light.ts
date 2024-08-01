import { DirectionalLight, HemisphereLight } from 'three';
import { videoSettings } from '../../../settings';

export const globalHemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.5);

export const getGlobalDirectionalLight = () => {
  const directionalLight = new DirectionalLight(0xffffff, 0.5);

  if (videoSettings.isShadowsEnabled) {
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = 0.00005;
  }

  return directionalLight;
};
