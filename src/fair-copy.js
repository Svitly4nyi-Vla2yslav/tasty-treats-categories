// Імпортуємо бібліотеки
import axios from 'axios';       // Бібліотека для HTTP-запитів
import Notiflix from 'notiflix'; // Бібліотека для сповіщень

// Отримуємо посилання на елементи DOM
const categoriesList = document.querySelector('.categories-list');
const allCategoriesButton = document.getElementById('all-categories-button');

// Визначаємо базову URL для запитів
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

// Асинхронна функція для отримання списку категорій
async function getCategories() {
  try {
    const response = await axios.get(BASE_URL); // Виконуємо GET-запит
    const markUp = createMarkUp(response.data); // Створюємо розмітку на основі отриманих даних

    // Оновлюємо список категорій на сторінці
    if (categoriesList) {
      categoriesList.innerHTML = markUp;

      // Додаємо обробник подій для категорій
      addClickListenersToCategories();

      // Встановлюємо клас активної категорії для кнопки "Всі категорії"
      allCategoriesButton.classList.add('active-category');
    }
  } catch (error) {
    // У разі помилки виводимо сповіщення
    Notiflix.Notify.failure(
      'An error occurred while loading the data. Please try again later.'
    );
  }
}

// Додає обробник подій для категорій
function addClickListenersToCategories() {
  if (categoriesList) {
    const categoryItems = categoriesList.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      // Обробник події при кліку на категорію
      item.addEventListener('click', () => {
        const category = item.dataset.category;

        // Знімаємо класи активності з усіх категорій
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        // Встановлюємо клас активної категорії для поточної категорії
        item.classList.add('active');

        // Знімаємо клас активної категорії з кнопки "Всі категорії"
        if (allCategoriesButton) {
          allCategoriesButton.classList.remove('active-category');
        }
      });
    });

    // Обробник події при кліку на кнопку "Всі категорії"
    if (allCategoriesButton) {
      allCategoriesButton.addEventListener('click', () => {
        // Знімаємо класи активності з усіх категорій
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        // Встановлюємо клас активної категорії для кнопки "Всі категорії"
        allCategoriesButton.classList.add('active-category');
      });
    }
  }
}

// Створює розмітку для кожної категорії
function createMarkUp(data) {
  return data
    .map(
      ({ name }) => `<li class="category-item" data-category="${name}">
              <p class="category-name">${name}</p>
            </li>`
    )
    .join('');
}

// Знімає клас активної категорії з кнопки "Всі категорії"
function resetAllCategoriesButton() {
  if (allCategoriesButton) {
    allCategoriesButton.classList.remove('active-category');
  }
}

// Обробники подій для категорій, які не є кнопкою "Всі категорії"
const otherFilters = document.querySelectorAll(
  '.category-item:not(#all-categories-button)'
);

otherFilters.forEach(filter => {
  // Обробник події при кліку на категорію (знімає клас активної категорії з усіх інших)
  filter.addEventListener('click', () => {
    resetAllCategoriesButton();
    otherFilters.forEach(categoryItem => {
      categoryItem.classList.remove('active');
    });
    filter.classList.add('active');
  });

  // Обробник події при кліку на категорію (встановлює клас активної категорії)
  filter.addEventListener('click', () => {
    filter.classList.add('active-category');
  });
});

// Обробники подій для кнопки "Всі категорії" при наведенні і відведенні миші
if (allCategoriesButton) {
  allCategoriesButton.addEventListener('mouseover', () => {
    allCategoriesButton.classList.add('active-category');
  });

  allCategoriesButton.addEventListener('mouseout', () => {
    if (!allCategoriesButton.classList.contains('active-category')) {
      allCategoriesButton.classList.remove('active-category');
    }
  });
}

// Отримуємо список категорій при завантаженні сторінки
getCategories();
