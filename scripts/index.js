import Card from './cards.js'
import initialCards from './cards-data.js'
import { setPopupListeners, setFormSubmitListeners } from './utils.js'

const cardTemplateSelector = 'card'

const addCards = (...cardsData) => {
  const elementSection = document.querySelector('.elements')
  cardsData.forEach( cardData => {
    const card = new Card(cardData, cardTemplateSelector)
    elementSection.prepend(card.getCardElement())
  })
}

addCards(...initialCards.reverse());
setPopupListeners()
setFormSubmitListeners()

export { addCards };
