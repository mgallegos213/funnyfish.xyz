import * as THREE from 'three';
import { createFish, animateFish } from './fish.js';
import { createShark, animateShark } from './shark.js';

let scene, camera, renderer;
let fish, shark;
let fishDirection = 1;
let sharkDirection = -1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    adjustCanvasSize();
    document.getElementById('app').appendChild(renderer.domElement);

    fish = createFish();
    scene.add(fish);

    shark = createShark();
    scene.add(shark);
    scene.background = null;

    animate();
}

function adjustCanvasSize() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    renderer.setSize(size, size);
}

function animate() {
    requestAnimationFrame(animate);

    fishDirection = animateFish(fish, fishDirection);
    sharkDirection = animateShark(shark, sharkDirection);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    adjustCanvasSize();
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

init();
