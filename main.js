

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const images = [
    'aranha',
    'caixao',
    'caldeirão',
    'caveira',
    'chapeu (1)',
    'fantasma',
    'lápide',
    'gato'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 16) {
    clearInterval(this.loop);
    alert(`Parabéns${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstImage = firstCard.getAttribute('data-image');
  const secondImage = secondCard.getAttribute('data-image');

  if (firstImage === secondImage) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {


      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (image) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../image/${image}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-image', image)

  return card;
}

const loadGame = () => {
  const duplicateImages = [ ...images, ...images ];

  const shuffledArray = duplicateImages.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((image) => {
    const card = createCard(image);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}