const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElement = document.querySelector('.popup')
const formElement = document.querySelector('.form')
const nameInput = document.querySelector('.form__field_type_name')
const jobInput = document.querySelector('.form__field_type_occupation')
const nameElement = document.querySelector('.profile__user-name')
const jobElement = document.querySelector('.profile__user-occupation')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')

const createCardElement = (name, link) => {
  const cardTemplate = document.querySelector('#card').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = name
  cardElement.querySelector('.card__image').src = link
  cardElement.querySelector('.card__image').alt = name
  return cardElement
}

const addCards = (append = true, ...cards) => {
  const elementSection = document.querySelector('.elements')
  cards.forEach( card => {
    if (append) elementSection.append(createCardElement(card.name, card.link))
      else elementSection.prepend(createCardElement(card.name, card.link))
  })
}

const showPopup = () => {
  popupElement.classList.add('popup_opened')
  nameInput.value = nameElement.textContent
  jobInput.value = jobElement.textContent
}

const closePopup = () => popupElement.classList.remove('popup_opened')

const handleFormSubmit = (evt) => {
  evt.preventDefault()
  nameElement.textContent = nameInput.value
  jobElement.textContent = jobInput.value
  closePopup()
}

addCards(true, ...initialCards)
formElement.addEventListener('submit', handleFormSubmit)
editButton.addEventListener('click', showPopup)
closeButton.addEventListener('click', closePopup)
