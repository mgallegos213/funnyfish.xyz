import { Pool } from 'pg';

let ssl;
if (process.env.NODE_ENV === 'dev') {
  ssl = {
    rejectUnauthorized: false // Change this to `true` if you have a valid SSL certificate in production
  };
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: ssl
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { hue, hat, background, type, drandData } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO minted_fish(hue, hat, background, type, drand_round, drand_hash, drand_randomness) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [hue, hat, background, type, drandData.round, drandData.previous_hash, drandData.randomness]
    );

    const newFishId = result.rows[0].id;
    res.status(200).json({ id: newFishId });
  } catch (error) {
    console.error("Error while inserting into database:", error);
    res.status(500).json({ error: 'Database insertion failed', details: error.message });
  }
};
