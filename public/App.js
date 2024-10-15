const animals = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    '🐧', '🐦', '🐤', '🦉', '🦄', '🐴', '🐢', '🐍',
    '🐬', '🐳', '🐟', '🦈', '🦀', '🐜', '🦋', '🐞',
    '🦕', '🦖', '🐙', '🐢', '🦓', '🦒', '🦍', '🐘'
];

let targetAnimal = null;
let gameStarted = false;
let timer = null;
let countdown = 5;
const timerElement = document.getElementById('timer');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

// Crear el tablero de juego
const gameBoard = document.getElementById('game-board');

function createBoard() {
    gameBoard.innerHTML = '';  // Asegúrate de vaciar el tablero cada vez
    animals.forEach(animal => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = `<span>${animal}</span>`;
        cell.addEventListener('click', () => checkSelection(animal));
        gameBoard.appendChild(cell);
    });
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    modal.classList.remove('active'); // Ocultar el modal si está abierto
    countdown = 5;
    timerElement.textContent = countdown;
    
    const randomIndex = Math.floor(Math.random() * animals.length);
    targetAnimal = animals[randomIndex];
    document.getElementById('target-image').innerHTML = `<h2>Encuentra: ${targetAnimal}</h2>`;

    // Iniciar el temporizador de 5 segundos
    timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(timer);
            gameStarted = false;
            showModal("Suerte para la próxima!");
        }
    }, 1000);
}

function checkSelection(animal) {
    if (!gameStarted) return;

    if (animal === targetAnimal) {
        clearInterval(timer);
        gameStarted = false;
        showModal("¡Correcto!");
    }
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('active'); // Mostrar el modal
}

// Botón para empezar el juego
document.getElementById('start-button').addEventListener('click', () => {
    createBoard(); // Crear el tablero antes de iniciar el juego
    startGame();
});

// Botón para cerrar el modal
document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.remove('active'); // Ocultar el modal
});
