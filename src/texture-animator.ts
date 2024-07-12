import { RepeatWrapping, Texture } from 'three';

export class TextureAnimator {
  texture: Texture;
  tilesHorizontal: number;
  tilesVertical: number;
  numberOfTiles: number;
  tileDisplayDuration: number;
  isTilesVertical: boolean;

  currentDisplayTime = 0;
  currentTile = 0;

  constructor(texture: Texture, tilesHoriz: number, tilesVert: number, numTiles: number, tileDispDuration: number, isTilesVertical = false) {
    this.texture = texture;
    this.numberOfTiles = numTiles;
    this.tileDisplayDuration = tileDispDuration;
    this.isTilesVertical = isTilesVertical;

    if (isTilesVertical) {
      this.tilesHorizontal = tilesVert;
      this.tilesVertical = tilesHoriz;
      texture.repeat.set(1 / this.tilesVertical, 1 / this.tilesHorizontal);
    } else {
      this.tilesHorizontal = tilesHoriz;
      this.tilesVertical = tilesVert;
      texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
    }

    texture.wrapS = texture.wrapT = RepeatWrapping;
  }

  update(animationSpeed: number) {
    this.currentDisplayTime += animationSpeed;

    while (this.currentDisplayTime > this.tileDisplayDuration) {
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;

      if (this.currentTile === this.numberOfTiles) {
        this.currentTile = 0;
      }

      if (this.isTilesVertical) {
        const currentColumn = this.currentTile % this.tilesVertical;
        this.texture.offset.x = currentColumn / this.tilesVertical;

        const currentRow = Math.floor(this.currentTile / this.tilesVertical);
        this.texture.offset.y = currentRow / this.tilesHorizontal;
      } else {
        const currentColumn = this.currentTile % this.tilesHorizontal;
        this.texture.offset.x = currentColumn / this.tilesHorizontal;

        const currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
        this.texture.offset.y = currentRow / this.tilesVertical;
      }
    }
  }
}
