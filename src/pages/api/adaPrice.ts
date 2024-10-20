import coinMarketcapApiKey from '../../components/variables/coinMCAPKey';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ada';

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
    // Fetch ADA price data
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': coinMarketcapApiKey, // Include your API key in the headers
      },
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error('Failed to fetch ADA price');
    }

    const data = await response.json();

    // Extract required values
    const adaData = data.data.ADA[0]; // Access the first object in the ADA array
    const result = {
      rank: adaData.cmc_rank,
      price: Number(adaData.quote.USD.price).toFixed(2),
      marketCap: adaData.quote.USD.market_cap.toFixed(0),
    };

    // Return the extracted data
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching ADA price:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
