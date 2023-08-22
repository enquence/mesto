import { addCards } from './index.js';

const mainPageElements = {
  username: document.querySelector('.profile__user-name'),
  job: document.querySelector('.profile__user-occupation'),
  editProfileButton: document.querySelector('.profile__edit-button'),
  addPlaceButton: document.querySelector('.profile__add-button')
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

const closeButtonsArray = Array.from(document.querySelectorAll('.popup__close-button'))

const handleClosePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  window.addEventListener('keyup', handleClosePopupOnEsc)
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened')
  window.removeEventListener('keyup', handleClosePopupOnEsc)
}

const showPicturesPopup = (evt) => {
  openPopup(popupImageElements.popup)
  popupImageElements.image.src = evt.target.src
  popupImageElements.image.alt = evt.target.alt
  popupImageElements.imageCaption.textContent = evt.target.alt
}

const showProfilePopup = () => {
  popupProfileElements.usernameInput.value = mainPageElements.username.textContent
  popupProfileElements.jobInput.value = mainPageElements.job.textContent
  openPopup(popupProfileElements.popup)
}

const showAddCardPopup = () => {
  popupAddPlaceElements.addPlaceForm.reset()
//  Две следующие строчки выглядят как костыль, но я пока не придумал как сделать иначе. Буду благодарен за совет)
  popupAddPlaceElements.submitButton.classList.add('form__save-button_inactive')
  popupAddPlaceElements.submitButton.disabled = true
  openPopup(popupAddPlaceElements.popup)
}

const setPopupListeners = () => {
  [popupProfileElements.popup, popupAddPlaceElements.popup, popupImageElements.popup].forEach((popup) => popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) closePopup(popup)
  }))
  mainPageElements.editProfileButton.addEventListener('click', showProfilePopup)
  mainPageElements.addPlaceButton.addEventListener('click', showAddCardPopup)
  closeButtonsArray.forEach((button) => button.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))))
}

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
    addCards({name: popupAddPlaceElements.titleInput.value, link: popupAddPlaceElements.linkInput.value})
    closePopup(popupAddPlaceElements.popup)
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
}

const setFormSubmitListeners = () => {
  popupProfileElements.profileForm.addEventListener('submit', handleProfileFormSubmit)
  popupAddPlaceElements.addPlaceForm.addEventListener('submit', handleAddCardFormSubmit)
}

export { setPopupListeners, setFormSubmitListeners, showPicturesPopup }
