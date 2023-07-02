const popupElement = document.querySelector('.popup')
const formElement = document.querySelector('.form')
const nameInput = document.querySelector('.form__field_type_name')
const jobInput = document.querySelector('.form__field_type_occupation')
const nameElement = document.querySelector('.profile__user-name')
const jobElement = document.querySelector('.profile__user-occupation')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')

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

formElement.addEventListener('submit', handleFormSubmit)
editButton.addEventListener('click', showPopup)
closeButton.addEventListener('click', closePopup)
