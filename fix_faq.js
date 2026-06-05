const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the full FAQ section and replace it
const faqSectionStart = html.lastIndexOf('<section class="bg-[#FFF7E8] py-12 md:py-16">');
const faqSectionEnd = html.indexOf('</section>', faqSectionStart) + '</section>'.length;

const faqs = [
  {
    q: 'Como vou receber o material?',
    a: 'Após a confirmação da compra, você recebe o acesso imediatamente por e-mail. É só baixar os PDFs e começar a usar.'
  },
  {
    q: 'O plano básico inclui o quê?',
    a: 'O plano básico inclui o PDF principal com 100 cantigas infantis em cifras, pensado para crianças iniciantes no ukulele.'
  },
  {
    q: 'O que tem no plano completo?',
    a: 'No plano completo você recebe as 100 cantigas infantis em cifras mais 4 bônus: guia prático de iniciação, dicionário de acordes, 12 acordes essenciais e certificado personalizado.'
  },
  {
    q: 'A criança precisa saber partitura para usar?',
    a: 'Não. A proposta começa com cifras simplificadas e apoio visual, justamente para facilitar o início sem depender da leitura musical tradicional logo de cara.'
  },
  {
    q: 'Serve para quem nunca tocou ukulele?',
    a: 'Sim. O material foi pensado para crianças iniciantes e trabalha um começo mais leve, divertido e progressivo.'
  },
  {
    q: 'Quais músicas fazem parte do material?',
    a: 'O PDF reúne cantigas infantis conhecidas, como Brilha Brilha Estrelinha, O Sapo Não Lava o Pé, Eu Vi Uma Barata e muitas outras, totalizando 100 músicas em cifras.'
  },
  {
    q: 'Preciso de algum aplicativo para usar?',
    a: 'Não. Você só precisa abrir o arquivo no celular, tablet ou computador para acessar o material. Se quiser, pode imprimir as páginas que fizerem mais sentido.'
  },
  {
    q: 'Esse material serve para casa e para aula?',
    a: 'Sim. Ele funciona muito bem para famílias, professoras e instrutoras que querem apresentar o ukulele com mais leveza, tanto em casa quanto nas aulas.'
  },
  {
    q: 'Para qual idade o material costuma funcionar melhor?',
    a: 'Ele foi pensado para crianças em fase de iniciação musical. O aproveitamento varia conforme o interesse da criança e o acompanhamento de um adulto ou professora.'
  },
  {
    q: 'Posso imprimir quantas vezes quiser?',
    a: 'Sim. Depois de receber o material, você pode imprimir conforme a sua necessidade de uso no aprendizado da criança.'
  },
  {
    q: 'Existe garantia?',
    a: 'Sim. Você tem 15 dias de garantia para acessar, testar com a criança e decidir com tranquilidade. Se não fizer sentido para você, pode solicitar o reembolso nesse prazo.'
  },
  {
    q: 'O acesso é por tempo limitado?',
    a: 'Não. O acesso ao material é liberado para você consultar sempre que precisar.'
  }
];

const faqItems = faqs.map((item, i) => `
  <div class="faq-item bg-white rounded-lg border border-[#F5D6B8]" id="faq-${i}">
    <button
      type="button"
      class="faq-trigger w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:underline"
      onclick="toggleFaq(${i})"
      aria-expanded="false"
      aria-controls="faq-answer-${i}"
    >
      <span>${item.q}</span>
      <svg class="faq-icon h-4 w-4 shrink-0 transition-transform duration-200 ml-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
    </button>
    <div id="faq-answer-${i}" class="faq-answer px-6 pb-4 text-sm text-muted-foreground" style="display:none;">
      ${item.a}
    </div>
  </div>`).join('\n');

const newFaqSection = `<section class="bg-[#FFF7E8] py-12 md:py-16">
  <div class="container max-w-3xl mx-auto px-4">
    <h2 class="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Perguntas Frequentes</h2>
    <div class="space-y-3">
      ${faqItems}
    </div>
  </div>
  <script>
    function toggleFaq(index) {
      var answer = document.getElementById('faq-answer-' + index);
      var btn = answer.previousElementSibling;
      var icon = btn.querySelector('.faq-icon');
      var isOpen = answer.style.display !== 'none';
      answer.style.display = isOpen ? 'none' : 'block';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  </script>
</section>`;

html = html.substring(0, faqSectionStart) + newFaqSection + html.substring(faqSectionEnd);

fs.writeFileSync('index.html', html);
console.log('FAQ rebuilt successfully!');
