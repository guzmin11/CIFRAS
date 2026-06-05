const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The plans section has id="planos" - confirmed above.
// Strategy:
// 1. All href="#" buttons OUTSIDE the planos section => href="#planos"
// 2. The actual checkout buttons INSIDE the planos section => href="#checkout"

// Find where the planos section starts and ends
const planosStart = html.indexOf('<section id="planos"');
const planosEnd = html.indexOf('</section>', planosStart) + '</section>'.length;

const beforePlanos = html.substring(0, planosStart);
const planosSec = html.substring(planosStart, planosEnd);
const afterPlanos = html.substring(planosEnd);

// In beforePlanos and afterPlanos: replace href="#" with href="#planos"
const newBefore = beforePlanos.replace(/href="#"/g, 'href="#planos"');
const newAfter = afterPlanos.replace(/href="#"/g, 'href="#planos"');

// In planosSec: replace href="#" with href="#checkout" (these are the buy buttons)
const newPlanos = planosSec.replace(/href="#"/g, 'href="#checkout"');

html = newBefore + newPlanos + newAfter;

fs.writeFileSync('index.html', html);

// Verify
const countPlanos = (html.match(/href="#planos"/g) || []).length;
const countCheckout = (html.match(/href="#checkout"/g) || []).length;
console.log('Done!');
console.log('  href="#planos" (scroll to offer):', countPlanos);
console.log('  href="#checkout" (buy buttons):', countCheckout);
