const buttonPopupOpenEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const buttonPopupEditClose = popupEdit.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");

//редактирование формы//

// Находим форму редактирования данных пользователяв DOM

const formElementEdit = popupEdit.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector(".popup__input_type_user-name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEdit.querySelector(".popup__input_type_user-about"); // Воспользуйтесь инструментом .querySelector()


const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__sub-title");

// второй ПопАп //

const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add-card");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close");

//Дом элементы

const elementsContainer = document.querySelector(".elements");
const formAddCard = popupAdd.querySelector(".popup__form");
const nameCardInput = formAddCard.querySelector(".popup__input_type_card-name");
const urlCardInput = formAddCard.querySelector(".popup__input_type_card-url");

const captionImagePopup = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// селект попапа с модальным окном картинки

const popupImageWindow = document.querySelector(".popup_type_image-open");
const buttonPopupImageClose = popupImageWindow.querySelector(".popup__close");

//функция открытия попапов

function openPopup(popup) {
  popup.classList.add("popup_type_opened");
  document.addEventListener("keydown", popupCloseEsc);
}
// Функция закрытия попапов

function closePopup(popup) {
  popup.classList.remove("popup_type_opened");
  document.removeEventListener("keydown", popupCloseEsc);
}

// Закрытие Попапа нажатием на  Esc

const popupCloseEsc = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_type_opened");
    closePopup(popup);
  }
};

//Закрытие попапа кликом на оверлей

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

//Функция блокировки кнопки по умолчанию

function blockButtonDefoult() {
  const buttonSaveAddCard = formAddCard.querySelector(".popup__save");
  buttonSaveAddCard.classList.add("popup__save_inactive");
  buttonSaveAddCard.setAttribute("disabled", "disabled");
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handlerSubmitForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  return closePopup(popupEdit);
}

buttonPopupOpenEdit.addEventListener("click", () => openPopup(popupEdit));

buttonPopupEditClose.addEventListener("click", () => closePopup(popupEdit));

// Вызовем функцию проверки валидации

enableValidation({
    formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save", //кнопка сохранить внутри попапа
  inactiveButtonClass: "popup__save_inactive", //деактивация кнопки сохранить внутри попапа
  inputErrorClass: "popup__input_type_error", // инпут с  ошибкой
  errorClass: "popup__input-error_active", // браузерный текст ошибки
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElementEdit.addEventListener("submit", handlerSubmitForm);

buttonOpenPopupAdd.addEventListener("click", () => openPopup(popupAdd));
buttonClosePopupAdd.addEventListener("click", () => closePopup(popupAdd));

// Шаблоны
const elementsCardTemplate = document
  .querySelector("#elements-template")
  .content.querySelector(".elements__item");

// Обработчики событий

const handlerSubmitAddElementsForm = (evt) => {
  evt.preventDefault();
  renderElementsList({
    name: nameCardInput.value,
    link: urlCardInput.value,
  });
  closePopup(popupAdd);
  formAddCard.reset();
  blockButtonDefoult();
};

// удаление карточки

const handleDeleteElementsCard = (evt) => {
  evt.target.closest(".elements__item").remove();
};
// для лайка

const handleLikeElementsCard = (evt) => {
  evt.target
    .closest(".elements__icon")
    .classList.toggle("elements__icon_active");
};

// открытие фотки в модальном окне

function handlerOpenPopupImage(elementsData) {
  captionImagePopup.textContent = elementsData.name;
  popupImage.src = elementsData.link;
  popupImage.alt = elementsData.name;

  return openPopup(popupImageWindow);
}

// генерация карточки

function generateElementsCard(elementsData) {
  const newElementsCard = elementsCardTemplate.cloneNode(true);

  const nameElementsCard = newElementsCard.querySelector(".elements__caption");
  const linkElementsCard = newElementsCard.querySelector(".elements__foto");

  nameElementsCard.textContent = elementsData.name;
  linkElementsCard.src = elementsData.link;
  linkElementsCard.alt = elementsData.name;

  const deleteButton = newElementsCard.querySelector(".elements__icon-basket");
  deleteButton.addEventListener("click", handleDeleteElementsCard);

  const likeButton = newElementsCard.querySelector(".elements__icon");
  likeButton.addEventListener("click", handleLikeElementsCard);

  const clickImage = newElementsCard.querySelector(".elements__foto");
  clickImage.addEventListener("click", () =>
    handlerOpenPopupImage(elementsData)
  );

  return newElementsCard;
}

//слушатели

buttonPopupImageClose.addEventListener("click", () => closePopup(popupImageWindow));
formAddCard.addEventListener("submit", handlerSubmitAddElementsForm);

//рендер карточки

const renderElementsList = (elementsData) => {
  elementsContainer.prepend(generateElementsCard(elementsData));
};

initialCards.forEach((elementsData) => {
  renderElementsList(elementsData);
});
