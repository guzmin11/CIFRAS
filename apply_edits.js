const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove WhatsApp mentions
html = html.replace(/WhatsApp e no seu/gi, 'no seu');
html = html.replace(/<img src="assets\/wppicon-BOpxMtdQ\.webp" alt="WhatsApp"[^>]*> WhatsApp e no seu/gi, '');
html = html.replace(/imediatamente por e-mail e WhatsApp/gi, 'imediatamente por e-mail');
html = html.replace(/por WhatsApp e e-mail/gi, 'por e-mail');

// 2. Change brand name
html = html.replace(/Cifras Infantil/g, 'Educação Divertida');
html = html.replace(/cifras infantil/gi, 'educação divertida');

// 3. Remove 3rd carousel below CTA "QUERO VER MEU FILHO TOCANDO"
// Wait, the CTA might have been changed. We will look for "QUERO VER MEU FILHO TOCANDO" or the section it's in.
// Let's just find the CTA and remove the subsequent carousel.
// Actually, let's look for "ESSE MATERIAL É IDEAL PARA VOCÊ QUE..."
const sectionIdealStart = html.indexOf('ESSE MATERIAL É IDEAL PARA VOCÊ QUE...');
if (sectionIdealStart !== -1) {
    // The section starts with `<section class="...` before this text.
    const sectionStart = html.lastIndexOf('<section', sectionIdealStart);
    const sectionEnd = html.indexOf('</section>', sectionIdealStart) + '</section>'.length;
    html = html.substring(0, sectionStart) + html.substring(sectionEnd);
}

// For the 3rd carousel: 
// In the original html, there are multiple `<div class="relative w-full flex overflow-hidden group`.
// Let's find all instances.
let carouselMatches = [...html.matchAll(/<div class="relative w-full flex overflow-hidden group/g)];
if (carouselMatches.length >= 3) {
    // Remove the 3rd one. It is inside a section or just a div.
    // Let's remove the whole `<div ... > ... </div></div>` structure.
    const startIdx = carouselMatches[2].index;
    // Find the end of this carousel div.
    let depth = 1;
    let i = startIdx + '<div'.length;
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
    html = html.substring(0, startIdx) + html.substring(i);
}

// 4. Remove checkout links
// Replace href="#planos" or any other links with href="#"
html = html.replace(/href="[^"]*"/g, (match) => {
    if (match.includes('.css') || match.includes('.js')) return match; // Keep assets
    return 'href="#"';
});

// 5. Change CTA text "QUERO VER MEU FILHO TOCANDO"
html = html.replace(/QUERO VER MEU FILHO TOCANDO/g, 'QUERO GARANTIR MEU ACESSO');
// Also change the ones that were just lowercase or similar if any.
html = html.replace(/Quero ver meu filho tocando/ig, 'QUERO GARANTIR MEU ACESSO');

// 6. Fix FAQ
// The FAQ details/summary issue might be that tailwind resets details/summary.
// Let's ensure there is no custom pointer-events-none or display-none.
// In the HTML I inserted earlier:
// <details class="group ..."><summary class="...">...</summary><div>...</div></details>
// That is perfectly valid. The problem might be the user clicked the text and nothing happened if there was absolute positioning or if JS prevented default. But there is no JS preventing default.
// Another possibility: The div containing the answer needs to be visible. `group-open:block hidden` ? No, `<details>` automatically shows/hides its contents in modern browsers.
// Ah! In Tailwind preflight, `details` content is not hidden by default if someone overrides it? No, it works normally.
// Wait! `details` tag works without JS. BUT the tailwind CSS might be hiding the content. 
// Let's wrap the answer in an explicit block for group-open, or just rely on native behavior.
// Let's fix it by adding native behavior just in case:
html = html.replace(/<\/style>/, '\ndetails > summary { cursor: pointer; list-style: none; }\ndetails[open] > div { display: block; }\ndetails:not([open]) > div { display: none; }\n</style>');

fs.writeFileSync('index.html', html);
console.log('Edits applied!');
