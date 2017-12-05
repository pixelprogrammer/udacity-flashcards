import {StyleSheet} from 'react-native'
import {white, error} from '../utils/colors'

export default StyleSheet.create({
	container: {
		flex:1,
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: "center",
	},
	textField: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: white,
		borderColor: '#999999',
		borderBottomWidth: 2,
		maxWidth: 300,
	},
	error: {
		backgroundColor: error,
		paddingVertical: 10,
		paddingHorizontal: 20,
		color: white,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 24,
	}
})