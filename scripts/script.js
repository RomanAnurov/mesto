const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
}

function popupOverLayClickHandler(evt) {

  if (evt.target === evt.currentTarget) {
    popupOpenToggle();

  }

}
openPopupButton.addEventListener('click', popupOpenToggle);

closePopupButton.addEventListener('click', popupOpenToggle);

popup.addEventListener('click', popupOverLayClickHandler);


//редактирование формы//

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_user-name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_user-about');// Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__sub-title');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
    
  // Выберите элементы, куда должны быть вставлены значения полей
  
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler); 
const closeSaveButton = formElement.querySelector('.popup__save');
closeSaveButton.addEventListener('click', popupOpenToggle);

