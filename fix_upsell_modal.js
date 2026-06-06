const fs = require('fs');

function fixUpsellModal() {
    let htmlPath = 'c:/Users/gunuu/Desktop/CIFRAS/index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Remove the old modal and script
    const startIdx = html.indexOf('<!-- UPSELL MODAL -->');
    if (startIdx !== -1) {
        html = html.substring(0, startIdx);
    }

    const modalHTML = `
<!-- UPSELL MODAL -->
<style>
  #upsell-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    padding: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  #upsell-modal.show {
    opacity: 1;
    pointer-events: auto;
  }
  .upsell-box {
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-width: 380px;
    padding: 24px 20px 16px 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    max-height: 95vh;
    overflow-y: auto;
  }
  .upsell-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #9CA3AF;
  }
  .upsell-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .upsell-icon-wrap {
    width: 32px;
    height: 32px;
    background-color: #3454D1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .upsell-title {
    color: #3454D1;
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .upsell-urgency {
    color: #D32F2F;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
    text-align: center;
  }
  .upsell-timer {
    color: #D32F2F;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 12px;
    text-align: center;
    letter-spacing: -1px;
  }
  .upsell-main-text {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    color: #1C2331;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .upsell-sub-text {
    text-align: center;
    color: #54657E;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.3;
  }
  .upsell-list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .upsell-list-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .upsell-list-item svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
  .upsell-list-text {
    color: #1C2331;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.3;
  }
  .upsell-btn {
    width: 100%;
    background-color: #20C967;
    color: #ffffff;
    font-weight: 800;
    font-size: 15px;
    padding: 16px 8px;
    border-radius: 12px;
    text-align: center;
    text-decoration: none;
    box-shadow: 0 8px 20px -6px rgba(32, 201, 103, 0.5);
    margin-bottom: 12px;
    display: block;
    box-sizing: border-box;
    transition: transform 0.2s, background-color 0.2s;
  }
  .upsell-btn:hover {
    background-color: #1BA354;
    transform: scale(1.02);
  }
  .upsell-refuse {
    color: #8492A6;
    font-size: 13px;
    font-weight: 700;
    text-decoration: underline;
    text-align: center;
  }
</style>

<div id="upsell-modal">
  <div class="upsell-box">
    <button onclick="document.getElementById('upsell-modal').classList.remove('show')" class="upsell-close" aria-label="Fechar">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <div class="upsell-header">
      <div class="upsell-icon-wrap">
        <span style="font-size: 16px; line-height: 1;">🎁</span>
      </div>
      <span class="upsell-title">Upgrade do Plano</span>
    </div>

    <div class="upsell-urgency">Condição disponível por poucos minutos</div>
    <div id="upsell-timer" class="upsell-timer">05:00</div>

    <h2 class="upsell-main-text">
      Por mais <span style="color: #20C967;">R$5</span>, leve o pacote completo!
    </h2>

    <p class="upsell-sub-text">
      Destrave o plano completo por <span style="font-weight: 700; color: #3454D1;">R$22,90</span> e adicione ao seu material hoje:
    </p>

    <ul class="upsell-list">
      <li class="upsell-list-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20C967" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="upsell-list-text">Guia Prático de Iniciação</span>
      </li>
      <li class="upsell-list-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20C967" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="upsell-list-text">Dicionário de Acordes</span>
      </li>
      <li class="upsell-list-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20C967" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="upsell-list-text">Os 12 Acordes Essenciais</span>
      </li>
      <li class="upsell-list-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#20C967" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="upsell-list-text">Certificado Personalizado</span>
      </li>
    </ul>

    <a href="https://checkout.educacaodivertida.site/VCCL1O8SD3J4" class="upsell-btn">
      SIM, QUERO ADICIONAR POR R$22,90
    </a>
    
    <a href="#" id="upsell-refuse" class="upsell-refuse">
      Não, quero apenas a versão essencial
    </a>
  </div>
</div>

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
          modal.classList.add('show');
          document.getElementById('upsell-refuse').href = originalBasicLink;
          startUpsellTimer();
        }
      }
    });
  })();
</script>
`;

    html += modalHTML + '\n</body>';
    fs.writeFileSync(htmlPath, html);
    console.log('Upsell modal fixed successfully.');
}

fixUpsellModal();
