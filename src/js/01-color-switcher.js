function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let intervalId;

function colorSwitcherStart() {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);

  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function colorSwitcherStop() {
  clearInterval(intervalId);

  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

buttonStart.addEventListener('click', colorSwitcherStart);

buttonStop.addEventListener('click', colorSwitcherStop);
