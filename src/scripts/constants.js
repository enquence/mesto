const mainPageElements = {
  username: document.querySelector('.profile__user-name'),
  job: document.querySelector('.profile__user-occupation'),
  editProfileButton: document.querySelector('.profile__edit-button'),
  addPlaceButton: document.querySelector('.profile__add-button'),
  elementSection: document.querySelector('.elements')
}

const popupProfileElements = {
  popup: document.querySelector('.popup_type_profile'),
  profileForm: document.querySelector('.form_type_profile'),
  usernameInput: document.querySelector('.form__field_type_name'),
  jobInput: document.querySelector('.form__field_type_occupation')
}

const popupAddPlaceElements = {
  popup: document.querySelector('.popup_type_new-card'),
  addPlaceForm: document.querySelector('.form_type_new-card'),
  titleInput: document.querySelector('.form__field_type_place-title'),
  linkInput: document.querySelector('.form__field_type_place-link')
}
popupAddPlaceElements.submitButton = popupAddPlaceElements.addPlaceForm.querySelector('.form__save-button')

const popupImageElements = {
  popup: document.querySelector('.popup_type_image'),
  image: document.querySelector('.popup__image'),
  imageCaption: document.querySelector('.popup__image-caption')
}

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
}

export {
  mainPageElements,
  popupProfileElements,
  popupAddPlaceElements,
  popupImageElements,
  validationConfig
}
