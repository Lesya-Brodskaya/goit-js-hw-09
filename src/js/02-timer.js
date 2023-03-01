import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
      btnEl.disabled = true;
      return;
    }
    btnEl.disabled = false;
    selectedDate = selectedDates[0];
  },
};

btnEl.addEventListener('click', start);

function start() {
  const btnClick = setInterval(() => {
    const ms = selectedDate.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(btnClick);
      return;
    }
    const time = convertMs(ms);
    addLeadingZero(time);
  }, 1000);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  daysEl.innerHTML = padStart(days);
  hoursEl.innerHTML = padStart(hours);
  minutesEl.innerHTML = padStart(minutes);
  secondsEl.innerHTML = padStart(seconds);
}

function padStart(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if (!ms) return;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('input#datetime-picker', options);
