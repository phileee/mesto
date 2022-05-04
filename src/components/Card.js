export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__caption').textContent = this._name;

    this._listenElements();
  
    return this._element;
  }

  _deleteElement() {
    this._element.closest('.element').remove();
  }
  
  _likeElement() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  
  _listenElements() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
