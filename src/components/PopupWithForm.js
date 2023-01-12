import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor( popupSelector, { submitCallBack }) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._buttonElement = this._popup.querySelector(".popup__save");
  }
  _getInputValues() {
    // создаём пустой объект
    this._inputValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitCallBack(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Щас начальник...";
    } else {
      this._buttonElement.textContent = "Сохранить";
    }
  }
}
