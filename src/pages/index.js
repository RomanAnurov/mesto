import "./index.css";

import Api from "../components/Api.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  buttonPopupOpenEdit,
  formElementEdit,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  buttonOpenPopupAdd,
  elementsContainer,
  formAddCard,
  nameCardInput,
  urlCardInput,
  validConfig,
} from "../utils/constants.js";
import { data } from "autoprefixer";

function openPopupEditUser() {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditUser.open();
  formValidatorEdit.resetValidation();
}

buttonPopupOpenEdit.addEventListener("click", openPopupEditUser);
buttonOpenPopupAdd.addEventListener("click", function () {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
});

// функция создаёт карточку

function createCard(data) {
  const card = new Card(data, "#elements-template", {
    handleCardClick: (link, name) => {
      popupWindowOpen.open(link, name);
    },
  });
  const newCard = card.generateCard();
  return newCard;
}

// класс создаёт набор из 6 карточек и вставляет в DOM

const cardList = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".elements"
);

cardList.renderItems();

const formValidatorEdit = new FormValidator(validConfig, formElementEdit);
const formValidatorAddCard = new FormValidator(validConfig, formAddCard);
formValidatorEdit.enableValidation();
formValidatorAddCard.enableValidation();

// Экземпляр Класса открытия модального окна с большим фото

const popupWindowOpen = new PopupWithImage(".popup_type_image-open");
popupWindowOpen.setEventListeners();

//Экземпляр класса открытия попапа добавления карточки

const popupAddCard = new PopupWithForm(
  {
    submitCallBack: (data) => {
      const cardData = {
        name: data["card-name"],
        link: data["card-url"],
      };
      cardList.addItem(createCard(cardData));
      popupAddCard.close();
    },
  },
  ".popup_type_add-card"
);

popupAddCard.setEventListeners();

// Экземпляр Класса для редактирования данных пользователя

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__sub-title",
});

const popupEditUser = new PopupWithForm(
  {
    submitCallBack: (data) => {
      userInfo.setUserInfo(data["user-name"], data["user-about"]);
      popupEditUser.close();
    },
  },
  ".popup_type_edit-profile"
);

popupEditUser.setEventListeners();

const API_OPTIONS = {baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
headers: {
  authorization: '22bd7d89-efbc-47e6-b194-63dcf40cb6de',
  'Content-Type': 'application/json'}
}
const api = new Api(API_OPTIONS);



