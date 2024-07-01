import { AxesHelper, Scene } from 'three';

export const createSceneBase = () => {
  const scene = new Scene();

  const axesHelper = new AxesHelper(1);

  scene.add(axesHelper);

  return scene;
};
