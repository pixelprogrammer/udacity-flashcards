import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Deck from './Deck'
import Button from './Button'
import commonStyles from '../styles/common'
import {connect} from 'react-redux'

class DeckDetails extends Component {
	static navigationOptions = ({navigation}) => {
		const {key} = navigation.state.params

		return {
			title: key
		}
	}

	addQuestionHandler = (deck) => {
		const {navigation} = this.props 

		return function() {
			navigation.navigate('AddCard', {deckId: deck.title})
		}
	}

	startQuizHandler = (deck) => {
		const {navigation} = this.props 

		return function() {
			navigation.navigate('Quiz', {deck: deck})
		}
	}

	render() {

		const {navigation, decks} = this.props
		const {key} = navigation.state.params
		const deck = decks[key]

		return (
			<View style={commonStyles.container}>
				<View style={commonStyles.row}>
					<Deck deck={deck} />
				</View>
				<Button onPress={this.addQuestionHandler(deck)}>
					<Text>Add Card</Text>
				</Button>
				{deck.questions.length > 0 ?
					<Button onPress={this.startQuizHandler(deck)}>
						<Text>Start Quiz</Text>
					</Button>
					: null
				}
			</View>
		)
	}	
}

function mapStateToProps(decks) {
	return {
		decks,
	}
}
export default connect(mapStateToProps)(DeckDetails)