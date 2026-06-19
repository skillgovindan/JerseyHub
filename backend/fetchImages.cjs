const https = require('https');

function fetchImage(query) {
  return new Promise((resolve) => {
    https.get('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query + ' soccer jersey shirt shop product image'), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Find image src in the HTML
        const match = data.match(/<img[^>]+src="(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/);
        if (match) {
          resolve('https:' + decodeURIComponent(match[1]));
        } else {
          resolve('https://placehold.co/800x800?text=' + encodeURIComponent(query));
        }
      });
    }).on('error', () => resolve('https://placehold.co/800x800?text=' + encodeURIComponent(query)));
  });
}

async function run() {
  const teams = [
    { id: 'club-1', query: 'Real Madrid 2024 home jersey kit' },
    { id: 'club-2', query: 'FC Barcelona 2024 home jersey kit' },
    { id: 'club-3', query: 'Atletico Madrid 2024 home jersey kit' },
    { id: 'club-4', query: 'Manchester City 2024 home jersey kit' },
    { id: 'club-5', query: 'Arsenal 2024 home jersey kit' },
    { id: 'club-6', query: 'Manchester United 2024 home jersey kit' },
    { id: 'club-7', query: 'Liverpool 2024 home jersey kit' },
    { id: 'club-8', query: 'Chelsea 2024 home jersey kit' }
  ];
  
  const fs = require('fs');
  const path = './data/products.js';
  let content = fs.readFileSync(path, 'utf8');
  
  for(let team of teams) {
    console.log('Fetching', team.query);
    const url = await fetchImage(team.query);
    console.log('Found URL:', url);
    
    // Replace placeholder URL in products.js with the new URL for the specific club ID
    const regex = new RegExp(`("_id": "${team.id}"[\\s\\S]*?"imageUrl": )"[^"]+"`, 'm');
    content = content.replace(regex, `$1"${url}"`);
  }
  
  fs.writeFileSync(path, content);
  console.log('Finished updating products.js with image URLs!');
}
run();
