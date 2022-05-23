import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, element) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._element = element;
  }

  _deleteElement(card) {
    card.remove();
    card = null;
  }

  open(element, id) {
    super.open();
    this._card = element;
    this._id = id;
  }

  setEventListeners(api) {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      api.deleteCard(this._id)
        .then(() => {
          this._deleteElement(this._card);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._renderLoading(false);
        })
      
    });
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = 'Да';
    }
  }
}