import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import initialCards from './cards-data.js'
import '../pages/index.css';

const pageElements = {
  username: document.querySelector('.profile__user-name'),
  job: document.querySelector('.profile__user-occupation'),
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

const cardTemplateSelector = 'card'

const userInfo = new UserInfo({
  usernameInputSelector: '.form__field_type_name',
  jobInputSelector: '.form__field_type_occupation'
})

// -------- Попапы

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners()

const popupNewCard = new PopupWithForm('.popup_type_new-card', ({ title, link }) => {
  const imageBuffer = new Image()
  imageBuffer.src = link
  imageBuffer.onload = () => {
    const cardData = { title, link }
    const newCard = new Card(cardData, cardTemplateSelector, popupImage.open.bind(cardData))
    cardSection.addItem(newCard.renderCardElement())
    popupNewCard.close()
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
})

const popupProfile = new PopupWithForm('.popup_type_profile', ( { username, job } ) => {
  userInfo.setUserInfo({
    username: username,
    job: job
  })
  pageElements.username.textContent = username
  pageElements.job.textContent = job
  popupProfile.close()
})

popupNewCard.setEventListeners()
popupProfile.setEventListeners()

pageElements.addPlaceButton.addEventListener('click', () => {
  addPlaceFormValidator.resetValidation()
  popupNewCard.open()
})

pageElements.editProfileButton.addEventListener('click', () => {
  userInfo.setUserInfo({
    username: pageElements.username.textContent,
    job: pageElements.job.textContent
  })
  profileFormValidator.resetValidation()
  popupProfile.open()
})

// -------- Карточки

const cardSection = new Section({
    items: initialCards.reverse(),
    renderer: (cardData) => {
      const card = new Card(cardData, cardTemplateSelector, ({title, link}) => popupImage.open(cardData))
      cardSection.addItem(card.renderCardElement())
    },
  },
  '.elements'
)

cardSection.renderItems()

// -------- Валидация

export const profileFormValidator = new FormValidator(validationConfig, pageElements.profileForm)
export const addPlaceFormValidator = new FormValidator(validationConfig, pageElements.addCardForm)
profileFormValidator.enableValidation()
addPlaceFormValidator.enableValidation()
