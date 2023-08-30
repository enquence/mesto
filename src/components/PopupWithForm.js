import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit
    this._inputElements = this._popupElement.querySelectorAll('.form__field')
    this._formElement = this._popupElement.querySelector('.form')
    this._data = {}
  }

  _getInputValues() {
    this._inputElements.forEach( (field) => {
      this._data[field.name] = field.value
    })
    return this._data
  }

  close() {
    this._formElement.reset()
    super.close()
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

}
