import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, figImg, figCap}) {
    super(popupSelector);
    this._figImg = document.querySelector(figImg);
    this._figCap = document.querySelector(figCap);
  }

  open(name, URL) {
    this._figImg.src = URL;
    this._figImg.alt = name;
    this._figCap.textContent = name;
    super.open();
  }
}