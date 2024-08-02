import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { forestGroundTexture, forestGroundBumpTexture } from '../../textures';

forestGroundTexture;

export const getBasicSurface = () => {
  const geometry = new PlaneGeometry(5, 5);
  const material = new MeshLambertMaterial({ map: forestGroundTexture, bumpMap: forestGroundBumpTexture });
  const surface = new Mesh(geometry, material);

  surface.receiveShadow = true;

  return surface;
};
