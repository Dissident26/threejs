import { Box3, Box3Helper, Mesh, Vector3 } from 'three';

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
  group.position.z = -0.01;

  //   const box = new Box3();

  //   box.setFromCenterAndSize(new Vector3(), new Vector3(2, 2, 2));
  (group.children[0] as Mesh).geometry.computeBoundingBox();
  (group.children[0] as Mesh).geometry.boundingBox?.expandByScalar(-1.5);

  //   box.setFromObject(group);
  const helper = new Box3Helper((group.children[0] as Mesh).geometry.boundingBox!, 0xffff00);
  group.add(helper);

  return group;
};
