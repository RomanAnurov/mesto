export const initialCards = [
  {
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

export const buttonPopupOpenEdit = document.querySelector(
  ".profile__edit-button"
);
const popupEdit = document.querySelector(".popup_type_edit-profile");

export const formElementEdit = popupEdit.querySelector(".popup__form");
// Находим поля формы в DOM
export const nameInput = formElementEdit.querySelector(
  ".popup__input_type_user-name"
);
export const jobInput = formElementEdit.querySelector(
  ".popup__input_type_user-about"
);

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__sub-title");

// второй ПопАп //

export const buttonOpenPopupAdd = document.querySelector(
  ".profile__add-button"
);
const popupAdd = document.querySelector(".popup_type_add-card");

//Дом элементы

export const elementsContainer = document.querySelector(".elements");
export const formAddCard = popupAdd.querySelector(".popup__form");
export const nameCardInput = formAddCard.querySelector(
  ".popup__input_type_card-name"
);
export const urlCardInput = formAddCard.querySelector(
  ".popup__input_type_card-url"
);

export const validConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save", //кнопка сохранить внутри попапа
  inactiveButtonClass: "popup__save_inactive", //деактивация кнопки сохранить внутри попапа
  inputErrorClass: "popup__input_type_error", // инпут с  ошибкой
  errorClass: "popup__input-error_active", // браузерный текст ошибки
};