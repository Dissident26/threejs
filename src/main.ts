import { Vector3, WebGLRenderer } from 'three';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createSceneBase } from './objects';
import { keyboardController } from './controllers';
const app = document.getElementById('app')!;
const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

app.append(renderer.domElement);

const scene = createSceneBase();
const player = createPlayer();
const camera = createPerspectiveCamera();

handleWindowResize(camera, renderer);

// player.group.add(camera);
scene.add(camera);
scene.add(player.group);

const animate = () => {
  const vector = new Vector3(...keyboardController.direction);

  player.render(vector);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
