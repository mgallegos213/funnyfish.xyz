import * as THREE from 'three';

let scene, camera, renderer;
let fish;
let direction = 1;  // 1 for positive (right), -1 for negative (left)

function init() {
    // Create a new scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0099CC);  // Blue background

    // Setup the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Initialize the WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    const container = document.getElementById('app');  // Assuming your main div has the id 'app'
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Render the scene with the camera
    renderer.render(scene, camera);

    // Load the fish sprite texture
    const texture = new THREE.TextureLoader().load('/fish1.png');
    texture.center.set(0.5, 0.5);  // Set the pivot point to the center of the texture
    texture.repeat.set(direction, 1);  // Initial repeat value based on the direction

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    fish = new THREE.Sprite(spriteMaterial);
    fish.scale.set(0.8, 0.8, 0.8);
    scene.add(fish);

    animate();
}

init();

function animate() {
    requestAnimationFrame(animate);

    fish.position.x += 0.01 * direction;

    // Check boundaries and change direction
    if (fish.position.x > 2.5) {
    direction = -1;
    fish.material.map.repeat.x = -1;  // Flip the texture horizontally
    } else if (fish.position.x < -2.5) {
    direction = 1;
    fish.material.map.repeat.x = 1;   // Return to original texture orientation
    }

    renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.render(scene, camera);  // Re-render after resizing
});
