const https = require('https');
const fs = require('fs');

function fetchWikiLogo(teamName) {
  return new Promise((resolve) => {
    const query = encodeURIComponent(teamName);
    https.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + query, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.thumbnail && json.thumbnail.source) {
            resolve(json.thumbnail.source.replace(/\d+px/, '800px')); // Try to get higher res
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const teams = [
    { id: 'club-1', wiki: 'Real_Madrid_CF' },
    { id: 'club-2', wiki: 'FC_Barcelona' },
    { id: 'club-3', wiki: 'Atlético_Madrid' },
    { id: 'club-4', wiki: 'Manchester_City_F.C.' },
    { id: 'club-5', wiki: 'Arsenal_F.C.' },
    { id: 'club-6', wiki: 'Manchester_United_F.C.' },
    { id: 'club-7', wiki: 'Liverpool_F.C.' },
    { id: 'club-8', wiki: 'Chelsea_F.C.' }
  ];
  
  const path = './data/products.js';
  let content = fs.readFileSync(path, 'utf8');
  
  for(let team of teams) {
    const url = await fetchWikiLogo(team.wiki);
    console.log(team.wiki, '->', url);
    if(url) {
      const regex = new RegExp(`("_id": "${team.id}"[\\s\\S]*?"imageUrl": )"[^"]+"`, 'm');
      content = content.replace(regex, `$1"${url}"`);
    }
  }
  
  fs.writeFileSync(path, content);
  console.log('Finished updating logos!');
}
run();
