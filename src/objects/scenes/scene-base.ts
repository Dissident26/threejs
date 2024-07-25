import { Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from 'three';
import { globalLight } from '..';

export const createSceneBase = () => {
  const scene = new Scene();

  const ground = new Mesh(new PlaneGeometry(5, 5), new MeshLambertMaterial({ color: 0xffffff }));

  ground.receiveShadow = true;

  scene.add(ground, globalLight);

  return scene;
};
