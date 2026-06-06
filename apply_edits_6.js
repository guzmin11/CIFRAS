const fs = require('fs');

function applyEdits() {
    // 1 & 2: Edit index.html
    let htmlPath = 'c:/Users/gunuu/Desktop/CIFRAS/index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    html = html.replace('🎵 MATERIAL DIGITAL · IMPRESSÃO IMEDIATA', '🎵 PARA PROFESSORAS E PAIS · IMPRESSÃO IMEDIATA');
    html = html.replace('Aprendizado fácil e divertido para crianças começarem a tocar hoje', 'Para professoras de musicalização e pais que querem ver a criança tocando hoje');
    
    fs.writeFileSync(htmlPath, html);
    console.log('index.html updated successfully.');

    // 3, 4, 5, 6: Edit assets/index-YIhNH5RW.js
    let jsPath = 'c:/Users/gunuu/Desktop/CIFRAS/assets/index-YIhNH5RW.js';
    let js = fs.readFileSync(jsPath, 'utf8');
    
    // Change 3: Add card to Esse material é ideal para você que
    let oldHeArrayEnd = 'ensinar ukulele com mais leveza."}]';
    let newHeArrayEnd = 'ensinar ukulele com mais leveza."},{icon:"👩‍🏫",title:"É professora de musicalização",text:"Tenha um repertório completo e organizado pra usar direto nas aulas, sem montar nada do zero."}]';
    if (js.includes(oldHeArrayEnd)) {
        js = js.replace(oldHeArrayEnd, newHeArrayEnd);
        // Also modify the map render
        let oldMapRender = 'children:[c.jsx(gE,{}),c.jsxs("div"';
        let newMapRender = 'children:[e.icon ? c.jsx("div",{className:"text-2xl mt-0.5 leading-none flex-shrink-0",children:e.icon}) : c.jsx(gE,{}),c.jsxs("div"';
        js = js.replace(oldMapRender, newMapRender);
    } else {
        console.log('Could not find hE array end!');
    }

    // Change 4: Add ❌✅
    let oldFeEnd = 'tocar uma música conhecida."]';
    let newFeEnd = 'tocar uma música conhecida.","Você passa horas montando material pra aula e ainda não tem repertório infantil organizado."]';
    if (js.includes(oldFeEnd)) {
        js = js.replace(oldFeEnd, newFeEnd);
    } else {
        console.log('Could not find fE array end!');
    }

    let oldPeEnd = 'nas primeiras práticas."]';
    let newPeEnd = 'nas primeiras práticas.","Receber 100 cantigas já em cifras, organizadas e prontas pra usar na aula hoje mesmo."]';
    if (js.includes(oldPeEnd)) {
        js = js.replace(oldPeEnd, newPeEnd);
    } else {
        console.log('Could not find pE array end!');
    }

    // Change 5: Bullet replacement
    let oldBullet = '"Material visual para apoiar ritmo, coordenação e familiaridade com acordes e batidas"';
    let newBullet = '"Material visual pensado pra aula prática — cifras, ritmo e diagramas de acordes prontos pra impressão"';
    if (js.includes(oldBullet)) {
        js = js.replace(oldBullet, newBullet);
    } else {
        console.log('Could not find bullet!');
    }

    // Change 6: FAQ addition
    let oldFaqEnd = '{q:"O acesso é por tempo limitado?",a:"Não. O acesso ao material é liberado para você consultar sempre que precisar."}]';
    let newFaqEnd = '{q:"O acesso é por tempo limitado?",a:"Não. O acesso ao material é liberado para você consultar sempre que precisar."},{q:"Esse material serve para professoras de musicalização?",a:"Sim. Muitas professoras usam o material como base de repertório nas aulas, já que tudo vem organizado em PDF, pronto pra imprimir e usar com os alunos."}]';
    if (js.includes(oldFaqEnd)) {
        js = js.replace(oldFaqEnd, newFaqEnd);
    } else {
        console.log('Could not find FAQ end!');
    }

    fs.writeFileSync(jsPath, js);
    console.log('index-YIhNH5RW.js updated successfully.');
}

applyEdits();
