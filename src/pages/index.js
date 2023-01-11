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

buttonOpenPopupEdit.addEventListener("click", openPopupEditUser);
buttonOpenPopupAdd.addEventListener("click", function () {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
});
buttonOpenPopupAvatar.addEventListener("click", function () {
  popupEditAvatar.open();
  formValidatorAvatar.resetValidation();
} );

// Создаём класс Аватарки



// Йдишник пользователя

let userID;



function createCard(data) {
  const card = new Card(data, "#elements-template", userID, {
    handleCardClick: (link, name) => {
      popupWindowOpen.open(link, name);
    },
    handlePopupConfirm: () => {
      popupConfirm.open();
      popupConfirm.setSubmitDeleteCard(() => {
        api.deleteCardApi(data._id).then(() => {
          popupConfirm.close();
          card.removeCard();
        });
      });
    },
    handleLikeCounter: (likes) => {
      if (!likes) {
        api.getLikeApi(data._id).then((data) => {
          card.handleLikeCard(data);
        }).catch(err => {
          console.log(err);
        })
      } else {
        api.deleteLikeApi(data._id).then((data) => {
          card.handleLikeCard(data);
        }).catch(err => {
          console.log(err);
        })

      }

    }
  });
  const newCard = card.generateCard();
  return newCard;
};

// класс запрашивает карточки с сервера и вставляет в DOM

const formValidatorEdit = new FormValidator(validConfig, formElementEdit);
const formValidatorAddCard = new FormValidator(validConfig, formAddCard);
const  formValidatorAvatar = new FormValidator(validConfig, formAvatar);
formValidatorEdit.enableValidation();
formValidatorAddCard.enableValidation();
formValidatorAvatar.enableValidation();

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
  avatarSelector: ".profile__avatar"
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

const popupEditAvatar = new PopupWithForm({submitCallBack:(data) => {
  api.updateAvatar(data).then(()=> {
    userInfo.setUserAvatar(data.avatar);
    popupEditAvatar.close();
  })
 
}}, ".popup_type_edit-avatar");

popupEditAvatar.setEventListeners();

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

//Получение данных пользователя

api.getInfo().then((data) => {
  userID = data._id;

  userInfo.setUserInfo(data.name, data.about);
  userInfo.setUserAvatar(data.avatar);
});

//Создание массива карточек с сервера

const renderer = (data) => {
  cardList.addItem(createCard(data));
};

api.getInitialCards().then((data) => {
  const cardList = new Section({
      data,
      renderer,
    },
    ".elements"
  );

  cardList.renderItems(data.reverse());
});

