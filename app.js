// Array central de aplicativos
const apps = [
  {
    nome: "Calculadora de Temperatura e delta Minions",
    descricao: "Controle de temperatura e delta dos minions da linha de produção.",
    icone: "img/Calculadora-Pães.png",
    url: "https://ellierod.github.io/CalculadoraPaes/",
    pwa: true
  },
  {
    nome: "Controle de Massas e Kits",
    descricao: "Controle de massas e kits da masseira e sala de mescla.",
    icone: "img/controledekits.png",
    url: "https://ellierod.github.io/ControledeMassas/",
    pwa: true
  },
  {
    nome: "Controle de Lotes",
    descricao: "Controle de insumos de embalagens e fitilho.",
    icone: "img/controledelotes.png",
    url: "https://ellierod.github.io/Controle-de-Lotes/",
    pwa: true
  },
  {
    nome: "Controle de Qualidade - Segregados",
    descricao: "Controle de qualidade e validação para produtos segregados.",
    icone: "img/qa.png",
    url: "https://ellierod.github.io/QA-Segregados/",
    pwa: true
  },
  {
    nome: "Calendário de Claves",
    descricao: "Controle de data de validade e calendário de claves.",
    icone: "img/Calendarioclaves.png",
    url: "https://ellierod.github.io/calendarioclaves/",
    pwa: true
  }
];

// Busca a div do Grid no HTML
const appGrid = document.getElementById('appGrid');

// Renderiza os apps de forma simples (clicou, abriu em nova aba)
if (appGrid) {
  apps.forEach(app => {
    const card = document.createElement('a'); 
    card.className = 'app-card';
    card.href = app.url;
    card.target = "_blank"; // Abre em nova aba sem travar o PWA
    
    card.innerHTML = `
      <div class="icon-wrapper">
        <img src="${app.icone}" alt="${app.nome}" class="app-icon">
      </div>
      <h3>${app.nome}</h3>
    `;
    
    appGrid.appendChild(card);
  });
}

// --- Lógica de Instalação do Portal (PWA) ---
let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');

if (btnInstall) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = 'block'; // Mostra o botão se o navegador permitir
  });

  btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      }
      deferredPrompt = null;
      btnInstall.style.display = 'none';
    }
  });
}

// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registrado com sucesso!', reg))
      .catch(err => console.log('Erro ao registrar Service Worker:', err));
  });
}
