import { Texture } from 'three';
import { textureLoader } from '../loaders';
import { TextureAnimationMapDictionary, State } from '../states';
import { TextureAnimator } from '../texture-animator';

export const playerIdle = textureLoader.load('textures/player/Idle.png');
export const playerRun = textureLoader.load('textures/player/Run.png');
export const playerAttack = textureLoader.load('textures/cursor/FlameBall.png');
export const playerFootPrint = textureLoader.load('textures/player/footprint_left.png');

const centerPlayerTextures = (...textures: Texture[]) => {
  textures.forEach((texture) => {
    texture.center.x = -0.005;
    texture.center.y = -0.015;
  });
};

centerPlayerTextures(playerIdle, playerRun);

export const playerTextureAnimationMap: TextureAnimationMapDictionary = {
  [State.Idle]: {
    texture: playerIdle,
    animator: new TextureAnimator({
      texture: playerIdle,
      tilesHoriz: 4,
      tilesVert: 3,
      numTiles: 12,
      tileDispDuration: 1000 / 120,
      isTilesVertical: true,
    }),
    animationSpeed: 1.5,
  },
  [State.Run]: {
    texture: playerRun,
    animator: new TextureAnimator({
      texture: playerRun,
      tilesHoriz: 5,
      tilesVert: 4,
      numTiles: 20,
      tileDispDuration: 1000 / 200,
      isTilesVertical: true,
    }),
    animationSpeed: 1.5,
  },
};
