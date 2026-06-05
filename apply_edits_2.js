const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove WhatsApp Icon
// Let's just remove the entire image tag for wppicon
html = html.replace(/<img[^>]*wppicon-BOpxMtdQ\.webp[^>]*>/gi, '');
// Clean up the text "no seu  no e-mail" if it got messed up
html = html.replace(/no seu\s*no\s*<img/gi, 'no <img');
html = html.replace(/direto no seu<br>\s*no/gi, 'direto no seu<br>');

// 2. Remove the 3rd carousel (the one below QUERO GARANTIR MEU ACESSO)
// The CTA ends and then we have `<div class="mt-8 relative w-full flex overflow-hidden group">` or similar.
const ctaIndex = html.lastIndexOf('QUERO GARANTIR MEU ACESSO');
if (ctaIndex !== -1) {
    const carouselStart = html.indexOf('<div class="mt-8 relative w-full flex overflow-hidden group', ctaIndex);
    if (carouselStart !== -1) {
        // Find the matching end div
        let depth = 1;
        let i = carouselStart + '<div'.length;
        while (depth > 0 && i < html.length) {
            const nextDiv = html.indexOf('<div', i);
            const nextEndDiv = html.indexOf('</div>', i);
            if (nextDiv !== -1 && nextDiv < nextEndDiv) {
                depth++;
                i = nextDiv + 4;
            } else if (nextEndDiv !== -1) {
                depth--;
                i = nextEndDiv + 6;
            } else {
                break;
            }
        }
        // Remove it
        html = html.substring(0, carouselStart) + html.substring(i);
        console.log('Removed carousel starting at', carouselStart);
    } else {
        console.log('Could not find the carousel div after CTA');
    }
}

fs.writeFileSync('index.html', html);
console.log('Edits applied!');
