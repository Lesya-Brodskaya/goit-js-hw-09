const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let intervalId = null;
let isActive = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disableButton() {
  refs.startBtn.disabled = isActive;
  refs.stopBtn.disabled = !isActive;
}

refs.startBtn.addEventListener('click', () => {
  isActive = true;
  disableButton();
  intervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  isActive = !true;
  disableButton();
  clearInterval(intervalId);
});
