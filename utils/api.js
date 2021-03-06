import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../constants/app'

export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((result) => {
			return result === null ? {} : JSON.parse(result)
		})
	
}

export function getDeck(id) {
	return getDecks()
		.then(decks => {
			if(decks.hasOwnProperty(id)) {
				return decks[id]
			}
			return false
		})
}

export function addDeck(title) {

	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function addCardToDeck(title, card) {
	
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => JSON.parse(results))
		.then((decks) => {
			decks[title].questions.push(card)
			return JSON.stringify(decks)
		})
		.then((data) => {
			return AsyncStorage.setItem(DECK_STORAGE_KEY, data)
		})

}


// helpers

