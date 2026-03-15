const https = require('https');
const http = require('http');

function fetchURL(targetUrl, depth = 0) {
  return new Promise((resolve, reject) => {
    if (depth > 3) return reject(new Error('Too many redirects'));
    const timeout = setTimeout(() => reject(new Error('Timeout')), 10000);
    const lib = targetUrl.startsWith('https') ? https : http;

    lib.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' },
      timeout: 9000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        clearTimeout(timeout);
        let redir = res.headers.location;
        if (redir.startsWith('/')) {
          const u = new URL(targetUrl);
          redir = u.protocol + '//' + u.host + redir;
        }
        fetchURL(redir, depth + 1).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { clearTimeout(timeout); resolve({ data, status: res.statusCode }); });
      res.on('error', (e) => { clearTimeout(timeout); reject(e); });
    }).on('error', (e) => { clearTimeout(timeout); reject(e); });
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const feedUrl = req.query.url;
  if (!feedUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  try {
    const result = await fetchURL(feedUrl);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).send(result.data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
