const popupProfileElement = document.querySelector('.popup_type_profile')
const popupNewCardElement = document.querySelector('.popup_type_new-card')
const popupImageElement = document.querySelector('.popup_type_image')
const profileFormElement = document.querySelector('.form_type_profile')
const addCardFormElement = document.querySelector('.form_type_new-card')
const nameInput = document.querySelector('.form__field_type_name')
const jobInput = document.querySelector('.form__field_type_occupation')
const nameElement = document.querySelector('.profile__user-name')
const jobElement = document.querySelector('.profile__user-occupation')
const placeTitleInput = document.querySelector('.form__field_type_place-title')
const placeLinkInput = document.querySelector('.form__field_type_place-link')
const imageElement = document.querySelector('.popup__image')
const imageCaptionElement = document.querySelector('.popup__image-caption')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButtonsArray = Array.from(document.querySelectorAll('.popup__close-button'))

const openPopup = (popupElement) => popupElement.classList.add('popup_opened')
const handleLikeClick = (evt) => evt.target.classList.toggle('card__like-button_active')
const handleCardDeleteClick = (evt) => evt.target.closest('.card').remove()
const closePopup = (popupElement) => popupElement.classList.remove('popup_opened')
const closeAllPopups = () => {
  const openedPopupList = Array.from(document.querySelectorAll('.popup_opened'))
  openedPopupList.forEach( (popup) => closePopup(popup) )
}

const showPicturesPopup = (evt) => {
  openPopup(popupImageElement)
  imageElement.src = evt.target.src
  imageCaptionElement.textContent = evt.target.alt
}

const createCardElement = (card) => {
  const cardTemplate = document.querySelector('#card').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = card.name
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link
  cardImage.alt = card.name
  cardImage.addEventListener('click', showPicturesPopup)
  cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeClick)
  cardElement.querySelector('.card__trash-button').addEventListener('click', handleCardDeleteClick)
  return cardElement
}

const addCards = (append = true, ...cards) => {
  const elementSection = document.querySelector('.elements')
  cards.forEach( card => {
    if (append) elementSection.append(createCardElement(card))
      else elementSection.prepend(createCardElement(card))
  })
}

const showProfilePopup = () => {
  nameInput.value = nameElement.textContent
  jobInput.value = jobElement.textContent
  openPopup(popupProfileElement)
}

const showAddCardPopup = () => {
  addCardFormElement.reset()
  openPopup(popupNewCardElement)
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  nameElement.textContent = nameInput.value
  jobElement.textContent = jobInput.value
  closePopup(popupProfileElement)
}

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault()
  const imageBuffer = new Image()
  imageBuffer.src = placeLinkInput.value
  imageBuffer.onload = () => {
    addCards(false, {name: placeTitleInput.value, link: placeLinkInput.value})
    closePopup(popupNewCardElement)
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
}

addCards(true, ...initialCards);
[popupProfileElement, popupNewCardElement, popupImageElement].forEach((popup) => popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) closePopup(popup)
}))
profileFormElement.addEventListener('submit', handleProfileFormSubmit)
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit)
editButton.addEventListener('click', showProfilePopup)
addButton.addEventListener('click', showAddCardPopup)
closeButtonsArray.forEach( (button) => button.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))) )
window.addEventListener('keyup', (evt) => {
  if (evt.key === 'Escape') closeAllPopups()
})
