// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds');

let countdownInterval;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDateSelected,
  });

function onDateSelected(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < new Date()) {
    Notiflix.Notify.failure('Please choose a future time');
    buttonStart.disabled = true;
  } else {
    Notiflix.Notify.success('Timer is started');
    buttonStart.disabled = false;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const now = new Date();
  const targetDate = new Date(document.querySelector('#datetime-picker').value);
  const difference = targetDate - now;
  if (difference <= 0) {
    clearInterval(countdownInterval);
    buttonStart.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);

  fieldDays.textContent = addLeadingZero(days);
  fieldHours.textContent = addLeadingZero(hours);
  fieldMinutes.textContent = addLeadingZero(minutes);
  fieldSeconds.textContent = addLeadingZero(seconds);
}

function startTimer() {
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

buttonStart.addEventListener('click', startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

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
