import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';

export const getBasicSurface = () => {
  const geometry = new PlaneGeometry(5, 5);
  const material = new MeshLambertMaterial({ color: 0xffffff });
  const surface = new Mesh(geometry, material);

  surface.receiveShadow = true;

  return surface;
};
