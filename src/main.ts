import { Vector3 } from 'three';
import Stats from 'stats.js';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createPlayerAttack, createSceneBase, particleClass } from './objects';
import { keyboardController } from './controllers';
import { createCrate, createDeadTree } from './objects/miscellaneous';
import { getMainRenderer } from './main-renderer';

const app = document.getElementById('app')!;

const renderer = getMainRenderer();

const stats = new Stats();

app.append(renderer.domElement, stats.dom);

const { scene, surface } = createSceneBase();
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
scene.add(player.group, particleClass.particleGroup);
scene.add(crate, crate2, ...trees);

const animate = () => {
  stats.begin();
  const direction = new Vector3(...keyboardController.direction);

  player.render(direction, scene, surface);
  camera.position.add(direction);
  playerAttack.render(camera);

  renderer.render(scene, camera);
  stats.end();
};

renderer.setAnimationLoop(animate);
