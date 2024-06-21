// Lista de reprodução (exemplo)
const playlist = [
    { name: "Never Gonna Give You Up", artist: "Rick Astley", file: "/audio/Rick Astley - Never Gonna Give You Up.mp3" },
    { name: "Finesse (Remix) feat. Cardi B", artist: "Bruno Mars", file: "/audio/Bruno Mars - Finesse (remix) Feat Cardi B.mp3" }
    // Adicione mais músicas conforme necessário
];

// Elementos de áudio e variáveis de estado
const audio = new Audio();
let isPlaying = false;
let currentTrack = 0;
let isShuffle = false;
let repeatMode = 'none';

// Função para tocar ou pausar o áudio
function playPauseAudio() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
}

// Função para atualizar o ícone do botão Play/Pause
function updatePlayPauseButton() {
    const playPauseButton = document.querySelector('.play-btn img');
    playPauseButton.src = isPlaying ? '/images/pause-button.svg' : '/images/play-button-arrowhead.png';
}

// Função para trocar o modo de repetição
function toggleRepeat() {
    switch (repeatMode) {
        case 'none':
            repeatMode = 'one';
            break;
        case 'one':
            repeatMode = 'all';
            break;
        case 'all':
            repeatMode = 'none';
            break;
    }
    updateRepeatButton();
}

// Função para atualizar o ícone do botão Repeat
function updateRepeatButton() {
    const repeatButton = document.querySelector('.footer-player-middle-buttons button:nth-child(5) img');
    switch (repeatMode) {
        case 'none':
            repeatButton.src = '/assets/Repeat.svg';
            break;
        case 'one':
            repeatButton.src = '/assets/RepeatOne.svg';
            break;
        case 'all':
            repeatButton.src = '/assets/RepeatAll.svg';
            break;
    }
}

// Função para tocar a faixa anterior
function playPreviousTrack() {
    currentTrack--;
    if (currentTrack < 0) {
        currentTrack = playlist.length - 1;
    }
    playNewTrack();
}

// Função para tocar a próxima faixa
function playNextTrack() {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * playlist.length);
    } else {
        currentTrack++;
        if (currentTrack >= playlist.length) {
            currentTrack = 0;
        }
    }
    playNewTrack();
}

// Função para tocar uma nova faixa
function playNewTrack() {
    audio.src = playlist[currentTrack].file;
    audio.play();
    isPlaying = true;
    updatePlayPauseButton();
    updateCurrentTrackInfo();
}

// Função para atualizar informações da música atual
function updateCurrentTrackInfo() {
    document.querySelector('.footer-player-left-song-name').textContent = playlist[currentTrack].name;
    document.querySelector('.footer-player-left-song-artist').textContent = playlist[currentTrack].artist;
}

// Função para alternar o modo Shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    // Atualize o ícone do botão Shuffle se necessário
    const shuffleButton = document.querySelector('.footer-player-middle-buttons button:nth-child(1) img');
    shuffleButton.src = isShuffle ? '/assets/ShuffleActive.svg' : 'assets/Shuffle.svg';
}

// Event listeners para os botões
document.querySelector('.footer-player-middle-buttons button:nth-child(1)').addEventListener('click', toggleShuffle); // Shuffle
document.querySelector('.footer-player-middle-buttons button:nth-child(2)').addEventListener('click', playPreviousTrack); // Previous
document.querySelector('.footer-player-middle-buttons button:nth-child(4)').addEventListener('click', playNextTrack); // Next
document.querySelector('.footer-player-middle-buttons button:nth-child(5)').addEventListener('click', toggleRepeat); // Repeat

// Inicializa a primeira música

playNewTrack();


