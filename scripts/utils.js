import {
  popupImageElements,
  popupProfileElements,
  popupAddPlaceElements,
  mainPageElements } from './constants.js';
import { profileFormValidator, addPlaceFormValidator } from './index.js';

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

export { showProfilePopup, showAddCardPopup, showPicturesPopup, closePopup }
