const openPopupButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const closePopupButton = popupEdit.querySelector('.popup__close');

function popupOpenToggle() {
  popupEdit.classList.toggle('popup_type_opened');
  
}


openPopupButton.addEventListener('click', popupOpenToggle);

closePopupButton.addEventListener('click', popupOpenToggle);


//редактирование формы//

// Находим форму в DOM
const formElement = popupEdit.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_user-name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_user-about'); // Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__sub-title');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.


  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;

  return popupOpenToggle()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// второй ПопАп //

const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');
const closePopupAddButton = popupAdd.querySelector('.popup__close');

function popupAddOpenToggle() {
  popupAdd.classList.toggle('popup_type_opened');
}

openPopupAddButton.addEventListener('click', popupAddOpenToggle);
closePopupAddButton.addEventListener('click', popupAddOpenToggle);

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Дом элементы//

const elementsContainer = document.querySelector('.elements');
const formAddCard = popupAdd.querySelector('.popup__form');
const nameCardInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlCardInput = formAddCard.querySelector('.popup__input_type_card-url');

// Обработчики событий//

const handleSubmitAddElementsForm = (evt) => {
  evt.preventDefault();
  renderElementsList ({name: nameCardInput.value, link: urlCardInput.value});
  nameCardInput.value = 'Название';
  urlCardInput.value = 'Ссылка на картинку';
   return popupAddOpenToggle();


}

formAddCard.addEventListener('submit', handleSubmitAddElementsForm);

//рендер карточки//

const renderElementsList = (elementsData) => {
  elementsContainer.insertAdjacentHTML('afterbegin',
    `<div class="elements__item">
  <img class="elements__foto" src=${elementsData.link} alt=${elementsData.name}>
  <div class="elements__info">
    <h2 class="elements__caption">${elementsData.name}</h2>
    <button class="elements__icon" type="button"></button>
  </div>
</div>`
  );
}

initialCards.forEach((elementsData) => {
  renderElementsList(elementsData);
})






