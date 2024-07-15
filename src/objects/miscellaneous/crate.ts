import { BoxGeometry, DoubleSide, Group, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { crateTexture } from '../../textures';

interface CreateCrateargs {
  size: number;
  position: Vector3;
}

export const createCrate = ({ size, position }: CreateCrateargs) => {
  const group = new Group();
  const material = new MeshBasicMaterial({
    side: DoubleSide,
    map: crateTexture,
  });

  const geometry = new BoxGeometry(size, size, size / 2);
  const mesh = new Mesh(geometry, material);

  mesh.position.z = size / 4;
  mesh.position.x = position.x;
  mesh.position.y = position.y;

  group.add(mesh);

  return {
    group,
    render() {
      // ??
    },
  };
};
