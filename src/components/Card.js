class Card {
  constructor({name, link, id, likes, isLikedByUser, owned}, templateSelector, handleCardClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._owned = owned;
    this._isLikedByUser = isLikedByUser;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getCardTemplate() {
    return document
      .querySelector(`#${this._templateSelector}`)
      .content
      .querySelector(`.${this._templateSelector}`)
      .cloneNode(true)
  }

  _handleCardDeleteClick() {
    this._newCardElement.remove()
    this._newCardElement = null
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._isLikedByUser)
        .then((card) => {
          this._isLikedByUser = !this._isLikedByUser
          this._likes = card.likes
          this._likesNumberElement.textContent = this._likes.length
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this._isLikedByUser ?
            this._likeButton.classList.add('card__like-button_active') :
            this._likeButton.classList.remove('card__like-button_active')
        })
    })
    this._deleteButton.addEventListener('click', () => this._handleCardDeleteClick())
    this._cardImage.addEventListener('click', this._handleCardClick)
  }

  renderCardElement() {
    this._newCardElement = this._getCardTemplate()
  //  this._newCardElement.id = this._id
    this._cardImage = this._newCardElement.querySelector('.card__image')
    this._likeButton = this._newCardElement.querySelector('.card__like-button')
    this._deleteButton = this._newCardElement.querySelector('.card__trash-button')
    this._likesNumberElement = this._newCardElement.querySelector('.card__like-number')

    if (this._isLikedByUser) this._likeButton.classList.add('card__like-button_active')
    if (!this._owned) this._deleteButton.remove()

    this._newCardElement.querySelector('.card__title').textContent = this._name
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._likesNumberElement.textContent = this._likes.length

    this._setListeners()
    return this._newCardElement
  }

}

export default Card;
