const buttonPopupOpenEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const buttonPopupClose = popupEdit.querySelector(".popup__close");

//редактирование формы//

// Находим форму в DOM
const formElement = popupEdit.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_user-name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_user-about"); // Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__sub-title");

// второй ПопАп //

const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add-card");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close");

// массив с карточками

//Дом элементы

const elementsContainer = document.querySelector(".elements");
const formAddCard = popupAdd.querySelector(".popup__form");
const nameCardInput = formAddCard.querySelector(".popup__input_type_card-name");
const urlCardInput = formAddCard.querySelector(".popup__input_type_card-url");

const captionImagePopup = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

// селект попапа с модальным окном картинки

const popupImageWindow = document.querySelector(".popup_type_image-open");
const buttonCloseWindow = popupImageWindow.querySelector(".popup__close");

//функции

function openPopup(popupEdit) {
  popupEdit.classList.add("popup_type_opened");
}

function closePopup(popupEdit) {
  popupEdit.classList.remove("popup_type_opened");
}

function openPopup(popupAdd) {
  popupAdd.classList.add("popup_type_opened");
}

function closePopup(popupAdd) {
  popupAdd.classList.remove("popup_type_opened");
}

function closePopup(popupImageWindow) {
  popupImageWindow.classList.remove("popup_type_opened");
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

buttonPopupClose.addEventListener("click", () => closePopup(popupEdit));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener("submit", handlerSubmitForm);

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

  return closePopup(popupAdd);
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

  popupImageWindow.classList.add("popup_type_opened");
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

buttonCloseWindow.addEventListener("click", () => closePopup(popupImageWindow));
formAddCard.addEventListener("submit", handlerSubmitAddElementsForm);

//рендер карточки

const renderElementsList = (elementsData) => {
  elementsContainer.prepend(generateElementsCard(elementsData));
};

initialCards.forEach((elementsData) => {
  renderElementsList(elementsData);
});
