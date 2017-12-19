import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import {NavigationActions} from 'react-navigation'
import commonStyles from '../styles/common'
import Button from './Button'
import {addDeck, getDeck} from '../utils/api'
import {addDeckAction} from '../actions'
import {connect} from 'react-redux'

class AddDeck extends Component {
	static navigationOptions = {
		title: 'Add New Deck'
	}
	state = {
		text: "",
		err: "",
	}

	updateText = (text) => {
		this.setState({text})
	}

	resetText = () => {
		this.setState({text: ""})
	}

	submitDeck = () => {
		const {text} = this.state
		const {dispatch} = this.props
		const self = this
		getDeck(text)
			.then(deck => {
				if( deck === false) {
					addDeck(text)
						.then(() => {
							dispatch(addDeckAction(text))
							// lets redo the stack navigation history
							// We don't want the user to go back to the add new Deck view
							// Just the deck list view which is the more natural view to go back to

							const resetNav = NavigationActions.reset({
								index: 1,
								actions: [
									NavigationActions.navigate({routeName: 'Home'}),
									NavigationActions.navigate({routeName: 'DeckDetails', params: {
										key: text
									}})
								]
							})
							self.props.navigation.dispatch(resetNav)
							self.resetText()
						})
						.catch(err => {
							self.setState({
								err
							})
						})

					return
				}

				self.setState({
					err: "Deck Already exists",
				})
				
			})
		

	}

	render() {

		const {err, text} = this.state

		return (
			<View style={commonStyles.container}>
				<View>
					{ err
						? <Text style={commonStyles.error}>{err}</Text>
						: null
					}
					<Text style={{marginBottom: 20}}>Add a new Deck by giving it a name below:</Text>
					<TextInput
						onChangeText={this.updateText}
						value={text}
						style={commonStyles.textField}
					/>
					<Button onPress={this.submitDeck}>Add Deck</Button>
				</View>
			</View>
		)
	}	
}

export default connect()(AddDeck)