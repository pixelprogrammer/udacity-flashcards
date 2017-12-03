import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../constants/app'

export async function getDecks() {
	return await AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((result) => {
			return result === null ? {} : JSON.parse(result)
		})
	
}

export function getDeck(id) {
	const decks = getDecks()

	if(decks.hasOwnProperty(id)) {
		return decks[id]
	}

	return false
}

export async function addDeck(title) {

	return await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function addCardToDeck(title, card) {

}


// helpers

