import { GAME_STATUS, PAIRS_COUNT, GAME_TIME } from './constants.js';
import {
  getRandomColorPairs,
  hideReplayBtn,
  setTimmerText,
  showReplayBtn,
  shuffle,
  handleCountDown,
} from './utils.js';
import {
  getBtnReplayElement,
  getColorBackground,
  getColorElementList,
  getInActiveLiElement,
  getOverlayElement,
  getTimerElement,
  getUlColorElement,
} from './selectors.js';

// Global variables
let selectedLiElementList = [];
let gameStatus = GAME_STATUS.PLAYING;
let timmoutId, intervalId;
// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function initColors() {
  // random
  const colorList = getRandomColorPairs(PAIRS_COUNT);
  shuffle(colorList);

  // bind background-color to li > div.overlay
  const liList = getColorElementList();
  if (!liList || liList.length === 0) return;
  liList.forEach((liElement, index) => {
    if (liElement) {
      liElement.dataset.color = colorList[index];

      const overlayElement = getOverlayElement(liElement);
      overlayElement.style.backgroundColor = colorList[index];
    }
  });
}

function attachEventForUlColorElement() {
  const ulElement = getUlColorElement();
  if (!ulElement) throw new Error('Invalid Ul Element');

  ulElement.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    handleLiElementClick(e.target);
  });
}

function handleLiElementClick(liElement) {
  const isCannotClick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus);
  const isClicked = liElement.classList.contains('active');
  if (isCannotClick || isClicked) return;
  if (!liElement) return;
  liElement.classList.add('active');
  selectedLiElementList.push(liElement);
  // Have a pair to compared each other
  if (selectedLiElementList.length !== 2) {
    return;
  }

  // Check match
  const first = selectedLiElementList[0].dataset.color;
  const second = selectedLiElementList[1].dataset.color;
  const isMatch = first === second;
  // If match
  if (isMatch) {
    //   Change background-color
    const backgroundElement = getColorBackground();
    if (backgroundElement) {
      backgroundElement.style.backgroundColor = liElement.dataset.color;
    }

    // Check win
    const isWin = getInActiveLiElement().length === 0;
    if (isWin) {
      showReplayBtn();
      setTimmerText('YOU WIN!');
      gameStatus = GAME_STATUS.FINISHED;
      clearTimeout(timmoutId);
      clearInterval(intervalId);
    }

    selectedLiElementList = [];
    return;
  }

  // If not match
  gameStatus = GAME_STATUS.BLOCKING;
  setTimeout(() => {
    selectedLiElementList.forEach((liElement) => {
      liElement.classList.remove('active');
    });
    selectedLiElementList = [];
    gameStatus = GAME_STATUS.PLAYING;
  }, 500);
}

function handleReplayBtnClick() {
  hideReplayBtn();
  resetGame();
}

function attachEventForbtnReplay() {
  const btnReplayElement = getBtnReplayElement();
  if (!btnReplayElement) return;
  btnReplayElement.addEventListener('click', () => {
    handleReplayBtnClick();
  });
}

function resetGame() {
  // reset global vars
  gameStatus = GAME_STATUS.PLAYING;
  selectedLiElementList = [];

  // Reset DOM
  const liElementList = getColorElementList();
  for (const liElement of liElementList) {
    liElement.classList.remove('active');
  }
  setTimmerText('');

  // generate new color list
  initColors();
  setTime();
}

function setTime() {
  let remainingTime = GAME_TIME;
  intervalId = setInterval(() => {
    remainingTime -= 1;
    handleCountDown(remainingTime);
  }, 1000);

  timmoutId = setTimeout(() => {
    clearInterval(intervalId);
    gameStatus = GAME_STATUS.FINISHED;
    setTimmerText('YOU LOSE!');
    showReplayBtn();
  }, GAME_TIME * 1000);
}

// main
(() => {
  initColors();

  // attach event to Ul Element
  attachEventForUlColorElement();

  // attach event to Btn replay
  attachEventForbtnReplay();

  // attch timmer
  setTime();
})();
