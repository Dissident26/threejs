import { TextureAnimationMapDictionary, State } from '../states';
import { TextureAnimator } from '../texture-animator';
import { textureLoader } from './texture-loader';

export const playerIdle = textureLoader.load('player/Idle.png');
export const playerRun = textureLoader.load('player/Run.png');

export const playerTextureAnimationMap: TextureAnimationMapDictionary = {
  [State.Idle]: {
    texture: playerIdle,
    animator: new TextureAnimator(playerIdle, 4, 3, 12, 128),
    animationSpeed: 15,
  },
  [State.Run]: {
    texture: playerRun,
    animator: new TextureAnimator(playerRun, 5, 4, 20, 20),
    animationSpeed: 15,
  },
};
