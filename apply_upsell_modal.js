const fs = require('fs');

function applyUpsellModal() {
    let htmlPath = 'c:/Users/gunuu/Desktop/CIFRAS/index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');

    const modalHTML = `
<!-- UPSELL MODAL -->
<div id="upsell-modal" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
  <div class="bg-white rounded-[24px] shadow-2xl w-full max-w-[420px] p-6 relative flex flex-col items-center">
    
    <!-- Close Button -->
    <button onclick="document.getElementById('upsell-modal').classList.add('hidden')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2 mb-4 mt-2">
      <div class="w-10 h-10 bg-[#3454D1] rounded-full flex items-center justify-center shadow-md">
        <span class="text-xl leading-none">🎁</span>
      </div>
      <span class="text-[#3454D1] font-black text-[15px] tracking-widest uppercase">Upgrade do Plano</span>
    </div>

    <!-- Urgency -->
    <div class="text-[#D32F2F] text-[13px] font-black uppercase tracking-wide mb-1 text-center">
      Condição disponível por poucos minutos
    </div>
    
    <!-- Timer -->
    <div id="upsell-timer" class="text-[#D32F2F] text-[32px] font-black leading-none mb-4 text-center tracking-tight">
      05:00
    </div>

    <!-- Title -->
    <h2 class="text-[26px] font-black text-center text-[#1C2331] leading-tight mb-3">
      Por mais <span class="text-[#39b574]">R$5</span>, leve o pacote completo!
    </h2>

    <!-- Subtitle -->
    <p class="text-center text-[#54657E] text-[15px] mb-5 px-2">
      Destrave o plano completo por <span class="font-bold text-[#3454D1]">R$22,90</span> e adicione ao seu material hoje:
    </p>

    <!-- Checklist -->
    <ul class="w-full space-y-2.5 mb-6 px-4">
      <li class="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39b574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="text-[#1C2331] font-semibold text-[14px]">Guia Prático de Iniciação</span>
      </li>
      <li class="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39b574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="text-[#1C2331] font-semibold text-[14px]">Dicionário de Acordes</span>
      </li>
      <li class="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39b574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="text-[#1C2331] font-semibold text-[14px]">Os 12 Acordes Essenciais</span>
      </li>
      <li class="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39b574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="text-[#1C2331] font-semibold text-[14px]">Certificado Personalizado</span>
      </li>
    </ul>

    <!-- CTA Button -->
    <a href="https://checkout.educacaodivertida.site/VCCL1O8SD3J4" class="w-full bg-[#20C967] hover:bg-[#1BA354] text-white font-extrabold text-[16px] py-4 rounded-[16px] text-center shadow-[0_8px_20px_-6px_rgba(32,201,103,0.5)] transition-all mb-4 transform hover:scale-[1.02]">
      SIM, QUERO ADICIONAR POR R$22,90
    </a>
    
    <!-- Secondary Link -->
    <a href="#" id="upsell-refuse" class="text-[#8492A6] text-[13px] font-bold underline hover:text-[#54657E] transition-colors pb-2">
      Não, quero apenas a versão essencial
    </a>
  </div>
</div>

<!-- UPSELL SCRIPT -->
<script>
  (function(){
    var timerInterval = null;
    var timerStarted = false;

    function startUpsellTimer() {
      if(timerStarted) return;
      timerStarted = true;
      var duration = 5 * 60; // 5 minutes
      var display = document.getElementById('upsell-timer');
      timerInterval = setInterval(function () {
          var minutes = parseInt(duration / 60, 10);
          var seconds = parseInt(duration % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          display.textContent = minutes + ":" + seconds;
          if (--duration < 0) {
              clearInterval(timerInterval);
              display.textContent = "00:00";
          }
      }, 1000);
    }

    var originalBasicLink = '#';

    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;
      
      var text = link.textContent.trim().toUpperCase();
      // Only intercept QUERO O BÁSICO buttons
      if (text.includes("QUERO O BÁSICO") && link.id !== 'upsell-refuse') {
        e.preventDefault();
        
        // Sometimes original links have utm parameters appended dynamically, so we capture the exact href at click time
        originalBasicLink = link.href;
        
        var modal = document.getElementById('upsell-modal');
        if(modal) {
          modal.classList.remove('hidden');
          document.getElementById('upsell-refuse').href = originalBasicLink;
          startUpsellTimer();
        }
      }
    });
  })();
</script>
`;

    if (!html.includes('id="upsell-modal"')) {
        html = html.replace('</body>', modalHTML + '\n</body>');
        fs.writeFileSync(htmlPath, html);
        console.log('Upsell modal added successfully.');
    } else {
        console.log('Upsell modal already exists.');
    }
}

applyUpsellModal();
