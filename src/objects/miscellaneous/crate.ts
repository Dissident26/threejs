import { BoxGeometry, DoubleSide, FrontSide, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { crateTexture } from '../../textures';
import { ObjectState } from '../../states';

interface CreateCrateArgs {
  size: number;
  position: Vector3;
}

export const createCrate = ({ size, position }: CreateCrateArgs) => {
  const material = new MeshBasicMaterial({
    side: DoubleSide,
    map: crateTexture,
    shadowSide: FrontSide,
  });

  const geometry = new BoxGeometry(size, size, size / 2);
  const mesh = new Mesh(geometry, material);

  mesh.userData = {
    ...mesh.userData,
    objectState: ObjectState.Blocking,
  };

  mesh.castShadow = true;

  mesh.position.z = size / 4;
  mesh.position.x = position.x;
  mesh.position.y = position.y;

  return mesh;
};
