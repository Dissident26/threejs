import { PointLight, DirectionalLight } from 'three';

export const createPlayerAttackPointLight = () => {
  const pointLight = new PointLight(0xc88253, 1, 100);
  pointLight.position.z = 0.02;
  pointLight.castShadow = true;
  pointLight.shadow.camera.near = 0.001;
  pointLight.shadow.mapSize.width = 512;
  pointLight.shadow.mapSize.height = 512;
  pointLight.shadow.bias = 0.00005;

  return pointLight;
};

export const createPlayerAttackDirectionalLight = () => {
  const directionalLight = new DirectionalLight(0xffffff, 2);

  directionalLight.position.z = 0.02;
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.bias = 0.00005;

  return directionalLight;
};
