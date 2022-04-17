import {figureImage, figureCaption, popupFigure, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

    this._listenerElements();
  
    return this._element;
  }

  _deleteElement() {
    this._element.closest('.element').remove();
  }
  
  _likeElement() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _figCaption() {
    const figImg = this._element.querySelector('.element__image');
    const figCap = this._element.querySelector('.element__caption');
    figureImage.src = figImg.src;
    figureImage.alt = figCap.textContent;
    figureCaption.textContent = figCap.textContent;
    openPopup(popupFigure);
  }
  
  _listenerElements() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._figCaption();
    });
  }
}
