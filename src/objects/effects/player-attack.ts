import { FrontSide, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Vector3 } from 'three';
import { mouseController } from '../../controllers';

import { playerAttack } from '../../textures';
import { createPlayerAttackDirectionalLight, createPlayerAttackPointLight } from '../lights';

export const createPlayerAttack = () => {
  const group = new Group();
  const geometry = new PlaneGeometry(0.4, 0.4);
  const material = new MeshBasicMaterial({
    side: FrontSide,
    transparent: true,
    map: playerAttack,
    shadowSide: FrontSide,
  });
  const mesh = new Mesh(geometry, material);

  const pointLight = createPlayerAttackPointLight();
  const directionalLight = createPlayerAttackDirectionalLight();

  group.add(mesh, pointLight, directionalLight);

  let vectorBase = new Vector3();

  return {
    group,
    render(camera: PerspectiveCamera) {
      if (mouseController.keyPressed) {
        const { dx, dy } = mouseController.interpolateCoords;
        const projection = new Vector3(dx, dy, 1);

        vectorBase = projection.unproject(camera);
        vectorBase.sub(camera.position);
        vectorBase.setZ(0);
      } else {
        vectorBase.set(0, 0, 0);
      }

      group.position.lerp(vectorBase.clampLength(0, 1), 0.2);

      group.visible = !(group.position.distanceTo(new Vector3()) < 0.1);
    },
  };
};
