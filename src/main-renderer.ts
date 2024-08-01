import { PCFSoftShadowMap, WebGLRenderer } from 'three';
import { videoSettings } from './settings';

export const getMainRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (videoSettings.isShadowsEnabled) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
  }

  return renderer;
};
