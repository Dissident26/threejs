import { BackSide, BoxGeometry, DoubleSide, Mesh, MeshLambertMaterial, Vector3 } from 'three';

import { crateTexture } from '../../textures';
import { ObjectState } from '../../states';
import { videoSettings } from '../../settings';

interface CreateCrateArgs {
  size: number;
  position: Vector3;
}

export const createCrate = ({ size, position }: CreateCrateArgs) => {
  const material = new MeshLambertMaterial({
    side: DoubleSide,
    map: crateTexture,
    shadowSide: BackSide,
  });

  const geometry = new BoxGeometry(size, size, size / 2);
  const mesh = new Mesh(geometry, material);

  mesh.userData = {
    ...mesh.userData,
    objectState: ObjectState.Blocking,
  };

  mesh.castShadow = videoSettings.isShadowsEnabled;
  mesh.receiveShadow = videoSettings.isShadowsEnabled;

  mesh.position.z = size / 4;
  mesh.position.x = position.x;
  mesh.position.y = position.y;

  return mesh;
};
