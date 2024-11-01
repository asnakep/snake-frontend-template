import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUrl = 'https://data.snakepool.link/json/current.json'; // Only current.json URL

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'data.snakepool.link'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle OPTIONS request for preflight check
  if (req.method === 'OPTIONS') {
    res.status(204).end(); // No Content
    return;
  }

  try {
    // Fetch current epoch data
    const currentResponse = await fetch(currentUrl);

    // Check if the response is OK
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch current epoch data');
    }

    const currentData = await currentResponse.json();

    // Return current epoch data
    res.status(200).json({ current: currentData });
  } catch (error) {
    console.error('Error fetching epoch data:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
