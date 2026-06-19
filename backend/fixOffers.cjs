const fs = require('fs');
const path = './data/products.js';
let content = fs.readFileSync(path, 'utf8');

// Use literal string replacement
content = content.replace('"price": 105,', '"offer": "🔥 + FREE SHORTS",\n      "price": 105,'); // This is a bit greedy but lets be precise
content = content.replace(
  '"team": "FC Barcelona",\n      "price": 105,',
  '"team": "FC Barcelona",\n      "offer": "🔥 + FREE SHORTS",\n      "price": 105,'
);

content = content.replace(
  '"team": "Liverpool",\n      "price": 100,',
  '"team": "Liverpool",\n      "offer": "🔥 + FREE SHORTS",\n      "price": 100,'
);

fs.writeFileSync(path, content);
console.log('Fixed DB offers');
