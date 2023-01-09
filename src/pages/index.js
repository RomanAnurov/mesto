import "./index.css";

import Api from "../components/Api.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";
import {
  buttonPopupOpenEdit,
  formElementEdit,
  nameInput,
  aboutInput,
  profileTitle,
  profileSubtitle,
  buttonOpenPopupAdd,
  elementsContainer,
  formAddCard,
  nameCardInput,
  urlCardInput,
  validConfig,
} from "../utils/constants.js";

import {
  data
} from "autoprefixer";


function openPopupEditUser() {
  const {
    name,
    about
  } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  popupEditUser.open();
  formValidatorEdit.resetValidation();
}

buttonPopupOpenEdit.addEventListener("click", openPopupEditUser);
buttonOpenPopupAdd.addEventListener("click", function () {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
});

// функция открытия попапа картинки

const handleCardClick = (link, name) => {
  popupWindowOpen.open(link, name);
};


const createCard = (data)  => {
  const card = new Card(data, "#elements-template", { handleCardClick, handlePopupConfirm: () => {
    popupConfirm.open();
    popupConfirm.setSubmitDeleteCard(() => {
      card.removeCard();
      popupConfirm.close();
    })
  } });
  const newCard = card.generateCard();
  return newCard;
}

// класс создаёт набор из 6 карточек и вставляет в DOM

const formValidatorEdit = new FormValidator(validConfig, formElementEdit);
const formValidatorAddCard = new FormValidator(validConfig, formAddCard);
formValidatorEdit.enableValidation();
formValidatorAddCard.enableValidation();

// Экземпляр Класса открытия модального окна с большим фото

const popupWindowOpen = new PopupWithImage(".popup_type_image-open");
popupWindowOpen.setEventListeners();

//Экземпляр класса открытия попапа добавления карточки

const popupAddCard = new PopupWithForm({
    submitCallBack: (data) => {
      api.postNewCard(data).then((data) => {

        cardList.addItem(createCard(data));
      });

      popupAddCard.close();
    },
  },
  ".popup_type_add-card"
);

popupAddCard.setEventListeners();

// Экземпляр Класса для редактирования данных пользователя

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__sub-title",
});

//Редактирование данных пользователя

const popupEditUser = new PopupWithForm({
    submitCallBack: (data) => {
      api.editUserData(data).then((data) => {
        userInfo.setUserInfo(data.name, data.about);
      });
      popupEditUser.close();
    },
  },
  ".popup_type_edit-profile"
);

popupEditUser.setEventListeners();



const popupConfirm = new PopupConfirm(".popup_type_confirm-delete");
popupConfirm.setEventListeners();

const API_OPTIONS = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "22bd7d89-efbc-47e6-b194-63dcf40cb6de",
    "Content-Type": "application/json",
  },
};

// Класс  Api

const api = new Api(API_OPTIONS);

const cardList = new Section({
    data,
    renderer,
  },
  ".elements"
);

const renderer = (data) => {
  cardList.addItem(createCard(data));
};

//Получение данных пользователя

api.getInfo().then((data) => {
  userInfo.setUserInfo(data.name, data.about);
});

//Создание массива карточек с сервера

api.getInitialCards().then((data) => {
  const cardList = new Section({
      data,
      renderer,
    },
    ".elements"
  );

  cardList.renderItems(data.reverse());
});
