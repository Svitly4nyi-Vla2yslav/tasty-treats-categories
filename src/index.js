import axios from 'axios';


const categoriesList = document.querySelector('.categories-list');
const allCategoriesButton = document.getElementById('all-categories-button');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

export async function getCategories() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data);
    if (categoriesList) {
      categoriesList.innerHTML = markUp;

      addClickListenersToCategories();

      allCategoriesButton.classList.add('active-category'); // Додаємо клас active-category для кнопки "All categories" при завантаженні сторінки
    }
  } catch (error) {
    console.error(error);
  }
  getAllRecipes(); // Відображаємо всі рецепти після того, як вже відобразили всі категорії
}

function addClickListenersToCategories() {
  if (categoriesList) {
    const categoryItems = categoriesList.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.dataset.category;
        getRecipesByCategory(category);

        // Знімаємо активний клас з усіх категорій
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        // Додаємо активний клас до обраної категорії
        item.classList.add('active');

        // Знімаємо активний клас з кнопки "All categories"
        if (allCategoriesButton) {
          allCategoriesButton.classList.remove('active-category');
        }
      });
      item.addEventListener('click', backToFirst);
    });

    // Додаємо обробник події для кнопки "All categories"
    if (allCategoriesButton) {
      allCategoriesButton.addEventListener('click', () => {
        // Знімаємо активний клас з усіх категорій
        categoryItems.forEach(categoryItem => {
          categoryItem.classList.remove('active');
          categoryItem.classList.remove('active-category');
        });

        // Додаємо активний клас до кнопки "All categories"
        allCategoriesButton.classList.add('active-category');

        getAllRecipes(); // Відображаємо всі рецепти, коли натискаємо на "All categories"
      });
      allCategoriesButton.addEventListener('click', backToFirst);
    }
  }
}

function createMarkUp(data) {
  return data
    .map(
      ({ name }) => `<li class="category-item" data-category="${name}">
              <p class="category-name">${name}</p>
            </li>`
    )
    .join('');
}

// Функція, яка відміняє активність кнопки "All categories"
function resetAllCategoriesButton() {
  if (allCategoriesButton) {
    allCategoriesButton.classList.remove('active-category');
  }
}

// Отримуємо посилання на всі фільтри окрім "All categories"
const otherFilters = document.querySelectorAll(
  '.category-item:not(#all-categories-button)'
);

// Обробник події для інших фільтрів
otherFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    resetAllCategoriesButton();

    // Знімаємо активний клас з усіх категорій
    otherFilters.forEach(categoryItem => {
      categoryItem.classList.remove('active');
    });

    // Додаємо активний клас до обраної категорії
    filter.classList.add('active');

    const category = filter.dataset.category;
    getRecipesByCategory(category);
  });

  // Додаємо обробник події для активного стану при натисканні на категорію
  filter.addEventListener('click', () => {
    filter.classList.add('active-category');
  });
});

// Отримуємо посилання на кнопку "All categories" і додаємо обробник події для активного стану при ховері
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

getCategories();
if (allCategoriesButton) {
  allCategoriesButton.addEventListener('click', backToFirst);
}

// import Notiflix from 'notiflix';

// const elements = {
//   categoryList: document.querySelector('.category-list'),
//   categoryContainer: document.querySelector('.category-container'),
//   allFilterButton: document.querySelector('.filter-button'),
// };
// elements.categoryContainer.addEventListener('click', handleFilterButtonClick);
// let lastClickedButton = null;

// async function fetchRecipeCategories() {
//   try {
//     const response = await fetch(
//       'https://tasty-treats-backend.p.goit.global/api/categories'
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     Notiflix.Notify.failure('Qui timide rogat docet negare');
//   }
// }

// async function renderRecipeCategories() {
//   const categories = await fetchRecipeCategories();
//   const categoryButtons = categories.map(category => {
//     const button = document.createElement('button');
//     button.classList.add('category-button');
//     button.textContent = category;
//     return button;
//   });
//   elements.categoryList.innerHTML = '';
//   categoryButtons.forEach(button => {
//     elements.categoryList.appendChild(button);
//   });
// }

// function handleFilterButtonClick(evt) {
//   const button = evt.target;
//   if (button.nodeName !== 'BUTTON') {
//     return;
//   }

//   if (lastClickedButton) {
//     lastClickedButton.classList.remove('active');
//   }
//   if (button === elements.allFilterButton) {
//     removeAllActiveClasses();
//   } else {
//     elements.allFilterButton.classList.remove('active');
//   }
//   button.classList.add('active');
//   lastClickedButton = button;
// }

// function removeAllActiveClasses() {
//   const buttons = elements.categoryList.querySelectorAll('button');
//   buttons.forEach(button => {
//     button.classList.remove('active');
//   });
// }

// elements.categoryList.addEventListener('click', evt => {
//   if (!evt.target.classList.contains('category-button')) {
//     evt.stopPropagation();
//   }
// });
// renderRecipeCategories();
