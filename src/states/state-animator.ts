import { MeshBasicMaterial } from 'three';

import { State, TextureAnimationMapDictionary } from '.';

export class StateAnimator {
  readonly material: MeshBasicMaterial;
  readonly textureMap: TextureAnimationMapDictionary;

  constructor(material: MeshBasicMaterial, textureMap: TextureAnimationMapDictionary) {
    this.material = material;
    this.textureMap = textureMap;
  }

  animate(state: State) {
    const { texture, animator, animationSpeed } = this.textureMap[state];

    if (this.material.map?.id !== texture.id) {
      this.material.map = texture;
    }

    return animator.update(animationSpeed);
  }
}
