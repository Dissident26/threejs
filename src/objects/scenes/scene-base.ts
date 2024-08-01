import { DirectionalLight, HemisphereLight, Scene } from 'three';

export const createSceneBase = () => {
  const scene = new Scene();

  const globalHemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.5);

  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, 2);

  scene.add(globalHemisphereLight, directionalLight);
  console.log(scene.children);
  return scene;
};
