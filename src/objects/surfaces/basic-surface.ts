import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { forestGroundTexture, forestGroundBumpTexture } from '../../textures';

forestGroundTexture;

export const getBasicSurface = () => {
  // const geometry = new PlaneGeometry(5, 5);
  // const material = new MeshLambertMaterial({ map: forestGroundTexture, bumpMap: forestGroundBumpTexture });
  // const surface = new Mesh(geometry, material);
  //foot prints are barely visible on textured mesh
  const surface = new Mesh(new PlaneGeometry(4, 4), new MeshLambertMaterial({ color: 0xffffff }));
  surface.receiveShadow = true;

  return surface;
};
