import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api.js";
import './index.css';
import { cardTemplateSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
  pageElements,
  validationConfig,
  optionsApi } from "../utils/constants.js"

const api = new Api(optionsApi)

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector
})

const popupProfile = new PopupWithForm('.popup_type_profile', ({ name, about }) => {
  popupProfile.showLoadingState()
  api.updateUserInfo({ name, about })
    .then((user) => {
      userInfo.setUserInfo(user)
      popupProfile.close()
    })
    .catch((error) => console.log(`Ошибка при обновлении данных пользователя: ${error}`))
    .finally(() => popupProfile.showLoadingState(false))
})

const popupAvatar = new PopupWithForm('.popup_type_avatar', ({ avatar }) => {
  popupAvatar.showLoadingState()
  api.updateAvatar({ avatar })
    .then((user) => {
      userInfo.setUserInfo(user)
      popupAvatar.close()
    })
    .catch((error) => console.log(`Ошибка при загрузке изображения: ${error}`))
    .finally(() => popupAvatar.showLoadingState(false))
})

const createCard = ({ name, link, id, likes, isLikedByUser, owned }) => {
  const newCard = new Card({ name, link, id, likes, isLikedByUser, owned },
    cardTemplateSelector,
    () => popupImage.open({ name, link }),
    (isLiked) => api.likeCard(id, isLiked),
    () => popupConfirm.open(() => {
      api.deleteCard(id)
        .then(() => {
          newCard.deleteCard()
          popupConfirm.close()
        })
        .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
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
        popupNewCard.close()
      })
      .catch((error) => console.log(error))
      .finally(() => popupNewCard.showLoadingState(false))
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
      popupProfile.setInputValues(userInfo.getUserInfo())
      profileFormValidator.resetValidation()
      popupProfile.open()
    })

    pageElements.editAvatarButton.addEventListener('click', () => {
      popupAvatar.setInputValues(userInfo.getUserInfo())
      avatarFormValidator.resetValidation()
      popupAvatar.open()
    })

    pageElements.addPlaceButton.addEventListener('click', () => {
      addPlaceFormValidator.resetValidation()
      popupNewCard.open()
    })
  })
  .catch((error) => console.log(error))
