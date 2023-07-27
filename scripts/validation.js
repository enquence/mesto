const enableValidation = (validationConfig) => {

  const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(validationConfig.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(validationConfig.errorClass)
  }

  const hideInputError = (validationConfig, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(validationConfig.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(validationConfig.errorClass)
  }

  const checkValidity = (validationConfig, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage)
    } else {
      hideInputError(validationConfig, formElement, inputElement)
    }
  }

  const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid)

  const toggleSubmitButtonState = (validationConfig, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    toggleSubmitButtonState(validationConfig, inputList, buttonElement)

    inputList.forEach( (input) => {
      input.addEventListener('input', () => {
        checkValidity(validationConfig, formElement, input)
        toggleSubmitButtonState(validationConfig, inputList, buttonElement)
      })
    })
  }

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach( (form) => setEventListeners(form))

}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
});
