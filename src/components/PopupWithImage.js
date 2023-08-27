import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popupElement.querySelector('.popup__image')
    this._imageCaption = this._popupElement.querySelector('.popup__image-caption')
  }

  open({ title, link }) {
    this._title = title
    this._link = link
    this._imageElement.src = this._link
    this._imageCaption.textContent = this._title
    this._imageElement.alt = this._title
    super.open()
  }
}
