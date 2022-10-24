export class Card {
  constructor(data, templateSelector, handlerOpenPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handlerOpenPopupImage = handlerOpenPopupImage;
  }
  _getTemplate() {
    const elementsCardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return elementsCardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__foto").src = this._link;
    this._element.querySelector(".elements__caption").textContent = this._name;
    this._element.querySelector(".elements__foto").alt = this._name;

    return this._element;
  }

  /* Слушатели */

  _setEventListeners() {
    this._element
      .querySelector(".elements__icon")
      .addEventListener("click", () => {
        this._handleLikeElementsCard();
      });

    this._element
      .querySelector(".elements__icon-basket")
      .addEventListener("click", () => {
        this._handleDeleteElementsCard();
      });

    this._element
      .querySelector(".elements__foto")
      .addEventListener("click", () => {
        this._handlerOpenPopupImage(this._name, this._link);
      });
  }

  /*Функция добавления и удаления лайка*/

  _handleLikeElementsCard() {
    this._element
      .querySelector(".elements__icon")
      .classList.toggle("elements__icon_active");
  }

  /*Функция удаления карточки*/

  _handleDeleteElementsCard() {
    this._element.remove();
  }

  /* Функция открывающая фото на в большом размере */

  /*_handlerOpenPopupImage() { 
    captionImagePopup.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    openPopup(popupImageWindow);
  };*/
}
