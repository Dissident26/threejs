import { Scene, Vector3 } from 'three';

import { raycaster } from './ray-caster';
import { ObjectState } from '../states';

export const handlePlayerRayCast = (origin: Vector3, dierction: Vector3, scene: Scene) => {
  raycaster.set(origin, dierction);
  const intersections = raycaster.intersectObjects(scene.children);

  intersections.forEach((intersection) => {
    if (intersection?.object.userData?.objectState === ObjectState.Blocking && intersection?.distance < 0.25) {
      dierction.multiplyScalar(0);
    }
  });
};
