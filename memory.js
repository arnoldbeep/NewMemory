const cards = document.querySelectorAll('.card');
const flippedCards = [];

// Add click event listener to each card
cards.forEach(card => {
  card.addEventListener('click', flipCard);
});

// Get reset button element
const resetButton = document.querySelector('#reset-button');

// Add click event listener to reset button
resetButton.addEventListener('click', () => {
  // Shuffle cards
  shuffleCards();

  // Flip all cards back over
  const flippedCards = document.querySelectorAll('.flipped');
  flippedCards.forEach(card => {
    card.classList.remove('flipped');
  });

  // Add click event listener to each card
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });

  // Reset flippedCards array
  flippedCards.length = 0;
});

// Shuffle cards
function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Check if two flipped cards match
function checkMatch(firstCard, secondCard) {
  if (firstCard.querySelector('.card-back-content').textContent === secondCard.querySelector('.card-back-content').textContent) {
    // Keep cards flipped if they match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Remove click listeners for all cards
    cards.forEach(card => {
      card.removeEventListener('click', flipCard);
    });

    // Add click event listener to each card after a delay
    setTimeout(() => {
      cards.forEach(card => {
        card.addEventListener('click', flipCard);
      });
    }, 1000);
  } else {
    // Flip cards back over if they don't match
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
    }, 1000);
  }

  // Reset  array
  flippedCards.length = 0;

  // Check if all cards are flipped
  checkWin();
}

// Add click event listener to  cards
function flipCard() {
  // Check if less than 2 cards are flipped
  if (flippedCards.length < 2) {
    this.classList.toggle('flipped');

    // Add flipped card to  array
    flippedCards.push(this);

    // Check if two flipped cards match
    if (flippedCards.length === 2) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];
      checkMatch(firstCard, secondCard);
    }
  }
}

// Check if all cards are flipped
function checkWin() {
  const flippedCards = document.querySelectorAll('.flipped');
  if (flippedCards.length === cards.length) {
    // All cards are flipped
    setTimeout(() => {
      alert('Herzlichen Glückwunsch! Sie haben das Spiel gewonnen!');
    }, 500);
  }
}
function countClicks() {
  const resetButton = document.querySelector('#reset-button');
  const allElements = document.querySelectorAll('body *:not(#reset-button)');
  let clickCount = 0;

  allElements.forEach(element => {
    element.addEventListener('click', () => {
      clickCount++;
      const result = Math.floor(clickCount / 2); // Anzahl durch 2 teilen
      const footer = document.querySelector('footer');
      footer.innerHTML = `Anzahl Klicks: ${result}`;
    });
  });
}

