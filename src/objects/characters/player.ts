import { TextureLoader, MeshBasicMaterial, FrontSide, Group, PlaneGeometry, Mesh, Vector3 } from 'three';

import { TextureAnimator } from '../../texture-animator';

export const createPlayer = () => {
  const texture = new TextureLoader().load('player/Idle.png');

  const animator = new TextureAnimator(texture, 4, 3, 12, 128);

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
    alphaHash: true,
    color: 0xfb601d,
  });

  const group = new Group();
  const geometry = new PlaneGeometry(1, 1);
  const mesh = new Mesh(geometry, material);

  group.add(mesh);

  return {
    group,
    render(direction: Vector3) {
      const isMoving = direction.length();

      animator.update(15);

      mesh.rotation.z = isMoving ? Math.atan2(direction.y, direction.x) + Math.PI / 2 : mesh.rotation.z;
      group.position.add(direction.multiplyScalar(0.02));
    },
  };
};
