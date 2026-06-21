const board = document.getElementById('game-board');
const cards = Array.from(document.querySelectorAll('.card'));
const attemptsSpan = document.getElementById('attempts');

let flippedCards = [];
let attempts = 0;
let lockBoard = false;

cards.sort(() => Math.random() - 0.5);
cards.forEach(card => board.appendChild(card));

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.textContent = card.dataset.value;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsSpan.textContent = attempts;
            checkMatch();
        }
    });
});

function checkMatch() {
    let isMatch = flippedCards[0].dataset.value === flippedCards[1].dataset.value;

    if (isMatch) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            flippedCards[0].textContent = '?';
            flippedCards[1].textContent = '?';
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}