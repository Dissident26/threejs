import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';

import { objMtlLoader } from '../../loaders';
import { ObjectState } from '../../states';

interface CreateDeadTreeArgs {
  size: number;
  position: Vector3;
}

export const createDeadTree = async ({ size, position }: CreateDeadTreeArgs) => {
  const group = await objMtlLoader('models/miscellaneous/dead-tree/DeadTree.obj', 'models/miscellaneous/dead-tree/DeadTree.mtl');
  group.scale.set(size, size, size);
  group.rotateX(Math.PI / 2);

  group.position.x = position.x;
  group.position.y = position.y;
  group.position.z = -0.01;

  const boundingBox = new Mesh(
    new BoxGeometry(2.5, 2.5, 2.5),
    new MeshBasicMaterial({
      visible: false,
    }),
  );

  boundingBox.userData = {
    ...boundingBox.userData,
    objectState: ObjectState.Blocking,
  };

  group.add(boundingBox);

  return group;
};
