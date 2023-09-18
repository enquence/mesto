import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api.js";
import './index.css';

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
const api = new Api(optionsApi)

// Данные пользователя и форма редактирования профиля

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector
})
const popupProfile = new PopupWithForm('.popup_type_profile', ({ name, about }) => {
  api.updateUserInfo({ name, about })
    .then((user) => userInfo.setUserInfo(user))
    .catch((error) => console.log(error))
    .finally(() => popupProfile.close())
})
popupProfile.setEventListeners()

const popupAvatar = new PopupWithForm('.popup_type_avatar', ({ avatar }) => {
  api.updateAvatar({ avatar })
    .then((user) => userInfo.setUserInfo(user))
    .catch((error) => console.log(error))
    .finally(() => popupAvatar.close())
})
popupAvatar.setEventListeners()

pageElements.editProfileButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo()
  pageElements.usernameInput.value = name
  pageElements.jobInput.value = about
  profileFormValidator.resetValidation()
  popupProfile.open()
})

pageElements.editAvatarButton.addEventListener('click', () => {
  const { avatar } = userInfo.getUserInfo()
  pageElements.avatarInput.value = avatar
  popupAvatar.open()
})

export const profileFormValidator = new FormValidator(validationConfig, pageElements.profileForm)
profileFormValidator.enableValidation()

api.getUserInfo()
  .then((user) => userInfo.setUserInfo(user))
  .catch((error) => console.log(error))

// Работа с карточками: попап и форма добавления карточки, попап просмотра картинки

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

const createCard = ({ name, link, id, likes }) => {
  const newCard = new Card({ name, link, id, likes }, cardTemplateSelector, () => popupImage.open({ name, link }))
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
    renderer: ({ name, link, id, likes }) => {
      cardSection.addItem(createCard({ name, link, id, likes }))
    },
  },
  '.elements'
)

api.getAllCards()
  .then((cards) => {
    cards.forEach((card) => cardSection.addItem(createCard({ name: card.name, link: card.link, id: card._id, likes: card.likes.length })))
  })
