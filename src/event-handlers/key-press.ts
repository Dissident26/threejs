import { KeyboardController } from '../controllers';
import { Key, keySettings } from '../settings';

export const handleKeyPress = (keyboardController: KeyboardController) => {
  document.onkeydown = (event) => {
    switch (event.code) {
      case keySettings[Key.UP]: {
        keyboardController[Key.UP] = true;
        break;
      }
      case keySettings[Key.DOWN]: {
        keyboardController[Key.DOWN] = true;
        break;
      }
      case keySettings[Key.LEFT]: {
        keyboardController[Key.LEFT] = true;
        break;
      }
      case keySettings[Key.RIGHT]: {
        keyboardController[Key.RIGHT] = true;
        break;
      }
      default: {
        break;
      }
    }
  };

  document.onkeyup = (event) => {
    switch (event.code) {
      case keySettings[Key.UP]: {
        keyboardController[Key.UP] = false;
        break;
      }
      case keySettings[Key.DOWN]: {
        keyboardController[Key.DOWN] = false;
        break;
      }
      case keySettings[Key.LEFT]: {
        keyboardController[Key.LEFT] = false;
        break;
      }
      case keySettings[Key.RIGHT]: {
        keyboardController[Key.RIGHT] = false;
        break;
      }
      default: {
        break;
      }
    }
  };
};
