import { Vector3, WebGLRenderer } from 'three';

import { handleWindowResize } from './event-handlers';
import { createPerspectiveCamera, createPlayer, createPlayerAttack, createSceneBase } from './objects';
import { keyboardController } from './controllers';
import { createCrate } from './objects/miscellaneous';

import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';

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

const mtlLoader = new MTLLoader();

mtlLoader.setPath('models/miscellaneous/dead-tree/').load(
  'DeadTree.mtl',
  (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load(
      'models/miscellaneous/dead-tree/DeadTree.obj',
      (object) => {
        object.scale.set(0.1, 0.1, 0.1);
        object.rotateX(Math.PI / 2);
        console.log(object);
        scene.add(object);
      },
      undefined,
      console.error,
    );
  },
  undefined,
  console.error,
);

scene.add(camera);
scene.add(player.group);
scene.add(crate, crate2);

const animate = () => {
  const direction = new Vector3(...keyboardController.direction);

  player.render(direction, scene);
  camera.position.add(direction);
  playerAttack.render(camera);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
