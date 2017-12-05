import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Deck from './Deck'
import Button from './Button'

class DeckDetails extends Component {
	static navigationOptions = ({navigation}) => {
		const {deck} = navigation.state.params

		return {
			title: deck.title
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

		const {navigation} = this.props
		const {deck} = navigation.state.params

		return (
			<View>
				<View>
					<Deck deck={deck} />
				</View>
				<View>
					<Button onPress={this.addQuestionHandler(deck)}>
						<Text>Add Question</Text>
					</Button>
					<Button onPress={this.startQuizHandler(deck)}>
						<Text>Start Quiz</Text>
					</Button>
				</View>
			</View>
		)
	}	
}

export default DeckDetails