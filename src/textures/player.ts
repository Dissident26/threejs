import { TextureAnimationMapDictionary, State } from '../states';
import { TextureAnimator } from '../texture-animator';
import { textureLoader } from './texture-loader';

export const playerIdle = textureLoader.load('textures/player/Idle.png');
export const playerRun = textureLoader.load('textures/player/Run.png');
export const playerAttack = textureLoader.load('textures/cursor/FlameBall.png');

export const playerTextureAnimationMap: TextureAnimationMapDictionary = {
  [State.Idle]: {
    texture: playerIdle,
    animator: new TextureAnimator(playerIdle, 4, 3, 12, 1000 / 120, true),
    animationSpeed: 1.5,
  },
  [State.Run]: {
    texture: playerRun,
    animator: new TextureAnimator(playerRun, 5, 4, 20, 1000 / 200, true),
    animationSpeed: 1.5,
  },
};
