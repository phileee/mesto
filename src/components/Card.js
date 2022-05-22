export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardConfirmation, api) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._like = data.likes;
    this._api = api;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardConfirmation = handleCardConfirmation;

    if (data.likes) {
      this._likes = data.likes.length;
    } else {
      this._likes = 0;
    }
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
    
    this._elementLikes = this._element.querySelector('.element__like-count');
    this._elementLikes.textContent = this._likes;

    if (typeof this._like !== "undefined"  && this._like.some((user) => {return user._id == '1cfeff16d693eb907dcbf8c0'})) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }

    this._listenElements();
    return this._element;
  }

  
  
  _likeElement(element, id) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');

    if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
      this._api.toggleLike(id, 'PUT')
      .then((res) => {return res.likes.length})
      .then((count) => {
        element.querySelector('.element__like-count').textContent = count;
      });
    } else {
      this._api.toggleLike(id, 'DELETE')
      .then((res) => {return res.likes.length})
      .then((count) => {
        element.querySelector('.element__like-count').textContent = count;
      });
    }
  }
  
  _listenElements() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardConfirmation(this._element, this._id)
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement(this._element, this._id);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
