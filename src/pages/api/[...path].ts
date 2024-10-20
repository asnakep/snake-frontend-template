import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const url = `https://api.koios.rest/api/v1/${(path as string[]).join('/')}`;

  // Manually construct valid headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Copy only necessary headers from the request
  if (req.headers.authorization) {
    headers['Authorization'] = req.headers.authorization;
  }
  if (req.headers['content-type']) {
    headers['Content-Type'] = req.headers['content-type'];
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers, // Use constructed headers object
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
