import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import commonStyles from '../styles/common'
import Button from './Button'

class AddCard extends Component {
	static navigationOptions = {
		title: 'Add New Card'
	}
	state = {
		questionText: "",
		answerText: "",
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
		})
	}

	addCard = () => {

	}

	render() {

		const {err, question, answer} = this.state

		return (
			<View style={commonStyles.container}>
				<View>
					<Text style={commonStyles.title}>This is the Add Card View</Text>
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
					<Button onPress={this.addCard}>Add Card</Button>
				</View>
			</View>
		)
	}	
}

export default AddCard