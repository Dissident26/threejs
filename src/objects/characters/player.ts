import { MeshBasicMaterial, FrontSide, Group, PlaneGeometry, Mesh, Vector3, Quaternion, Scene } from 'three';

import { playerSettings, videoSettings } from '../../settings';
import { playerTextureAnimationMap } from '../../textures';
import { StateAnimator, StateObserver } from '../../states';
import { handlePlayerRayCast } from '../../ray-caster-handlers';
import { createFootPrint, handleFootPrintRemoval } from '..';

export const createPlayer = () => {
  const quaternion = new Quaternion();
  const yAxis = new Vector3(0, -1, 0); //texture facing down
  const group = new Group();
  const material = new MeshBasicMaterial({
    side: FrontSide,
    transparent: true,
    color: playerSettings.color,
    shadowSide: FrontSide,
    alphaTest: 0.5,
    precision: 'highp',
  });

  const stateAnimator = new StateAnimator(material, playerTextureAnimationMap);

  const geometry = new PlaneGeometry(1.5, 1.5);
  const mesh = new Mesh(geometry, material);
  mesh.position.z = 0.01;

  mesh.castShadow = videoSettings.isShadowsEnabled;
  mesh.receiveShadow = videoSettings.isShadowsEnabled;

  group.add(mesh);

  return {
    group,
    render(direction: Vector3, scene: Scene, surface: Mesh) {
      const state = StateObserver.getState(direction);

      stateAnimator.animate(state);
      handlePlayerRayCast(group.position, direction, scene);

      mesh.quaternion.slerp(quaternion, 0.2);
      group.position.add(direction.multiplyScalar(playerSettings.speed));

      if (direction.length()) {
        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
        createFootPrint(surface, group.position, mesh.rotation);
        handleFootPrintRemoval();
      }
    },
  };
};
