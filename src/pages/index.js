import "./index.css";

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
    submitCallBack: () => {
      const addCard = {
        name: nameCardInput.value,
        link: urlCardInput.value,
      };
      cardList.addItem(createCard(addCard));
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
