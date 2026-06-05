const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const images = [
  'feedb1-C-4DPPHh.webp',
  'feedb2-CALenSRG.webp',
  'feedb3-CPEkmARv.webp',
  'feedb4-BBK58v-8.webp',
  'feedb5-BqOZG2ht.webp',
  'feedb6-5NmKcacQ.webp',
  'feedb7-ClbkD70c.webp',
  'feedb8-CsOOAg2Q.webp',
];

const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star h-4 w-4 fill-current"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>`;

// All slides stacked with absolute positioning; fade in/out via opacity + pointer-events
const slides = images.map((img, i) => `
        <div class="testimonial-slide" id="slide-${i}" style="position:absolute;top:0;left:0;width:100%;opacity:${i === 0 ? '1' : '0'};pointer-events:${i === 0 ? 'auto' : 'none'};transition:opacity 0.5s ease;">
          <img src="assets/${img}" alt="Depoimento ${i+1} sobre o material" class="w-full h-auto object-cover rounded-xl border border-[#F5D6B8]" decoding="async" loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>`).join('');

const dots = images.map((_, i) => `
        <button
          class="testimonial-dot rounded-full transition-all duration-300 ${i === 0 ? 'h-1.5 w-4 bg-[#F58B6A]' : 'h-1.5 w-1.5 bg-[#F2D1B8] hover:bg-[#E5B58E]'}"
          aria-label="Ir para o depoimento ${i+1}"
          onclick="goToSlide(${i})"
          id="dot-${i}"
        ></button>`).join('');

// We need the wrapper to have the height of the tallest image.
// Since all images are the same aspect ratio screenshots, we use padding-top trick:
// We'll use a relative container with a ghost image (first image) to set the height naturally,
// then stack all slides absolutely on top.
const newSection = `<section class="bg-[#FFF7E8] py-6 md:py-16">
  <div class="container px-4">
    <h2 class="text-2xl md:text-3xl uppercase font-extrabold text-center text-foreground mb-2 leading-tight">Veja o que estão dizendo sobre o material</h2>
    <p class="text-center text-base text-muted-foreground mb-5">Feedbacks de quem buscou um jeito mais leve e prático de apresentar o ukulele às crianças.</p>

    <div class="max-w-sm mx-auto flex flex-col items-center">
      <div class="flex w-full flex-col items-center rounded-[24px] border border-[#F5D6B8] bg-white p-2 shadow-[0_24px_50px_-34px_rgba(245,139,106,0.42)]">

        <!-- Slider: ghost image sets natural height, slides fade on top -->
        <div style="position:relative;width:100%;" id="testimonials-track">
          <!-- Ghost image to hold height (invisible but takes space) -->
          <img src="assets/feedb1-C-4DPPHh.webp" aria-hidden="true" style="width:100%;visibility:hidden;display:block;" class="rounded-xl">
          <!-- All real slides stacked on top -->
          ${slides}
        </div>

        <div class="mt-3 mb-2 flex items-center justify-center gap-2 text-[#FFB300]">
          <div class="flex items-center gap-1">${starSvg}${starSvg}${starSvg}${starSvg}${starSvg}</div>
          <span class="text-sm font-semibold text-muted-foreground">(1723 avaliações)</span>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-center gap-5 mt-3 mb-4 w-full">
        <button onclick="prevSlide()" class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F58B6A] text-white shadow-md transition-all hover:scale-105 hover:bg-[#eb7652] active:scale-95" aria-label="Depoimento anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
        </button>
        <div class="flex items-center gap-1.5" id="dots-container">
          ${dots}
        </div>
        <button onclick="nextSlide()" class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F58B6A] text-white shadow-md transition-all hover:scale-105 hover:bg-[#eb7652] active:scale-95" aria-label="Próximo depoimento">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>

      <a href="#planos" class="block w-full max-w-sm rounded-lg bg-[#39b574] px-8 py-4 text-center text-xl font-extrabold text-white transition-all animate-pulse shadow-[0_18px_34px_-18px_rgba(57,181,116,0.72)] hover:bg-[#379263]">QUERO GARANTIR AS 100 CANTIGAS</a>
    </div>
  </div>

  <script>
    (function() {
      var total = ${images.length};
      var current = 0;
      var autoTimer = null;
      var isAnimating = false;

      function showSlide(index) {
        if (isAnimating) return;
        var next = (index + total) % total;
        if (next === current) return;

        isAnimating = true;
        var outSlide = document.getElementById('slide-' + current);
        var inSlide  = document.getElementById('slide-' + next);
        var oldDot   = document.getElementById('dot-' + current);
        var newDot   = document.getElementById('dot-' + next);

        // Fade out current
        outSlide.style.opacity = '0';
        outSlide.style.pointerEvents = 'none';

        // Fade in next
        inSlide.style.opacity = '1';
        inSlide.style.pointerEvents = 'auto';

        // Update dots
        if (oldDot) oldDot.className = 'testimonial-dot rounded-full transition-all duration-300 h-1.5 w-1.5 bg-[#F2D1B8] hover:bg-[#E5B58E]';
        if (newDot) newDot.className = 'testimonial-dot rounded-full transition-all duration-300 h-1.5 w-4 bg-[#F58B6A]';

        current = next;
        setTimeout(function() { isAnimating = false; }, 550);
      }

      window.goToSlide = function(index) { showSlide(index); resetTimer(); };
      window.nextSlide = function() { showSlide(current + 1); resetTimer(); };
      window.prevSlide = function() { showSlide(current - 1); resetTimer(); };

      function resetTimer() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(function() { showSlide(current + 1); }, 4000);
      }

      resetTimer();
    })();
  </script>
</section>`;

// Replace the testimonials section
const sectionStart = html.indexOf('<section class="bg-[#FFF7E8] py-6 md:py-16">');
const sectionEnd = html.indexOf('</section>', sectionStart) + '</section>'.length;

html = html.substring(0, sectionStart) + newSection + html.substring(sectionEnd);

fs.writeFileSync('index.html', html);
console.log('Testimonials carousel fixed with smooth fade transition!');
