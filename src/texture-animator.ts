import { RepeatWrapping, Texture } from 'three';

export class TextureAnimator {
  texture: Texture;
  tilesHorizontal: number;
  tilesVertical: number;
  numberOfTiles: number;
  tileDisplayDuration: number;
  currentDisplayTime = 0;
  currentTile = 0;

  constructor(texture: Texture, tilesHoriz: number, tilesVert: number, numTiles: number, tileDispDuration: number) {
    this.texture = texture;
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.numberOfTiles = numTiles;
    this.tileDisplayDuration = tileDispDuration;

    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
  }

  update(animationSpeed: number) {
    this.currentDisplayTime += animationSpeed;

    while (this.currentDisplayTime > this.tileDisplayDuration) {
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;

      if (this.currentTile === this.numberOfTiles) {
        this.currentTile = 0;
      }

      const currentColumn = this.currentTile % this.tilesHorizontal;
      this.texture.offset.x = currentColumn / this.tilesHorizontal;

      const currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
      this.texture.offset.y = currentRow / this.tilesVertical;
    }
  }
}
