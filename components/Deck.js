import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {white} from '../utils/colors'

class Deck extends Component {
	
	render() {

		const {deck} = this.props
		const cardsText = deck.questions.length === 1 ? 'card' : 'cards'

		return (
			<View style={styles.card}>
				<Text>{deck.title}</Text>
				<Text>This deck has {deck.questions.length} {cardsText}</Text>
			</View>
		)
	}	
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: white,
		borderColor: '#efefef',
		borderWidth: 1,
		marginHorizontal: 10,
		marginVertical: 20,
		padding: 20,

	}
})
export default Deck