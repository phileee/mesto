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

  setEventListeners(deleteCard) {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      deleteCard
        .then(() => this._deleteElement())
        .finally(() => {
          this._renderLoading(false);
          this.close();
        })
      
    });
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._popupSelector.querySelector('.popup__button').textContent = 'Сохранение...';
    } else {
      this._popupSelector.querySelector('.popup__button').textContent = 'Да';
    }
  }
}