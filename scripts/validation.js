const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
}

const setButtonActivity = (validationConfig, buttonElement, isInactive) => {
  if (isInactive) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const toggleSubmitButtonState = (validationConfig, inputList, buttonElement) => {
  const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid)
  setButtonActivity(validationConfig, buttonElement, hasInvalidInput(inputList))
}

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

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach( (form) => setEventListeners(form))
}

enableValidation(validationConfig);
