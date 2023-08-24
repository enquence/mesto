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

export { openPopup, closePopup }
