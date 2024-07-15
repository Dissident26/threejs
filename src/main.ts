import { AxesHelper, Raycaster, Vector3, WebGLRenderer } from 'three';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createPlayerAttack, createSceneBase } from './objects';
import { keyboardController } from './controllers';
import { createCrate } from './objects/miscellaneous';
const app = document.getElementById('app')!;
const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

app.append(renderer.domElement);

const scene = createSceneBase();
const player = createPlayer();
const camera = createPerspectiveCamera();
const playerAttack = createPlayerAttack();
const crate = createCrate({ size: 0.5, position: new Vector3(0.5, 1) }); //??
const crate2 = createCrate({ size: 0.5, position: new Vector3(1, 0.5) }); //??

handleWindowResize(camera, renderer);

player.group.add(playerAttack.group);

scene.add(camera);
scene.add(player.group);
scene.add(crate.group, crate2.group);

const raycaster = new Raycaster();

const animate = () => {
  const vector = new Vector3(...keyboardController.direction);

  raycaster.set(player.group.position, vector);
  const intersects = raycaster.intersectObjects(scene.children);
  // const intersects2 = raycaster(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    if (!(intersects[i].object instanceof AxesHelper)) {
      console.log(intersects[i]);
      intersects[i].object.material.color.set(0xff0000);
    }
  }

  player.render(vector);
  camera.position.add(vector);
  playerAttack.render(camera);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
