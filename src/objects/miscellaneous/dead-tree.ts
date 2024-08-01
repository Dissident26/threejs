import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';

import { objMtlLoader } from '../../loaders';
import { ObjectState } from '../../states';
import { videoSettings } from '../../settings';

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

  group.rotateY(Math.floor(Math.random() * 10) + 1);

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

  if (videoSettings.isShadowsEnabled) {
    group.children.forEach((child) => {
      child.castShadow = videoSettings.isShadowsEnabled;
      child.receiveShadow = videoSettings.isShadowsEnabled;
    });
  }

  group.add(boundingBox);

  return group;
};
