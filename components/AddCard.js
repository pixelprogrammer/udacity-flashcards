import React, {Component} from 'react'
import {View, Text} from 'react-native'

class AddCard extends Component {
	static navigationOptions = {
		title: 'Add New Card'
	}
	
	render() {
		return (
			<View>
				<Text>This is the Add Card View</Text>
			</View>
		)
	}	
}

export default AddCard