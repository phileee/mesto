export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._closeByEscape);
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener("keydown", this._closeByEscape);
    this._popupSelector.classList.remove('popup_opened');
  }

  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains("popup__close") || (evt.target === evt.target.closest(".popup"))) {
        this.close();
      }
    });
  }
}