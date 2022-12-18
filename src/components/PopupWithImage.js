import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._captionImagePopup = this._popup.querySelector(".popup__caption");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._captionImagePopup.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}
