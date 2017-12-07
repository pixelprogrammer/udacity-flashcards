import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import commonStyles from '../styles/common'
import Button from './Button'
import {addCardToDeck, getDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addCardToDeckAction} from '../actions'

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

		console.log("addCardHandler has been called....so why does it do nothing")

		return function() {
			const card = {question: questionText, answer: answerText}

			console.log("about to add a card to the deck", card)
			addCardToDeck(title, card)
			.then(() => {
				dispatch(addCardToDeckAction(title, card))
				console.log("Added card to deck:", card)
				return getDeck(title)
			})
			.then(deck => {
				console.log("does this even run?", deck)
				console.log("resetting the Add Card form fields")
				self.props.navigation.navigate('DeckDetails', {deck})
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
					<Text style={commonStyles.title}>This is the Add Card View</Text>
					{ err
						? <Text style={commonStyles.error}>{err}</Text>
						: null
					}
					<TextInput
						onChangeText={this.updateQuestionText}
						value={question}
						style={commonStyles.textField}
					/>
					<TextInput
						onChangeText={this.updateAnswerText}
						value={answer}
						style={commonStyles.textField}
					/>
					<Button onPress={this.addCardHandler(deckId)}>Add Card</Button>
				</View>
			</View>
		)
	}	
}

export default connect()(AddCard)