import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Проміс ${position} виконаний через ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Проміс ${position} відхилено через ${delay}ms`
        );
      });
  }
}

form.addEventListener('submit', handleSubmit);
