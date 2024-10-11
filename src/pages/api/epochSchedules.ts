import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUrl = 'http://136.243.208.16:12777/json/current.json';
  const nextUrl = 'http://136.243.208.16:12777/json/next.json';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle OPTIONS request for preflight check
  if (req.method === 'OPTIONS') {
    res.status(204).end(); // No Content
    return;
  }

  try {
    // Fetch current epoch data
    const [currentResponse, nextResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(nextUrl),
    ]);

    // Check if both responses are OK
    if (!currentResponse.ok || !nextResponse.ok) {
      throw new Error('Failed to fetch epoch data');
    }

    const currentData = await currentResponse.json();
    const nextData = await nextResponse.json();

    // Return combined data
    res.status(200).json({ current: currentData, next: nextData });
  } catch (error) {
    console.error('Error fetching epoch data:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
