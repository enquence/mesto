class FormValidator {
  constructor(config, formElement) {
    this._config = config
    this._formElement = formElement
  }

  _setButtonActivity(activityState) {
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
    if (activityState) {
      buttonElement.classList.remove(this._config.inactiveButtonClass)
      buttonElement.disabled = false
    } else {
      buttonElement.classList.add(this._config.inactiveButtonClass)
      buttonElement.disabled = true
    }
  }

  _toggleSubmitButtonState(inputList) {
    const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid)
    this._setButtonActivity(!hasInvalidInput(inputList))
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
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._toggleSubmitButtonState(inputList)

    inputList.forEach( (input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input)
        this._toggleSubmitButtonState(inputList)
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

}

export default FormValidator;
