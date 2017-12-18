import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {orange, white} from '../utils/colors'

export default function Button ({children, onPress, style={}}) {

	return (
		<TouchableOpacity onPress={onPress} style={[styles.default, style]}>
			<Text style={{color: white}}>{children}</Text>		
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	default: {
		backgroundColor: orange,
		padding: 20,
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
		width: 300,
	}
})