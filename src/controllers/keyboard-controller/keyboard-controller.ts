import { handleKeyPress } from '../../event-handlers';
import { Key } from '../../settings';

export class KeyboardController {
  [Key.UP] = false;
  [Key.DOWN] = false;
  [Key.LEFT] = false;
  [Key.RIGHT] = false;

  constructor() {
    handleKeyPress(this);
  }

  /**
   * @return [x, y, z = 0]
   */
  get direction() {
    const x = -this[Key.LEFT] + +this[Key.RIGHT];
    const y = -this[Key.DOWN] + +this[Key.UP];

    return [x, y, 0];
  }
}

export const keyboardController = new KeyboardController();
