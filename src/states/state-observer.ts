import { Vector3 } from 'three';
import { State } from './types';

export class StateObserver {
  static getState(direction: Vector3) {
    if (direction.length()) {
      return State.Run;
    } else {
      return State.Idle;
    }
  }
}
