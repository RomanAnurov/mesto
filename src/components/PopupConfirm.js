import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._buttonElement = this._popup.querySelector(".popup__save");
  }

  setSubmitDeleteCard(data) {
    this._submitDeleteCard = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonElement.addEventListener("click", () => {
      this._submitDeleteCard();
    });
  }
}
