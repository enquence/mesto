showPopup = () => {
  document.querySelector('.popup').classList.add('popup_opened')
  document.querySelector('.form__field_type_name').value = document.querySelector('.profile__user-name').textContent
  document.querySelector('.form__field_type_occupation').value = document.querySelector('.profile__user-occupation').textContent
}

closePopup = () => document.querySelector('.popup').classList.remove('popup_opened')

document.querySelector('.profile__edit-button').addEventListener('click', showPopup)
document.querySelector('.popup__close-button').addEventListener('click', closePopup)
