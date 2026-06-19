const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

const regex2 = new RegExp('("_id": "club-2"[\\s\\S]*?"sizes": \\["S", "M", "L", "XL"\\],\\n\\s*"stockCount": 50,)', 'm');
content = content.replace(regex2, '$1\n    "offer": "🔥 + FREE SHORTS",');

const regex7 = new RegExp('("_id": "club-7"[\\s\\S]*?"sizes": \\["S", "M", "L", "XL"\\],\\n\\s*"stockCount": 45,)', 'm');
content = content.replace(regex7, '$1\n    "offer": "🔥 + FREE SHORTS",');

fs.writeFileSync(path, content);
console.log('Added offers!');
