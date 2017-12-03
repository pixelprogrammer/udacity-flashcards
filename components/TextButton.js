import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {orange, white} from '../utils/colors'

export default function TextButton ({children, onPress, style={}}) {

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.default, style]}>{children}</Text>		
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	default: {
		textAlign: 'center',
		color: orange,
	}
})