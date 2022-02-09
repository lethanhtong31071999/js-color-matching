export function getColorElementList() {
  return document.querySelectorAll('#colorList > li');
}

export function getTimerElement() {
  return document.querySelector('.game .game__timer');
}

export function getPlayAgainButton() {
  return document.querySelector('.game .game__button');
}

export function getColorBackground() {
  return document.querySelector('.color-background');
}

export function getUlColorElement() {
  return document.getElementById('colorList');
}

export function getOverlayElement(liElement) {
  if (!liElement) return;
  return liElement.querySelector('.overlay');
}

export function getInActiveLiElement() {
  return document.querySelectorAll('#colorList > li:not(.active)');
}

export function getBtnReplayElement() {
  return document.querySelector('.game__button');
}
