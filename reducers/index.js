import {ADD_DECK, ADD_CARD, RECEIVE_DECKS} from '../constants/decks'

function decks(state={}, action) {
	switch(action.type) {
		case ADD_DECK:
			return {
				...state,
				[action.title]: {
					title: action.title,
					questions: [],
				}
			}
		case RECEIVE_DECKS:
			return action.decks
		default:
			return state
	}
}

export default decks