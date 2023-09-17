import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api.js";
import './index.css';

const cardTemplateSelector = 'card'
const usernameSelector = '.profile__user-name'
const jobSelector = '.profile__user-occupation'
const pageElements = {
  username: document.querySelector(usernameSelector),
  job: document.querySelector(jobSelector),
  usernameInput: document.querySelector('.form__field_type_name'),
  jobInput: document.querySelector('.form__field_type_occupation'),
  editProfileButton: document.querySelector('.profile__edit-button'),
  addPlaceButton: document.querySelector('.profile__add-button'),
  elementSection: document.querySelector('.elements'),
  profileForm: document.querySelector('.form_type_profile'),
  addCardForm: document.querySelector('.form_type_new-card')
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
const api = new Api(optionsApi)
//console.log(api.getAllCards())

// Данные пользователя и форма редактирования профиля

const userInfo = new UserInfo({
  usernameSelector: usernameSelector,
  jobSelector: jobSelector
})
const popupProfile = new PopupWithForm('.popup_type_profile', ( { username, job } ) => {
  userInfo.setUserInfo({ username: username, job: job })
  popupProfile.close()
})
popupProfile.setEventListeners()

pageElements.editProfileButton.addEventListener('click', () => {
  const { username, job } = userInfo.getUserInfo()
  pageElements.usernameInput.value = username
  pageElements.jobInput.value = job
  profileFormValidator.resetValidation()
  popupProfile.open()
})

export const profileFormValidator = new FormValidator(validationConfig, pageElements.profileForm)
profileFormValidator.enableValidation()

// Работа с карточками: попап и форма добавления карточки, попап просмотра картинки

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

const createCard = ({ name, link, id }) => {
  const newCard = new Card({ name, link, id }, cardTemplateSelector, () => popupImage.open({ name, link }))
  return newCard.renderCardElement()
}

const popupNewCard = new PopupWithForm('.popup_type_new-card', ({ title, link }) => {
  const imageBuffer = new Image()
  imageBuffer.src = link
  imageBuffer.onload = () => {
    cardSection.addItem(createCard({ title, link }))
    popupNewCard.close()
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
})
popupNewCard.setEventListeners()

pageElements.addPlaceButton.addEventListener('click', () => {
  addPlaceFormValidator.resetValidation()
  popupNewCard.open()
})

export const addPlaceFormValidator = new FormValidator(validationConfig, pageElements.addCardForm)
addPlaceFormValidator.enableValidation()

const cardSection = new Section({
    items: [],
    renderer: ({ name, link }) => {
      cardSection.addItem(createCard({ name, link, id }))
    },
  },
  '.elements'
)

api.getAllCards()
  .then((cards) => {
    cards.forEach((card) => cardSection.addItem(createCard({ name: card.name, link: card.link, id: card._id })))
  })
