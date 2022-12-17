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

function handlerSubmitForm() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupEditUser.close();
}

// Функция сохраняет данные пользователя

function saveProfile() {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditUser.open();
  formValidatorEdit.resetValidation();
}

// Функция добавления новой карточки через форму в DOM

const handlerSubmitAddElementsForm = () => {
  const addCard = {
    name: nameCardInput.value,
    link: urlCardInput.value,
  };
  const card = createCard(addCard);
  elementsContainer.prepend(card);
  popupAddCard.close();
  formAddCard.reset();
};

buttonPopupOpenEdit.addEventListener("click", saveProfile);

buttonOpenPopupAdd.addEventListener("click", function () {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
});

formElementEdit.addEventListener("submit", handlerSubmitForm);
formAddCard.addEventListener("submit", handlerSubmitAddElementsForm);

// функция создаёт карточку

function createCard(data) {
  const card = new Card(data, "#elements-template", {
    handleCardClick: (link, name) => {
      popupWindowOpen.open(link, name);
    },
  });
  const elementsCardTemplate = card.generateCard();
  return elementsCardTemplate;
}

// класс создаёт набор из 6 карточек и вставляет в DOM

const cardList = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#elements-template", {
        handleCardClick: (link, name) => {
          popupWindowOpen.open(link, name);
        },
      });
      const elementsCardTemplate = card.generateCard();

      cardList.addItem(elementsCardTemplate);
    },
  },
  elementsContainer
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
      popupAddCard.addtem(elementsCardTemplate);
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
      userInfo.setUserInfo(data);
    },
  },
  ".popup_type_edit-profile"
);

popupEditUser.setEventListeners();
