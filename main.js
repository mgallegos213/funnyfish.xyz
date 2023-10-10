import * as THREE from 'three';

let scene, camera, renderer;
let fish, shark;
let fishDirection = 1;  // 1 for positive (right), -1 for negative (left)
let sharkDirection = -1; // starts moving to the left

function init() {
    scene = new THREE.Scene();

    // Setting up the camera
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // aspect ratio is 1 for a square canvas
    camera.position.z = 5;

    // WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    adjustCanvasSize();
    document.getElementById('app').appendChild(renderer.domElement);

    // Fish sprite
    const fishTexture = new THREE.TextureLoader().load('/guppy1.png');
    fishTexture.center.set(0.5, 0.5);
    fishTexture.repeat.set(fishDirection, 1);
    const fishMaterial = new THREE.SpriteMaterial({ map: fishTexture });
    fish = new THREE.Sprite(fishMaterial);
    fish.scale.set(0.8, 0.8, 0.8);
    fish.position.y = 0.5;  // Adjust for fish
    scene.add(fish);

    // Shark sprite
    const sharkTexture = new THREE.TextureLoader().load('/shark1.png');
    sharkTexture.center.set(0.5, 0.5);
    sharkTexture.repeat.set(-1, 1);
    const sharkMaterial = new THREE.SpriteMaterial({ map: sharkTexture });
    shark = new THREE.Sprite(sharkMaterial);
    shark.material.map.repeat.x = 1;
    shark.scale.set(-1, 1, 1);
    shark.position.y = -0.5;  // Adjust for shark
    shark.position.x = 2.5;   // Starts from the right
    scene.add(shark);
    scene.background = null;
    animate();
}

init();

function adjustCanvasSize() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    renderer.setSize(size, size);
}

function animate() {
    requestAnimationFrame(animate);

    // Fish movement
    fish.position.x += 0.01 * fishDirection;
    if (fish.position.x > 2.5) {
        fishDirection = -1;
        fish.material.map.repeat.x = -1;
    } else if (fish.position.x < -2.5) {
        fishDirection = 1;
        fish.material.map.repeat.x = 1;
    }

    // Shark movement
    shark.position.x += 0.01 * sharkDirection;
    if (shark.position.x < -2.5) {
        sharkDirection = 1;
        shark.material.map.repeat.x = -1;
    } else if (shark.position.x > 2.5) {
        sharkDirection = -1;
        shark.material.map.repeat.x = 1;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    adjustCanvasSize();
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});