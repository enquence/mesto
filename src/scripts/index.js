import Card from '../components/Cards.js'
import Section from '../components/Section.js'
import initialCards from './cards-data.js'
import { openPopup, closePopup } from './utils.js'
import {
  mainPageElements,
  popupProfileElements,
  popupAddPlaceElements,
  validationConfig, popupImageElements
} from './constants.js';
import FormValidator from '../components/FormValidator.js'
import '../pages/index.css';

// -------- Функции карточек

const cardTemplateSelector = 'card'

const cardSection = new Section({
  items: initialCards.reverse(),
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplateSelector, showPicturesPopup)
    cardSection.addItem(card.renderCardElement())
    },
  },
  '.elements'
)

// -------- Функции попапов

const showPicturesPopup = ({name, link}) => {
  popupImageElements.image.src = link
  popupImageElements.image.alt = name
  popupImageElements.imageCaption.textContent = name
  openPopup(popupImageElements.popup)
}

const showProfilePopup = () => {
  popupProfileElements.usernameInput.value = mainPageElements.username.textContent
  popupProfileElements.jobInput.value = mainPageElements.job.textContent
  profileFormValidator.resetValidation()
  openPopup(popupProfileElements.popup)
}

const showAddCardPopup = () => {
  popupAddPlaceElements.addPlaceForm.reset()
  addPlaceFormValidator.resetValidation()
  openPopup(popupAddPlaceElements.popup)
}

const setPopupListeners = () => {
  mainPageElements.editProfileButton.addEventListener('click', showProfilePopup)
  mainPageElements.addPlaceButton.addEventListener('click', showAddCardPopup)
  document.querySelectorAll('.popup__close-button').forEach((button) => {
    const parentPopup = button.closest('.popup')
    parentPopup.addEventListener('mousedown', (evt) => { if (evt.target.classList.contains('popup_opened')) closePopup(parentPopup) })
    button.addEventListener('click', () => closePopup(parentPopup))
  })
}

// -------- Функции форм

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  mainPageElements.username.textContent = popupProfileElements.usernameInput.value
  mainPageElements.job.textContent = popupProfileElements.jobInput.value
  closePopup(popupProfileElements.popup)
}

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault()
  const imageBuffer = new Image()
  imageBuffer.src = popupAddPlaceElements.linkInput.value
  imageBuffer.onload = () => {
    const cardData = {
      name: popupAddPlaceElements.titleInput.value,
      link: popupAddPlaceElements.linkInput.value
    }
    const newCard = new Card(cardData, cardTemplateSelector, showPicturesPopup)
    cardSection.addItem(newCard.renderCardElement())
    closePopup(popupAddPlaceElements.popup)
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
}

const setFormSubmitListeners = () => {
  popupProfileElements.profileForm.addEventListener('submit', handleProfileFormSubmit)
  popupAddPlaceElements.addPlaceForm.addEventListener('submit', handleAddCardFormSubmit)
}

// -------- Имплементация

cardSection.renderItems()
setPopupListeners()
setFormSubmitListeners()
export const profileFormValidator = new FormValidator(validationConfig, popupProfileElements.profileForm)
export const addPlaceFormValidator = new FormValidator(validationConfig, popupAddPlaceElements.addPlaceForm)
profileFormValidator.enableValidation()
addPlaceFormValidator.enableValidation()
