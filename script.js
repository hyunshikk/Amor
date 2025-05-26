// Variáveis globais
let isPlaying = false;
let currentTime = 0;
let progressInterval;
let heartInterval;
let starInterval;

const totalTime = 251; // duração da música
const music = document.getElementById('musica');

// Elementos do DOM
const initialScreen = document.getElementById('initial-screen');
const storyScreen = document.getElementById('story-screen');
const startButton = document.getElementById('start-button');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.querySelector('.current-time');
const fallingHeartsContainer = document.getElementById('falling-hearts');
const twinklingStarsContainer = document.getElementById('twinkling-stars');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeEventListeners();
    startLiveCounter();
});

function initializeEventListeners() {
    startButton.addEventListener('click', showStoryScreen);
    playPauseBtn.addEventListener('click', togglePlayPause);
}

function showStoryScreen() {
    initialScreen.classList.remove('active');
    setTimeout(() => {
        storyScreen.classList.add('active');
        loadRandomPhotos();
        loadRandomQuotes();
    }, 300);
}

// Música
function togglePlayPause() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playPauseBtn.textContent = '⏸️';
        music.play();
        startMusicProgress();
    } else {
        playPauseBtn.textContent = '▶️';
        music.pause();
        stopMusicProgress();
    }
}

function startMusicProgress() {
    progressInterval = setInterval(() => {
        if (!music.paused) {
            currentTime = Math.floor(music.currentTime);
            updateProgressBar();
        }
    }, 1000);
}

function stopMusicProgress() {
    if (progressInterval) clearInterval(progressInterval);
}

function updateProgressBar() {
    const progressPercentage = (currentTime / totalTime) * 100;
    progressFill.style.width = progressPercentage + '%';
    currentTimeEl.textContent = formatTime(currentTime);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Contador
function startLiveCounter() {
    const startDate = new Date('2024-09-08T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// Corações e estrelas
function initializeAnimations() {
    createFallingHearts();
    createTwinklingStars();
    heartInterval = setInterval(createFallingHearts, 6000);
    starInterval = setInterval(createTwinklingStars, 5000);
}

function createFallingHearts() {
    fallingHeartsContainer.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 6 + 's';
        fallingHeartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
}

function createTwinklingStars() {
    const existingStars = twinklingStarsContainer.children.length;
    if (existingStars < 25) {
        for (let i = existingStars; i < 25; i++) {
            const star = document.createElement('div');
            star.className = 'twinkling-star';
            star.textContent = '✨';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = (Math.random() * 8 + 10) + 'px';
            star.style.animationDelay = Math.random() * 3 + 's';
            twinklingStarsContainer.appendChild(star);
        }
    }
}

// Embaralhar array (sem repetir)
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Fotos com frases únicas
function loadRandomPhotos() {
    const container = document.getElementById('photo-gallery');
    container.innerHTML = '';

    const imageIndexes = shuffleArray([...Array(12).keys()].map(i => i + 1));
    const frases = shuffleArray([
        "Cada momento ao seu lado é um presente que guardo no coração",
        "Você transformou minha vida em um conto de fadas real",
        "No silêncio dos seus olhos, encontrei todas as palavras que precisava",
        "Seu sorriso é meu lugar favorito",
        "Com você, até o silêncio tem som de amor",
        "Nada é mais bonito do que nossos momentos juntos",
        "Meu coração escolheu você sem dúvidas",
        "Cada dia com você é uma nova chance de ser feliz",
        "Te amar é a poesia que eu sempre quis escrever",
        "Em seus braços, encontrei meu lar",
        "Você é meu hoje e todos os meus amanhãs",
        "Nossos risos juntos são minha melodia preferida",
        "Com você, cada instante é mágico",
        "Amar você é minha melhor decisão",
        "Seus olhos brilham mais que qualquer estrela",
        "Você é a página mais linda do meu livro",
        "Nosso amor é meu conto favorito",
        "Seu abraço é meu refúgio",
        "Nada se compara à paz que você me traz",
        "A vida faz sentido com você ao lado"
    ]);

    for (let i = 0; i < 3; i++) {
        const imgNum = imageIndexes[i];
        const frase = frases[i];
        container.innerHTML += `
            <div class="photo-card">
                <div class="photo-container">
                    <img src="image/${imgNum}.jpg" alt="Foto aleatória">
                </div>
                <p class="photo-quote">"${frase}"</p>
            </div>`;
    }
}

// Frases únicas
function loadRandomQuotes() {
    const container = document.getElementById('quotes-section');
    container.innerHTML = '';

    const frases = shuffleArray([
        "Nosso amor é como as estrelas: eterno, brilhante e infinito",
        "Com você, descobri que o amor verdadeiro existe e é ainda mais lindo do que imaginava",
        "Você é minha paz em meio ao caos",
        "Amar você é a melhor parte da minha vida",
        "Nada no mundo se compara ao brilho do seu sorriso",
        "O tempo para quando estou com você",
        "Você é o motivo do meu sorriso bobo",
        "Seu amor é minha melhor poesia",
        "A cada olhar, me apaixono mais por você",
        "Você faz minha alma dançar",
        "Te encontrar foi a maior sorte da minha vida",
        "Estar com você é viver um sonho acordado",
        "Sua voz acalma meu coração",
        "Somos dois corações batendo como um só",
        "Você é o sol do meu dia mais nublado",
        "Seu carinho é o que me faz forte",
        "O amor mora no seu abraço",
        "Cada detalhe seu me encanta",
        "Você é meu presente mais bonito",
        "Nossa história é meu lugar preferido"
    ]);

    for (let i = 0; i < 2; i++) {
        const frase = frases[i];
        container.innerHTML += `
            <div class="quote-card">
                <p class="quote-text">"${frase}"</p>
                <div class="quote-heart">💕</div>
            </div>`;
    }
}
