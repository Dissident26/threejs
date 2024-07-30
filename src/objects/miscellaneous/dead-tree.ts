import { Vector3 } from 'three';

import { objMtlLoader } from '../../loaders';

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

  return group;
};
