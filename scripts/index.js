import Card from './cards.js'
import initialCards from './cards-data.js'
import { setPopupListeners, setFormSubmitListeners } from './utils.js'
import FormValidator from './validation.js'

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
}
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
const cardTemplateSelector = 'card'

const addCards = (...cardsData) => {
  const elementSection = document.querySelector('.elements')
  cardsData.forEach( cardData => {
    const card = new Card(cardData, cardTemplateSelector)
    elementSection.prepend(card.renderCardElement())
  })
}

addCards(...initialCards.reverse());
setPopupListeners()
setFormSubmitListeners()
formList.forEach( (form) => {
  const formValidator = new FormValidator(validationConfig, form)
  formValidator.enableValidation()
})

export { addCards };
