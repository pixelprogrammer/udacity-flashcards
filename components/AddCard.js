import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import commonStyles from '../styles/common'
import Button from './Button'
import {addCardToDeck, getDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addCardToDeckAction} from '../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
	static navigationOptions = {
		title: 'Add New Card'
	}
	state = {
		questionText: "",
		answerText: "",
		err: ""
	}

	updateQuestionText = (text) => {
		this.setState({
			questionText: text,
		})
	}

	updateAnswerText = (text) => {
		this.setState({
			answerText: text,
		})
	}

	reset = () => {
		this.setState({
			questionText: "",
			answerText: "",
			err: "",
		})
	}

	addCardHandler = (title) => {
		const {questionText, answerText} = this.state
		const {dispatch} = this.props
		const self = this


		return function() {
			const card = {question: questionText, answer: answerText}

			addCardToDeck(title, card)
			.then(() => {
				return getDeck(title)
			})
			.then(deck => {
				console.log('Deck before dispatch', deck)
				self.props.navigation.dispatch(NavigationActions.back({DeckDetails: {deck}}))
				dispatch(addCardToDeckAction(title, card))

				self.reset()
			})
			.catch((err) => {
				console.log(err)
				self.setState({
					err
				})
			})
		}
	}

	render() {

		const {err, question, answer} = this.state
		const {deckId} = this.props.navigation.state.params

		return (
			<View style={commonStyles.container}>
				<View>
					{ err
						? <Text style={commonStyles.error}>{err}</Text>
						: null
					}
					<Text style={commonStyles.title}>Question:</Text>
					<TextInput
						onChangeText={this.updateQuestionText}
						value={question}
						style={commonStyles.textField}
					/>
					<Text style={commonStyles.title}>Answer:</Text>
					<TextInput
						onChangeText={this.updateAnswerText}
						value={answer}
						style={commonStyles.textField}
					/>
					<Button style={{marginTop: 20}}onPress={this.addCardHandler(deckId)}>Add Card</Button>
				</View>
			</View>
		)
	}	
}

export default connect()(AddCard)