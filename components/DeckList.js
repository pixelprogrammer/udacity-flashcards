import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {getDecks} from '../utils/api'
import {connect} from 'react-redux'
import {receiveDecksAction} from '../actions'
import Button from './Button'
import {white} from '../utils/colors'
import Deck from './Deck'

class DeckList extends Component {

	static navigationOptions = {
		title: 'Decks'
	}

	componentDidMount = () => {

		const {dispatch} = this.props

		getDecks()
			.then(decks => {
				dispatch(receiveDecksAction(decks))
			})
	}

	goToAddDeck = () => {
		this.props.navigation.navigate('AddDeck')
	}

	render() {

		const {decks} = this.props

		if (decks === null || Object.keys(decks).length === 0) {
			return (
				<View style={[styles.container, {flex:1}]}>
					<Text>You have no decks of cards. Add a deck now.</Text>
					<Button onPress={this.goToAddDeck}>
						Add Deck
					</Button>
				</View>
			)
		}

		return (
			<ScrollView style={{flex: 1}}>
				{Object.keys(decks).map(deck => {
					return (
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('DeckDetails', {key: deck})}
							key={"deck-list-view" + deck}
						>
							<Deck 
								deck={decks[deck]}
							/>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		)
	}	
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	}
})

function mapStateToProps(decks) {
	return {
		decks,
	}
}

export default connect(mapStateToProps)(DeckList)