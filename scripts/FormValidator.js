export class FormValidator {
  constructor(list, form) {
    
    this._inputSelector = list.inputSelector;
    this._submitButtonSelector = list.submitButtonSelector;
    this._inactiveButtonClass = list.inactiveButtonClass;
    this._inputErrorClass = list.inputErrorClass;
    this._form = form;
    
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }
  
  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    this._setEventListener();
  }
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute("disabled", "disabled");
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute("disabled");
    }
  };
}

