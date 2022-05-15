import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._card = card;
  }

  open() {
    super.open();
  }

 

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
    });
  }
}