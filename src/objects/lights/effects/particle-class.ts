import { Color, Group, MathUtils, Mesh, MeshBasicMaterial, Object3DEventMap, PlaneGeometry, Vector3 } from 'three';
import throttle from 'lodash.throttle';

import { TextureAnimator } from '../../../texture-animator';
import { playerAttackParticleTexture } from '../../../textures';

class ParticleClass {
  public meshes: Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap>[] = [];
  public animators: TextureAnimator[] = [];
  public particleGroup = new Group();

  readonly startColor = new Color(0xf7ed48);
  readonly endColor = new Color(0xe9724f);

  private material = new MeshBasicMaterial({ transparent: true, color: this.startColor.clone() });
  private size = 0.3;
  private geometry = new PlaneGeometry(this.size, this.size);

  createParticle = throttle((position: Vector3) => {
    const material = this.material.clone();

    material.map = playerAttackParticleTexture.clone();

    const animator = new TextureAnimator({
      texture: material.map!,
      tilesHoriz: 5,
      tilesVert: 5,
      numTiles: 25,
      tileDispDuration: 1000 / 120,
      isTilesVertical: false,
    });

    const mesh = new Mesh(this.geometry.clone(), material);
    mesh.position.copy({ x: position.x + MathUtils.randFloatSpread(this.size), y: position.y + MathUtils.randFloatSpread(this.size), z: -0 });

    mesh.rotation.z = Math.random();

    this.meshes.push(mesh);
    this.animators.push(animator);
    this.particleGroup.add(mesh);
  }, 50);

  animate = () => {
    this.animators.forEach((animator, i) => {
      animator.update(7);

      this.meshes[i].material.color.lerp(this.endColor.clone(), 0.05);

      if (animator.currentTile >= animator.numberOfTiles - 1) {
        this.particleGroup.remove(this.meshes[i]);
        this.meshes.splice(i, 1);
        this.animators.splice(i, 1);
      }
    });
  };

  render = (position: Vector3, shouldGenerateParticles: boolean) => {
    this.animate();

    if (shouldGenerateParticles) {
      this.createParticle(position);
    }
  };
}

export const particleClass = new ParticleClass();
