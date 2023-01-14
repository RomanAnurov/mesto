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
  popupAvatar,
  formAvatar,
  buttonOpenPopupEdit,
  buttonOpenPopupAvatar,
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

import { data } from "autoprefixer";

function openPopupEditUser() {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  popupEditUser.open();
  formValidatorEdit.resetValidation();
}

function openPopupAdd() {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
}

function openPopupAvatar() {
  popupEditAvatar.open();
  formValidatorAvatar.resetValidation();
}

buttonOpenPopupEdit.addEventListener("click", openPopupEditUser);
buttonOpenPopupAdd.addEventListener("click", openPopupAdd);
buttonOpenPopupAvatar.addEventListener("click", openPopupAvatar);

// Йдишник пользователя



function createCard(data) {
  const card = new Card(data, "#elements-template", userID, {
    handleCardClick: (link, name) => {
      popupWindowOpen.open(link, name);
    },
    handlePopupConfirm: () => {
      popupConfirm.open();

      popupConfirm.setSubmitDeleteCard(() => {
        api
          .deleteCardApi(data._id)
          .then(() => {
            card.removeCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLikeCounter: (likes) => {
      if (!likes) {
        api
          .getLikeApi(data._id)
          .then((data) => {
            card.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLikeApi(data._id)
          .then((data) => {
            card.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  const newCard = card.generateCard();
  return newCard;
}

const formValidatorEdit = new FormValidator(validConfig, formElementEdit);
const formValidatorAddCard = new FormValidator(validConfig, formAddCard);
const formValidatorAvatar = new FormValidator(validConfig, formAvatar);

formValidatorEdit.enableValidation();
formValidatorAddCard.enableValidation();
formValidatorAvatar.enableValidation();

// Экземпляр Класса открытия модального окна с большим фото

const popupWindowOpen = new PopupWithImage(".popup_type_image-open");
popupWindowOpen.setEventListeners();

//Экземпляр класса открытия попапа добавления карточки

const popupAddCard = new PopupWithForm(".popup_type_add-card", {
  submitCallBack: (data) => {
    popupAddCard.renderLoading(true);
    api
      .postNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  },
});

popupAddCard.setEventListeners();

// Экземпляр Класса с данными пользователя

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__sub-title",
  avatarSelector: ".profile__avatar",
});

//Редактирование данных пользователя

const popupEditUser = new PopupWithForm(".popup_type_edit-profile", {
  submitCallBack: (data) => {
    popupEditUser.renderLoading(true);
    api
      .editUserData(data)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        popupEditUser.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditUser.renderLoading(false);
      });
  },
});

popupEditUser.setEventListeners();

//Редактирования аватарки пользователя

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", {
  submitCallBack: (data) => {
    popupEditAvatar.renderLoading(true);
    api
      .updateAvatar(data)
      .then(() => {
        userInfo.setUserAvatar(data.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  },
});

popupEditAvatar.setEventListeners();

// Класс подтверждения

const popupConfirm = new PopupConfirm(".popup_type_confirm-delete");
popupConfirm.setEventListeners();

//Api сер

const API_OPTIONS = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "22bd7d89-efbc-47e6-b194-63dcf40cb6de",
    "Content-Type": "application/json",
  },
};

// Класс  Api

const api = new Api(API_OPTIONS);

//Получение данных пользователя

/*api
  .getInfo()
  .then((data) => {
    userID = data._id;

    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });  */

// Экземпляр класса Section создается для каждого контейнера, в который требуется отрисовывать элементы

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".elements"
);

//Загрузка карточек с сервера

/* api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log(err);
  });*/

  let userID;

  // Загрузка карточек и данных пользователя
  
Promise.all([api.getInfo(), api.getInitialCards()])

  .then(([{ name, about, avatar, _id }, data]) => {
    userID = _id;
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);

    cardList.renderItems(data.reverse());
  })

  .catch((err) => {
    console.log(err);
  });
  
