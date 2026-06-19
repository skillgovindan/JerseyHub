const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

const mapping = [
  { id: 'club-1', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/800px-Real_Madrid_CF.svg.png' },
  { id: 'club-2', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/800px-FC_Barcelona_%28crest%29.svg.png' },
  { id: 'club-3', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/800px-Atletico_Madrid_2017_logo.svg.png' },
  { id: 'club-4', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png' },
  { id: 'club-5', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/800px-Arsenal_FC.svg.png' },
  { id: 'club-6', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png' },
  { id: 'club-7', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/800px-Liverpool_FC.svg.png' },
  { id: 'club-8', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png' }
];

for (let item of mapping) {
  const regex = new RegExp(`("_id": "${item.id}"[\\s\\S]*?"imageUrl": )"[^"]+"`, 'm');
  content = content.replace(regex, `$1"${item.url}"`);
}

fs.writeFileSync(path, content);
console.log('Done mapping logos.');
