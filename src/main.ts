import { Vector3, WebGLRenderer } from 'three';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createPlayerAttack, createSceneBase } from './objects';
import { keyboardController } from './controllers';
const app = document.getElementById('app')!;
const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

app.append(renderer.domElement);

const scene = createSceneBase();
const player = createPlayer();
const camera = createPerspectiveCamera();
const playerAttack = createPlayerAttack();

handleWindowResize(camera, renderer);

player.group.add(playerAttack.group);

scene.add(camera);
scene.add(player.group);
// scene.add(playerAttack.group);

const animate = () => {
  const vector = new Vector3(...keyboardController.direction);

  player.render(vector);
  camera.position.add(vector);
  playerAttack.render(camera);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
