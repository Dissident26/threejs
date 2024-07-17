import { Texture } from 'three';

import { TextureAnimator } from '../texture-animator';

export enum State {
  Idle,
  Run,
}

export interface TextureAnimationMapRecord {
  texture: Texture;
  animator: TextureAnimator;
  animationSpeed: number;
}

export type TextureAnimationMapDictionary = Record<State, TextureAnimationMapRecord>;

export enum ObjectState {
  Blocking,
}
