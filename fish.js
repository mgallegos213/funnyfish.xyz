import * as THREE from 'three';

export function createFish() {
    const fishTexture = new THREE.TextureLoader().load('/guppy1.png');
    fishTexture.center.set(0.5, 0.5);
    const fishMaterial = new THREE.SpriteMaterial({ map: fishTexture });
    const fish = new THREE.Sprite(fishMaterial);
    fish.scale.set(0.8, 0.8, 0.8);
    fish.position.y = 0.5;
    return fish;
}

export function animateFish(fish, fishDirection) {
    fish.position.x += 0.01 * fishDirection;
    if (fish.position.x > 2.5 || fish.position.x < -2.5) {
        fishDirection *= -1;
        fish.material.map.repeat.x *= -1;
    }
    return fishDirection;
}
