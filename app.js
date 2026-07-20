// Array central de aplicativos. Para adicionar um app novo, basta inserir um objeto aqui!
const apps = [
  {
    nome: "Calculadora de Temperatura e delta Minions",
    descricao: "Controle de temperatura e delta dos minions da linha de produção.",
    icone: "img/Calculadora-Pães.png", // caminho para o ícone
    url: "https://ellierod.github.io/CalculadoraPaes/", // link para o app
    pwa: true // se ele também pode ser instalado individualmente
  },

{
    nome: "Controle de Massas e Kits",
    descricao: "Controle de massas e kits da masseira e sala de mescla.",
    icone: "img/controledekits.png", // caminho para o ícone
    url: "https://ellierod.github.io/ControledeMassas/", // link para o app
    pwa: true // se ele também pode ser instalado individualmente
  },

{
    nome: "Controle de Lotes",
    descricao: "Controle de insumos de embalagens e fitilho.",
    icone: "img/controledelotes.png", // caminho para o ícone
    url: "https://ellierod.github.io/Controle-de-Lotes/", // link para o app
    pwa: true // se ele também pode ser instalado individualmente
  },

{
    nome: "Controle de Qualidade - Segregados",
    descricao: "Controle de qualidade e validação para produtos segregados.",
    icone: "img/qa.png", // caminho para o ícone
    url: "https://ellierod.github.io/QA-Segregados/", // link para o app
    pwa: true // se ele também pode ser instalado individualmente
  },
{
    nome: "Calendário de Claves",
    descricao: "Controle de data de validade e calendário de claves.",
    icone: "img/Calendarioclaves.png", // caminho para o ícone
    url: "https://ellierod.github.io/calendarioclaves/", // link para o app
    pwa: true // se ele também pode ser instalado individualmente
  },
  
];

// Renderiza os apps na tela
// Renderiza os apps de forma simples: clicou, abriu em nova aba.
apps.forEach(app => {
  const card = document.createElement('a'); 
  card.className = 'app-card';
  card.href = app.url;
  card.target = "_blank"; // Abre em nova aba para não bugar o PWA
  
  card.innerHTML = `
    <div class="icon-wrapper">
      <img src="${app.icone}" alt="${app.nome}" class="app-icon">
    </div>
    <h3>${app.nome}</h3>
  `;
  
  appGrid.appendChild(card);
});

// --- RESTAURANDO O BOTÃO DE INSTALAR PORTAL (No topo) ---
let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.style.display = 'block'; // O botão volta a aparecer no Header
});

btnInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    btnInstall.style.display = 'none';
  }
});



// --- Lógica de Instalação do Portal (PWA) ---
let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.style.display = 'block'; // Mostra o botão se o dispositivo permitir instalação
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

// Registra o Service Worker para habilitar o PWA / Instalação
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registrado com sucesso!', reg))
      .catch(err => console.log('Erro ao registrar Service Worker:', err));
  });
}
