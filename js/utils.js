import { getBtnReplayElement, getTimerElement } from './selectors.js';

export function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length <= 2) return arr;

  // Loop n -> 0 because Random Index has never greater than last position
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.trunc(Math.random() * i);
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr;
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const colorList = [];

  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome'];

  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length],
    });
    colorList.push(color);
  }

  return [...colorList, ...colorList];
};

export function showReplayBtn() {
  const btnReplayElement = getBtnReplayElement();
  if (!btnReplayElement) return;
  btnReplayElement.classList.add('show');
}

export function hideReplayBtn() {
  const btnReplayElement = getBtnReplayElement();
  if (!btnReplayElement) return;
  btnReplayElement.classList.remove('show');
}

export function setTimmerText(text) {
  const timmerElement = getTimerElement();
  if (!timmerElement) return;
  timmerElement.textContent = text;
}

export function handleCountDown(remainingTime) {
  const time = remainingTime.toString().padStart(2, 0);
  setTimmerText(`Remaining time: ${time}`);
}
