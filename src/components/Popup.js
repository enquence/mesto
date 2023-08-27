export default class Popup {
  constructor(selector) {
    this._selector = selector
    this._popupElement = document.querySelector(this._selector)
    this._closeButtonElement = this._popupElement.querySelector('.popup__close-button')
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    window.addEventListener('keyup', this._handleClosePopupOnEsc.bind(this))
  }

  close() {
    this._popupElement.classList.remove('popup_opened')
    window.removeEventListener('keyup', this._handleClosePopupOnEsc)
  }

  _handleClosePopupOnEsc(evt) {
    if (evt.key === 'Escape') this.close()
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', () => this.close())
    this._popupElement.addEventListener('mousedown', (evt) => { if (evt.target.classList.contains('popup_opened')) this.close() })
  }
}
