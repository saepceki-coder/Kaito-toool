module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url parameter' });
  
  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const data = await response.text();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/plain');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
