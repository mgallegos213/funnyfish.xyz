import * as THREE from 'three';

export function createShark() {
    const sharkTexture = new THREE.TextureLoader().load('/shark1.png');
    sharkTexture.center.set(0.5, 0.5);
    sharkTexture.repeat.set(1, 1);
    const sharkMaterial = new THREE.SpriteMaterial({ map: sharkTexture });
    const shark = new THREE.Sprite(sharkMaterial);
    shark.scale.set(-1, 1, 1);
    shark.position.set(2.5, -0.5, 0);
    return shark;
}

export function animateShark(shark, sharkDirection) {
    shark.position.x += 0.01 * sharkDirection;
    if (shark.position.x > 2.5 || shark.position.x < -2.5) {
        sharkDirection *= -1;
        shark.material.map.repeat.x *= -1;
    }
    return sharkDirection;
}
