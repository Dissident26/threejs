import { handleMouseEvents } from '../../event-handlers';

export class MouseController {
  x = 0;
  y = 0;
  keyPressed = false;

  constructor() {
    handleMouseEvents(this);
  }

  get interpolateCoords() {
    return {
      dx: (this.x / window.innerWidth) * 2 - 1,
      dy: (this.y / window.innerHeight) * -2 + 1,
    };
  }
}

export const mouseController = new MouseController();
