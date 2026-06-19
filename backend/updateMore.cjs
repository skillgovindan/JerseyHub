const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

const regex3 = new RegExp('("_id": "club-3"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex3, '$1"/jerseys/atletico-madrid-.webp"');

const regex4 = new RegExp('("_id": "club-4"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex4, '$1"/jerseys/manchester city.webp"');

fs.writeFileSync(path, content);
console.log('Updated Atletico and Man City URLs.');
