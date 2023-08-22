import { showPicturesPopup } from './utils.js';

class Card {
  constructor({name, link}, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    return document
      .querySelector(`#${this._templateSelector}`)
      .content
      .querySelector(`.${this._templateSelector}`)
      .cloneNode(true)
  }

  _handleLikeClick() {
    this._newCardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active')
  }

  _handleCardDeleteClick() {
    this._newCardElement.remove()
    this._newCardElement = null
  }

  _setListeners() {
    this._newCardElement.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick.bind(this))
    this._newCardElement.querySelector('.card__trash-button').addEventListener('click', this._handleCardDeleteClick.bind(this))
    this._newCardElement.querySelector('.card__image').addEventListener('click', showPicturesPopup)
  }

  getCardElement() {
    this._newCardElement = this._getCardTemplate()

    this._newCardElement.querySelector('.card__title').textContent = this._name
    const cardImage = this._newCardElement.querySelector('.card__image')
    cardImage.src = this._link
    cardImage.alt = this._name

    this._setListeners()
    return this._newCardElement
  }

}

export default Card;
