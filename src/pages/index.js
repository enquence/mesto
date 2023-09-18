import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api.js";
import './index.css';
import Popup from "../components/Popup";

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

api.getUserInfo()
  .then((user) => userInfo.setUserInfo(user))
  .catch((error) => console.log(error))


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

// Работа с карточками: попап и форма добавления карточки, попап просмотра картинки

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

//const popupConfirm = new PopupWithForm('popup_type_confirm')

const createCard = ({ name, link, id, likes, isLikedByUser, owned }) => {
  const newCard = new Card({ name, link, id, likes, isLikedByUser, owned },
    cardTemplateSelector,
    () => popupImage.open({ name, link }),
    (isLiked) => api.likeCard(id, isLiked)
  )
  return newCard.renderCardElement()
}

const popupNewCard = new PopupWithForm('.popup_type_new-card', ({ name, link }) => {
  const imageBuffer = new Image()
  imageBuffer.src = link
  imageBuffer.onload = () => {
    api.addCard({ name, link })
      .then((card) => {
        cardSection.addItem(createCard({
          name: card.name,
          link: card.link,
          id: card._id,
          likes: card.likes,
          isLikedByUser: false,
          owned: true
        }))
      })
      .catch((error) => console.log(error))
      .finally(() => popupNewCard.close())
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
    renderer: ({ name, link, id, likes, isLikedByUser, owned }) => {
      cardSection.addItem(createCard({ name, link, id, likes, isLikedByUser, owned }))
    },
  },
  '.elements'
)

api.getAllCards()
  .then((cards) => {
    const { id: userId } = userInfo.getUserInfo()
    cards.forEach((card) => {
      const isLikedByUser = card.likes.some((user) => user._id === userId)
      cardSection.addItem(createCard({
        name: card.name,
        link: card.link,
        id: card._id,
        likes: card.likes,
        isLikedByUser: isLikedByUser,
        owned: card.owner._id === userId
      }))
    })
  })
