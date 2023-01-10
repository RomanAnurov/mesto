export default class Card {
  constructor(
    data,
    templateSelector,
    userID,
    { handleCardClick, handlePopupConfirm, handleLikeCounter }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    this._ownerID = data.owner._id;
    this._id = data._id;
    this._userID = userID;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handlePopupConfirm = handlePopupConfirm;
    this._handleLikeCounter = handleLikeCounter;
  }

  // Возвращает разметку карточки//

  _getTemplate() {
    const elementsCardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return elementsCardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__foto");
    this._cardImage.src = this._link;
    this._element.querySelector(".elements__caption").textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeButton = this._element.querySelector(".elements__icon");
    this._buttonBasket = this._element.querySelector(".elements__icon-basket");
    this._counterLikes = this._element.querySelector(".elements__counter-like");
    this._counterLikes.innerHTML = this._likes.length;

    if (this._likes.some((like) => like._id === this._userID)) {
      this._likeButton.classList.add("elements__icon_active");
    }

    if (this._ownerID === this._userID) {
      this._buttonBasket.classList.remove("elements__icon-basket_hidden");
    }
    this._setEventListeners();
    return this._element;
  }

  /* Слушатели */

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCounter(this.likeOwner());
    });

    this._buttonBasket.addEventListener("click", () => {
      this._handlePopupConfirm();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._counterLikes.innerHTML = this._likes.length;
    this._likeButton.classList.toggle(
      "elements__icon_active",
      this.likeOwner()
    );
  }

  //  (сравниваем ийдишники массива лайков с айдишником пользователя)

  likeOwner() {
    return this._likes.some((like) => like._id === this._userID);
  }

  /*Функция удаления карточки*/

  removeCard() {
    this._element.remove();
  }
}
