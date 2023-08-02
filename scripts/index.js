  // const popupProfileElement = document.querySelector('.popup_type_profile')
  // const popupNewCardElement = document.querySelector('.popup_type_new-card')
  // const popupImageElement = document.querySelector('.popup_type_image')
  // const profileFormElement = document.querySelector('.form_type_profile')
  // const addCardFormElement = document.querySelector('.form_type_new-card')
  // const nameInput = document.querySelector('.form__field_type_name')
  // const jobInput = document.querySelector('.form__field_type_occupation')
  // const nameElement = document.querySelector('.profile__user-name')
  // const jobElement = document.querySelector('.profile__user-occupation')
  // const placeTitleInput = document.querySelector('.form__field_type_place-title')
  // const placeLinkInput = document.querySelector('.form__field_type_place-link')
  // const imageElement = document.querySelector('.popup__image')
  // const imageCaptionElement = document.querySelector('.popup__image-caption')
  // const editButton = document.querySelector('.profile__edit-button')
  // const addButton = document.querySelector('.profile__add-button')
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
const cardTemplate = document.querySelector('#card').content.querySelector('.card')

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

const handleLikeClick = (evt) => evt.target.classList.toggle('card__like-button_active')
const handleCardDeleteClick = (evt) => evt.target.closest('.card').remove()
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

const createCardElement = (card) => {
  const cardElement = cardTemplate.cloneNode(true)
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
  popupProfileElements.usernameInput.value = mainPageElements.username.textContent
  popupProfileElements.jobInput.value = mainPageElements.job.textContent
  openPopup(popupProfileElements.popup)
}

const showAddCardPopup = () => {
  popupAddPlaceElements.addPlaceForm.reset()
  setButtonActivity(validationConfig, popupAddPlaceElements.submitButton, true)
  openPopup(popupAddPlaceElements.popup)
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
    addCards(false, {name: popupAddPlaceElements.titleInput.value, link: popupAddPlaceElements.linkInput.value})
    closePopup(popupAddPlaceElements.popup)
  }
  imageBuffer.onerror = () => alert('По этой ссылке нет картинки!')
}

addCards(true, ...initialCards);
[popupProfileElements.popup, popupAddPlaceElements.popup, popupImageElements.popup].forEach((popup) => popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) closePopup(popup)
}))
popupProfileElements.profileForm.addEventListener('submit', handleProfileFormSubmit)
popupAddPlaceElements.addPlaceForm.addEventListener('submit', handleAddCardFormSubmit)
mainPageElements.editProfileButton.addEventListener('click', showProfilePopup)
mainPageElements.addPlaceButton.addEventListener('click', showAddCardPopup)
closeButtonsArray.forEach( (button) => button.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))) )
