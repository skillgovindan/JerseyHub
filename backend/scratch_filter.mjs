import fs from 'fs';

const filePath = './backend/data/products.js';
let content = fs.readFileSync(filePath, 'utf8');

// Use a simple regex to extract the array, evaluate it, filter it, and write it back
const match = content.match(/const products = (\[[\s\S]*?\]);/);
if (match) {
  let products;
  eval('products = ' + match[1]);

  const keepComingSoon = [
    'New Zealand', 'Saudi Arabia', 'Peru', 'Algeria', 'Colombia', 'Uruguay', 'Wales'
  ];

  const filtered = products.filter(p => {
    // Keep if it has a local image (starts with /jerseys)
    if (p.imageUrl.startsWith('/jerseys')) return true;
    
    // Keep if it's in the coming soon list
    if (keepComingSoon.includes(p.team)) return true;

    return false;
  });

  const newContent = `// Auto-generated FIFA & Club teams data
const products = ${JSON.stringify(filtered, null, 2)};

export default products;
`;

  fs.writeFileSync(filePath, newContent);
  console.log('Successfully filtered products.js. Remaining teams:', filtered.length);
} else {
  console.error('Could not find products array in file');
}
