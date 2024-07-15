import { MeshBasicMaterial, FrontSide, Group, PlaneGeometry, Mesh, Vector3, Quaternion } from 'three';

import { playerSettings } from '../../settings';
import { playerTextureAnimationMap } from '../../textures';
import { StateAnimator, StateObserver } from '../../states';

export const createPlayer = () => {
  const quaternion = new Quaternion();
  const yAxis = new Vector3(0, -1, 0); //texture facing down
  const group = new Group();
  const material = new MeshBasicMaterial({
    side: FrontSide,
    transparent: true,
    color: playerSettings.color,
  });

  const stateAnimator = new StateAnimator(material, playerTextureAnimationMap);

  const geometry = new PlaneGeometry(1.5, 1.5);
  const mesh = new Mesh(geometry, material);

  group.add(mesh);

  return {
    group,
    render(direction: Vector3) {
      const state = StateObserver.getState(direction);

      stateAnimator.animate(state);
      //check condition further
      direction.length() && quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
      mesh.quaternion.slerp(quaternion, 0.2);
      group.position.add(direction.multiplyScalar(playerSettings.speed));
    },
  };
};
