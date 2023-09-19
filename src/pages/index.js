import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
const api = new Api(optionsApi)

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector
})

const popupProfile = new PopupWithForm('.popup_type_profile', ({ name, about }) => {
  popupProfile.showLoadingState()
  api.updateUserInfo({ name, about })
    .then((user) => userInfo.setUserInfo(user))
    .catch((error) => console.log(`Ошибка при обновлении данных пользователя: ${error}`))
    .finally(() => {
      popupProfile.close()
      popupProfile.showLoadingState(false)
    })
})

const popupAvatar = new PopupWithForm('.popup_type_avatar', ({ avatar }) => {
  popupAvatar.showLoadingState()
  api.updateAvatar({ avatar })
    .then((user) => userInfo.setUserInfo(user))
    .catch((error) => console.log(`Ошибка при загрузке изображения: ${error}`))
    .finally(() => {
      popupAvatar.close()
      popupAvatar.showLoadingState(false)
    })
})

const createCard = ({ name, link, id, likes, isLikedByUser, owned }) => {
  const newCard = new Card({ name, link, id, likes, isLikedByUser, owned },
    cardTemplateSelector,
    () => popupImage.open({ name, link }),
    (isLiked) => api.likeCard(id, isLiked),
    () => popupConfirm.open(() => {
      api.deleteCard(id)
        .then(() => newCard.deleteCard())
        .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
        .finally(() => popupConfirm.close())
    })
  )
  return newCard.renderCardElement()
}

const popupNewCard = new PopupWithForm('.popup_type_new-card', ({ name, link }) => {
  const imageBuffer = new Image()
  imageBuffer.src = link
  imageBuffer.onload = () => {
    popupNewCard.showLoadingState()
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
      .finally(() => {
        popupNewCard.close()
        popupNewCard.showLoadingState(false)
      })
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки.')
})

const popupImage = new PopupWithImage('.popup_type_image')
const popupConfirm = new PopupWithConfirmation('.popup_type_confirm')

const cardSection = new Section({
    items: [],
    renderer: ({ name, link, id, likes, isLikedByUser, owned }) => {
      cardSection.addItem(createCard({ name, link, id, likes, isLikedByUser, owned }))
    },
  },
  '.elements'
)

api.getUserInfo()
  .then((user) => userInfo.setUserInfo(user))
  .then(() => api.getAllCards())
  .then((cards) => {
    const { id: userId } = userInfo.getUserInfo()
    cards.reverse().forEach((card) => {
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
  .then(() => {
    const profileFormValidator = new FormValidator(validationConfig, pageElements.profileForm)
    const avatarFormValidator = new FormValidator(validationConfig, pageElements.avatarForm)
    const addPlaceFormValidator = new FormValidator(validationConfig, pageElements.addCardForm)

    profileFormValidator.enableValidation()
    avatarFormValidator.enableValidation()
    addPlaceFormValidator.enableValidation()

    popupProfile.setEventListeners()
    popupAvatar.setEventListeners()
    popupImage.setEventListeners()
    popupConfirm.setEventListeners()
    popupNewCard.setEventListeners()

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

    pageElements.addPlaceButton.addEventListener('click', () => {
      addPlaceFormValidator.resetValidation()
      popupNewCard.open()
    })
  })
  .catch((error) => console.log(error))
