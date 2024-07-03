import { MeshBasicMaterial, FrontSide, Group, PlaneGeometry, Mesh, Vector3, Quaternion } from 'three';

import { TextureAnimator } from '../../texture-animator';
import { playerSettings } from '../../settings';
import { playerIdle, playerRun } from '../../textures';

export const createPlayer = () => {
  const animator = new TextureAnimator(playerIdle, 4, 3, 12, 128);
  const animator2 = new TextureAnimator(playerRun, 5, 4, 20, 20);

  const quaternion = new Quaternion();
  const yAxis = new Vector3(0, -1, 0); //texture facing down

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: playerIdle,
    transparent: true,
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
        if (material.map?.id !== playerRun.id) {
          material.map = playerRun;
        }

        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
        animator2.update(15);
      } else {
        if (material.map?.id !== playerIdle.id) {
          material.map = playerIdle;
        }

        animator.update(15);
      }

      mesh.quaternion.slerp(quaternion, 0.2);
      group.position.add(direction.multiplyScalar(playerSettings.speed));
    },
  };
};
