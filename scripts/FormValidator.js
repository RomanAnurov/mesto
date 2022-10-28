export class FormValidator {
  constructor(config, elementForm) {
    /* this._formSelector = config.formSelector; // форма*/
    this._inputSelector = config.inputSelector; // инпут
    this._submitButtonSelector = config.submitButtonSelector; //кнопка сохранить внутри попапа
    this._inactiveButtonClass = config.inactiveButtonClass; //деактивация кнопки сохранить внутри попапа
    this._inputErrorClass = config.inputErrorClass; // инпут с  ошибкой
    this._errorClass = config.errorClass; // браузерный текст ошибки

    this._elementForm = elementForm; // форма
    /*this._formList = Array.from(document.querySelector(this._formSelector));*/

    this._errorList = Array.from(this._elementForm.querySelectorAll(this._inputErrorClass));
    this._inputList = Array.from(this._elementForm.querySelectorAll(this._inputSelector)); // массив инпутов
    this._buttonElement = this._elementForm.querySelector(
      this._submitButtonSelector
    ); // кнопка формы
  }

  //Функция блокировки кнопки по умолчанию

  _blockButtonDefoult() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");

  }



  // Функция, которая добавляет класс с ошибкой

  _showInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  // Проверяем массив инпутов на валидность

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Функция активации и деактивации кнопки

  _toggleButtoneState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "disabled");
    }
  }




  //Функция доюбавляет всем полям формы обработчики

  _setEventListeners() {
    this._toggleButtoneState(this._inputList, this._buttonElement);

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtoneState(this._inputList, this._buttonElement);
      });
    });

    this._elementForm.addEventListener("reset", () =>
      this._blockButtonDefoult()
    );
  }

  resetValidation() {
    this._toggleButtoneState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }


  //Добавляем в обработчик

  enableValidation = () => {

    this._setEventListeners();

  };
}
