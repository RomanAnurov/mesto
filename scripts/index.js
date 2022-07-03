const buttonPopupOpenEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const buttonPopupClose = popupEdit.querySelector(".popup__close");
const popup = document.querySelectorAll(".popup");

//редактирование формы//

// Находим форму редактирования данных пользователяв DOM
const formElement = popupEdit.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_user-name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_user-about"); // Воспользуйтесь инструментом .querySelector()
const formInput = formElement.querySelector(".popup__input");

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
const buttonCloseWindow = popupImageWindow.querySelector(".popup__close");

//функции

function openPopup(popup) {
  popup.classList.add("popup_type_opened");


}

function closePopup(popup) {
  popup.classList.remove("popup_type_opened");
}

// Закрытие Попапа нажатием на  Esc

popup.forEach((popup) => {
  window.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      closePopup(popup);
    }
  });
});


//Закрытие попапа кликом на оверлей

popup.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

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

  formAddCard.reset();
  closePopup(popupAdd);




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

buttonCloseWindow.addEventListener("click", () => closePopup(popupImageWindow));
formAddCard.addEventListener("submit", handlerSubmitAddElementsForm);

//рендер карточки

const renderElementsList = (elementsData) => {
  elementsContainer.prepend(generateElementsCard(elementsData));
};

initialCards.forEach((elementsData) => {
  renderElementsList(elementsData);
});


// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');

};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';

};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};


//Проверяем массив инпутов на валидность

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция активации и деактивации кнопки

const toggleButtoneState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.removeAttribute('disabled', 'disabled');

  }
};


//Функция доюбавляет всем полям формы обработчики

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtoneState(inputList, buttonElement);


  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtoneState(inputList, buttonElement);
    });
  });
};


//Добавляем всем формам обработчики

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
