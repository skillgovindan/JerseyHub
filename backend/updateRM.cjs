const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

const regex = new RegExp('("_id": "club-1"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex, '$1"/jerseys/Realmadrid.webp"');

fs.writeFileSync(path, content);
console.log('Updated Real Madrid URL.');
