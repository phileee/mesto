import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, element) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._element = element;
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteElement();
      this.close();
    });
  }
}