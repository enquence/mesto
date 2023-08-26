class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    return document
      .querySelector(`#${this._templateSelector}`)
      .content
      .querySelector(`.${this._templateSelector}`)
      .cloneNode(true)
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like-button_active')
  }

  _handleCardDeleteClick() {
    this._newCardElement.remove()
    this._newCardElement = null
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick())
    this._deleteButton.addEventListener('click', () => this._handleCardDeleteClick())
    this._cardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}))
  }

  renderCardElement() {
    this._newCardElement = this._getCardTemplate()
    this._cardImage = this._newCardElement.querySelector('.card__image')
    this._likeButton = this._newCardElement.querySelector('.card__like-button')
    this._deleteButton = this._newCardElement.querySelector('.card__trash-button')

    this._newCardElement.querySelector('.card__title').textContent = this._name
    const cardImage = this._newCardElement.querySelector('.card__image')
    cardImage.src = this._link
    cardImage.alt = this._name

    this._setListeners()
    return this._newCardElement
  }

}

export default Card;