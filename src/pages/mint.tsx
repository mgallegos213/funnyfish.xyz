import { useState } from 'react';

export default function Mint() {
    type Qualities = {
        hue: number | string;
        hat: number | string;
        background: number | string;
        type: number | string;
        drand_round?: number;
        drand_hash?: string;
        drand_randomness?: string;
      };      

    const [qualities, setQualities] = useState<Qualities>({
        hue: '-',
        hat: '-',
        background: '-',
        type: '-'
        });

    const handleMintClick = async () => {
        const randomData = await fetch('https://api.drand.sh/public/latest');
        const json = await randomData.json();
        const randomNumber = parseInt(json.randomness, 16); // Convert hex to integer
        
        // Derive properties
        const hue = randomNumber % 20;
        const hat = (Math.floor(randomNumber / 20) % 10);
        const background = (Math.floor(randomNumber / 200) % 5);
        const type = (Math.floor(randomNumber / 1000) % 5);

        // If drand round is the same as the current state, return early and do nothing
        if (qualities.drand_round === json.round) {
            console.log('Drand round is the same as last time. No insertion will occur.');
            return;
        }

        // Update the qualities state
        setQualities({
            hue,
            hat,
            background,
            type,
            drand_round: json.round,
            drand_hash: json.previous_hash,
            drand_randomness: json.randomness,
        });
        
        // Send data to our backend endpoint
        const response = await fetch('/api/mint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hue, hat, background, type, drandData: json }),
        });
        
        const responseData = await response.json();
        
        if (responseData.id) {
            // Use the returned ID as needed
            console.log(`Minted fish with ID: ${responseData.id}`);
        }
    };

  return (
    <div>
      <button id="mint-fish-button" onClick={handleMintClick}>
        Mint a fish
      </button>
      <section id="qualities">
        <h3>Your Fish Qualities:</h3>
        <ul>
          <li>Hue: <span>{qualities.hue}</span></li>
          <li>Hat: <span>{qualities.hat}</span></li>
          <li>Background: <span>{qualities.background}</span></li>
          <li>Type: <span>{qualities.type}</span></li>
        </ul>
      </section>

        {/* Display the shark image based on hue */}
        {typeof qualities.hue === 'number' && (
        <img src={`/${qualities.hue % 10}shark.png`} alt={`Shark ${qualities.hue}`} />
        )}
    </div>
  );
}
