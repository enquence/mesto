class FormValidator {
  constructor(config, formElement) {
    this._config = config
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector)
  }

  _setButtonActivity() {
    if (!this._hasInvalidInput(this._inputList)) {
      this._submitButtonElement.classList.remove(this._config.inactiveButtonClass)
      this._submitButtonElement.disabled = false
    } else {
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass)
      this._submitButtonElement.disabled = true
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid)
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._config.errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(this._config.errorClass)
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._setButtonActivity()
    this._inputList.forEach( (input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input)
        this._setButtonActivity()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

  resetValidation() {
    this._setButtonActivity(false)
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

}

export default FormValidator;
