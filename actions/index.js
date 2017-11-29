import {ADD_DECK, ADD_CARD} from '../constants/decks'

export function addDeck(title) {
	return {
		type: ADD_DECK,
		title,
	}
}