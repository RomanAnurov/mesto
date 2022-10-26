import {
  Card
} from "./Card.js";
import {
  FormValidator
} from "./FormValidator.js";

// константы

const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const buttonPopupOpenEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-profile");
/*const buttonPopupEditClose = popupEdit.querySelector(".popup__close");*/
const popups = document.querySelectorAll(".popup");

//редактирование формы//

// Находим форму редактирования данных пользователяв DOM

const formElementEdit = popupEdit.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector(".popup__input_type_user-name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEdit.querySelector(".popup__input_type_user-about"); // Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__sub-title");

// второй ПопАп //

const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add-card");
/*const buttonClosePopupAdd = popupAdd.querySelector(".popup__close");*/

//Дом элементы

const elementsContainer = document.querySelector(".elements");
const formAddCard = popupAdd.querySelector(".popup__form");
const nameCardInput = formAddCard.querySelector(".popup__input_type_card-name");
const urlCardInput = formAddCard.querySelector(".popup__input_type_card-url");

const captionImagePopup = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// селект попапа с модальным окном картинки

const popupImageWindow = document.querySelector(".popup_type_image-open");
/*const buttonPopupImageClose = popupImageWindow.querySelector(".popup__close");*/

const validConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save", //кнопка сохранить внутри попапа
  inactiveButtonClass: "popup__save_inactive", //деактивация кнопки сохранить внутри попапа
  inputErrorClass: "popup__input_type_error", // инпут с  ошибкой
  errorClass: "popup__input-error_active", // браузерный текст ошибки
};


 

//функция открытия попапов

function openPopup(popup) {
  popup.classList.add("popup_type_opened");
  document.addEventListener("keydown", closeByEscape);
  
  
}
// Функция закрытия попапов

function closePopup(popup) {
  popup.classList.remove("popup_type_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Закрытие Попапа нажатием на  Esc

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_type_opened");
    closePopup(popup);
  }
};

//Закрытие попапа кликом на оверлей

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_type_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})



function handlerSubmitForm(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  return closePopup(popupEdit);
}

buttonPopupOpenEdit.addEventListener("click", () => openPopup(popupEdit));
/*buttonPopupEditClose.addEventListener("click", () => closePopup(popupEdit));*/

// Вызовем функцию проверки валидации

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElementEdit.addEventListener("submit", handlerSubmitForm);

buttonOpenPopupAdd.addEventListener("click", () => openPopup(popupAdd));
/*buttonClosePopupAdd.addEventListener("click", () => closePopup(popupAdd));*/

// Функция добавления новой карточки через форму в DOM

const handlerSubmitAddElementsForm = (evt) => {
  evt.preventDefault();
  const addCard = {
    name: nameCardInput.value,
    link: urlCardInput.value,
  };
  const card = createCard(addCard)
  elementsContainer.prepend(card)
  closePopup(popupAdd);
  formAddCard.reset();

};

// функция создаёт карточку

function createCard(item) {
  const card = new Card(item, "#elements-template", handlerOpenPopupImage);
  const elementsCardTemplate = card.generateCard();
  return elementsCardTemplate
}


// открытие фотки в модальном окне

function handlerOpenPopupImage(name, link) {
  popupImage.src = link;
  captionImagePopup.textContent = name;
  popupImage.alt = name;

  return openPopup(popupImageWindow);
}

formAddCard.addEventListener("submit", handlerSubmitAddElementsForm);

// рендер

initialCards.forEach((item) => {
  elementsContainer.append(createCard(item));
});

const formValidatorEdit = new FormValidator(validConfig, formElementEdit);
const formValidatorAddCard = new FormValidator(validConfig, formAddCard);
formValidatorEdit.enableValidation();
formValidatorAddCard.enableValidation();
