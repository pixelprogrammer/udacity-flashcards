import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../constants/app'

export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			return results === null ? results : JSON.parse(results)
		})
}

export function getDeck(id) {

}

export function saveDeckTitle(title) {
	let decks = getDecks()

	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function addCardToDeck(title, card) {

}


// helpers

