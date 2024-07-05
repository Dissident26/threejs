import { PerspectiveCamera } from 'three';
import { cameraSettings } from '../../settings';

export const createPerspectiveCamera = () => {
  const camera = new PerspectiveCamera(cameraSettings.fov, cameraSettings.aspectRatio, cameraSettings.near, cameraSettings.far);

  camera.position.z = cameraSettings.far;

  return camera;
};
