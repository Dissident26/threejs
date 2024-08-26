import { DoubleSide, Euler, Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import throttle from 'lodash.throttle';

import { playerFootPrint } from '../../textures';
import { DecalGeometry } from 'three/examples/jsm/Addons.js';

class PlayerFootPrint {
  private isLeft = false;
  private latency = 100;
  private size = new Vector3(0.06, 0.155);
  private material = new MeshBasicMaterial({
    transparent: true,
    map: playerFootPrint,
    side: DoubleSide,
  });

  public footPrintGroup = new Group();

  public createFootPrint = throttle((surface: Mesh, position: Vector3, rotation: Euler) => {
    const geometry = new DecalGeometry(surface, new Vector3(), new Euler(), this.size);
    const mesh = new Mesh(geometry, this.material.clone());

    mesh.renderOrder = -1; //rendered above player mesh
    mesh.rotateZ(Math.PI); //texture is upside down
    mesh.rotateZ(rotation.z);
    mesh.position.add(position);

    if (this.isLeft) {
      mesh.translateX(-0.05);
    } else {
      mesh.translateX(0.05);
      mesh.rotateY(Math.PI);
    }

    this.footPrintGroup.add(mesh);

    this.isLeft = !this.isLeft;
  }, this.latency);

  public handleFootPrintRemoval = () => {
    const changeMaterialProps = (material: Material) => {
      material.opacity -= 0.01;
    };

    this.footPrintGroup.children.forEach((object) => {
      if (object instanceof Mesh) {
        if (Array.isArray(object.material)) {
          object.material.forEach(changeMaterialProps);
        } else {
          changeMaterialProps(object.material);
        }
      }
    });
  };
}

export const { footPrintGroup, createFootPrint, handleFootPrintRemoval } = new PlayerFootPrint();
