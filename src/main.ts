import { Vector3, WebGLRenderer } from 'three';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createPlayerAttack, createSceneBase } from './objects';
import { keyboardController } from './controllers';
import { createCrate, createDeadTree } from './objects/miscellaneous';

const app = document.getElementById('app')!;
const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

app.append(renderer.domElement);

const scene = createSceneBase();
const player = createPlayer();
const camera = createPerspectiveCamera();
const playerAttack = createPlayerAttack();
const crate = createCrate({ size: 0.5, position: new Vector3(0.5, 1) });
const crate2 = createCrate({ size: 0.5, position: new Vector3(1, 0.5) });

const trees = await Promise.all([
  createDeadTree({ size: 0.1, position: new Vector3(-1, -1) }),
  createDeadTree({ size: 0.1, position: new Vector3(1, -1) }),
  createDeadTree({ size: 0.1, position: new Vector3(-1, 1) }),
]);

handleWindowResize(camera, renderer);

player.group.add(playerAttack.group);

scene.add(camera);
scene.add(player.group);
scene.add(crate, crate2, ...trees);

const animate = () => {
  const direction = new Vector3(...keyboardController.direction);

  player.render(direction, scene);
  camera.position.add(direction);
  playerAttack.render(camera);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
