import { TextureLoader, MeshBasicMaterial, FrontSide, Group, PlaneGeometry, Mesh, Vector3 } from 'three';

import { TextureAnimator } from '../../texture-animator';
import { playerSettings } from '../../settings';

export const createPlayer = () => {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('player/Idle.png');
  const texture2 = textureLoader.load('player/Run.png');

  const animator = new TextureAnimator(texture, 4, 3, 12, 128);
  const animator2 = new TextureAnimator(texture2, 5, 4, 20, 20);

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
    alphaHash: true,
    color: playerSettings.color,
  });

  const group = new Group();
  const geometry = new PlaneGeometry(1, 1);
  const mesh = new Mesh(geometry, material);

  group.add(mesh);

  return {
    group,
    render(direction: Vector3) {
      const isMoving = direction.length();

      if (isMoving) {
        if (material.map?.id !== texture2.id) {
          material.map = texture2;
        }

        animator2.update(15);
      } else {
        if (material.map?.id !== texture.id) {
          material.map = texture;
        }

        animator.update(15);
      }

      mesh.rotation.z = isMoving ? Math.atan2(direction.y, direction.x) + Math.PI / 2 : mesh.rotation.z;
      group.position.add(direction.multiplyScalar(playerSettings.speed));
    },
  };
};
