import {ADD_DECK, ADD_CARD, RECEIVE_DECKS} from '../constants/decks'

export function addDeckAction(title) {
	return {
		type: ADD_DECK,
		title,
	}
}

export function receiveDecksAction(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}