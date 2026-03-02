const fs = require('fs');
const path = require('path');

const xlsxPath = path.join(__dirname, '..', 'xlsx_extract');
const sharedStringsXml = fs.readFileSync(path.join(xlsxPath, 'xl', 'sharedStrings.xml'), 'utf8');
const sheetXml = fs.readFileSync(path.join(xlsxPath, 'xl', 'worksheets', 'sheet1.xml'), 'utf8');

// Extract shared strings: <si><t>value</t></si> or <si>...</si>
const stringMatches = sharedStringsXml.matchAll(/<si>(?:<t>([^<]*)<\/t>|.*?)<\/si>/g);
const strings = [];
for (const m of stringMatches) {
  strings.push(m[1] !== undefined ? m[1] : '');
}

// Extract rows: <row r="N">...</row> with cells <c r="A N" t="s"><v>index</v></c>
const rowRegex = /<row r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g;
const cellRegex = /<c r="([A-D])(\d+)"[^>]*t="s"[^>]*><v>(\d+)<\/v><\/c>/g;
const rows = [];
let rowMatch;
while ((rowMatch = rowRegex.exec(sheetXml)) !== null) {
  const rowNum = parseInt(rowMatch[1], 10);
  const rowXml = rowMatch[2];
  const cells = { A: null, B: null, C: null, D: null };
  let cellMatch;
  cellRegex.lastIndex = 0;
  while ((cellMatch = cellRegex.exec(rowXml)) !== null) {
    const col = cellMatch[1];
    const idx = parseInt(cellMatch[3], 10);
    cells[col] = strings[idx];
  }
  rows.push({ rowNum, ...cells });
}

// Skip header row (row 1), build products
const products = rows
  .filter(r => r.rowNum > 1)
  .map(r => {
    const link = r.B || '';
    const slug = link ? link.replace(/\/$/, '').split('/').pop() : (r.A || '').toLowerCase();
    return {
      slug: slug.toLowerCase(),
      title: r.A || '',
      name: r.D || r.A || '',
      link: link,
      thumbnail: r.C || '',
    };
  })
  .filter(p => p.slug && p.name);

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'products.json'),
  JSON.stringify(products, null, 2),
  'utf8'
);
console.log(`Wrote ${products.length} products to data/products.json`);
