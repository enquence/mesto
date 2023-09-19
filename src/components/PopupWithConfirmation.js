import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButtonElement = document.querySelector('.popup__confirm-button')
  }

  open(handleConfirmation) {
    this._handleConfirmation = handleConfirmation
    super.open()
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButtonElement.addEventListener('click', () => this._handleConfirmation())
  }

}
