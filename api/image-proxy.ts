// Simple image proxy to bypass CORS restrictions for Google Drive images
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Only allow Google Drive URLs for security
  if (!url.includes('googleusercontent.com') && !url.includes('drive.google.com')) {
    return res.status(400).json({ error: 'Only Google Drive URLs are allowed' });
  }

  try {
    // Fetch the image from Google Drive
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
        'Referer': 'https://drive.google.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Send the image
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}