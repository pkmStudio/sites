//Начинаем писать код на JQuery
// $(document).ready(function () {
// });

// Код на JS

// Подгружаем статьи
const articles = []; // Создаем массив подгружаемых статей
const button = document.querySelector(".articles__button");
const articlesBox = document.querySelector(".articles-box");
const article = {
	foto: "src/img/index.jpg",
	title: "Card Title",
	intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint perspiciatis deleniti ab possimus ut? Ducimus fugiat hic velit necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus sapiente harum soluta excepturi ut temporibus, at amet corporis id asperiores.",
}; // Собственно статья, которую будем якобы подгружать.
const loadArticles = () => {
	while (i < addCount) {
		articlesBox.insertAdjacentHTML(
			"beforeend",

         `<article class="card">
               <div class="card__header">
                  <img class="card__img" src="${articles[i].foto}">
               </div>
               <div class="card__body">
                  <h3 class="card__title">${articles[i].title}</h3>
                  <p class="card__copy">${articles[i].intro}</p>
               </div>
               <a class="card__link button" href="#">Читать дальше!!!</a>
            </article>`
		);
		i++;
	};
   // Удаляем из массива добавленные статьи на страницу.
	articles.splice(0, i);
	i = 0;
	//Скрывааем кнопку если количество подгруженных статей в массиве меньше добавляемых
	if (articles.length < addCount) {
		button.classList.add("d-none");
	}
}; // Функция которая добавляет статьи на страницу
let addCount = 4; // Количество статей, которое будем подгружать за раз.
let i = 0;

// Заполняем массив из 8 статей, эмулируем подгрузку.
while (articles.length < addCount * 2) {
	articles.push(article);
}

button.addEventListener("click", loadArticles);

// Делаем модальное окно поиска и всплывающее меню бургер
const searchInput = document.querySelector(".search-form__item");
const searchContainer = document.querySelector(".search-form");
const closeButton = document.querySelector(".search-form__button");
const modal = () => {
	searchContainer.classList.toggle("search-form--modal");
	//Блокирует прокрутку окна
	body.classList.toggle("lock");
}; // Функция, которая добавляет/убирает классы для модального окна

// Это переменные для меню
const mainNav = document.querySelector(".main-nav");
const headerBurger = document.querySelector(".header__burger");
const body = document.querySelector("body");
const burger = () => {
	mainNav.classList.toggle("active");
	headerBurger.classList.toggle("active");
	searchContainer.classList.remove("search-form--modal");
	body.classList.remove("lock");
}; // функция, которая добавляет/убирает классы для меню Бургер и очищает классы поисковой формы.


// При фокусе на окно поиска
searchInput.addEventListener("focus", modal);
// При нажатии на кнопку закрытия
closeButton.addEventListener("click", modal);
// При нажатии на кнопку меню бургер
headerBurger.addEventListener("click", burger);
