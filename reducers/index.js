import {ADD_DECK, ADD_CARD} from '../constants/decks'

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
		default:
			return state
	}
}

export default decks