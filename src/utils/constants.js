const cardTemplateSelector = 'card'
const nameSelector = '.profile__user-name'
const aboutSelector = '.profile__user-occupation'
const avatarSelector = '.profile__avatar'
const pageElements = {
  username: document.querySelector(nameSelector),
  job: document.querySelector(aboutSelector),
  usernameInput: document.querySelector('.form__field_type_name'),
  jobInput: document.querySelector('.form__field_type_occupation'),
  avatarInput: document.querySelector('.form__field_type_avatar'),
  editProfileButton: document.querySelector('.profile__edit-button'),
  addPlaceButton: document.querySelector('.profile__add-button'),
  elementSection: document.querySelector('.elements'),
  profileForm: document.querySelector('.form_type_profile'),
  addCardForm: document.querySelector('.form_type_new-card'),
  avatarForm: document.querySelector('.form_type_avatar'),
  editAvatarButton: document.querySelector('.profile__avatar-edit')
}
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
}
const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'd6407735-ae7a-4c39-ac77-589083b716b5',
    'Content-Type': 'application/json'
  }
}

export { cardTemplateSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
  pageElements,
  validationConfig,
  optionsApi }
