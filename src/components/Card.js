export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardConfirmation) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardConfirmation = handleCardConfirmation;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementCard;
  }

  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__caption').textContent = this._name;

    this._listenElements();
    return this._element;
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }
  
  _likeElement() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  
  _listenElements() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardConfirmation();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
