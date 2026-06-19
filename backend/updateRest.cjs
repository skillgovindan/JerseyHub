const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

const regex5 = new RegExp('("_id": "club-5"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex5, '$1"/jerseys/arsebal.webp"');

const regex6 = new RegExp('("_id": "club-6"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex6, '$1"/jerseys/manchester united.webp"');

const regex7 = new RegExp('("_id": "club-7"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex7, '$1"/jerseys/liverpool.webp"');

const regex8 = new RegExp('("_id": "club-8"[\\s\\S]*?"imageUrl": )"[^"]+"', 'm');
content = content.replace(regex8, '$1"/jerseys/chelsea.webp"');

fs.writeFileSync(path, content);
console.log('Updated the rest of the clubs!');
