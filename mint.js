document.getElementById('mint-fish-button').addEventListener('click', async () => {
    const randomData = await fetch('https://api.drand.sh/public/latest');
    const json = await randomData.json();
    const randomNumber = parseInt(json.randomness, 16); // Convert hex to integer

    // Derive properties
    const hue = randomNumber % 20;
    const hat = (Math.floor(randomNumber / 20) % 10);
    const background = (Math.floor(randomNumber / 200) % 5);
    const type = (Math.floor(randomNumber / 1000) % 5);

    // Log qualities
    console.log({
        hue: hue,
        hat: hat,
        background: background,
        type: type
    });

    // Update the page with the qualities
    document.getElementById('hue-value').textContent = hue;
    document.getElementById('hat-value').textContent = hat;
    document.getElementById('background-value').textContent = background;
    document.getElementById('type-value').textContent = type;
});
