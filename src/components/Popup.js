import { popups } from "../utils/constants.js";

export default class Popup {
  constructor(selectPopup) {
    this._popup = document.querySelector(selectPopup);
  }
  open() {
    this._popup.classList.add("popup_type_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_type_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    popups.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_type_opened")) {
          this.close();
        }
        if (evt.target.classList.contains("popup__close")) {
          this.close();
        }
      });
    });
  }
}
