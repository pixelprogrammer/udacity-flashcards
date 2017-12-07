import {StyleSheet} from 'react-native'
import {white, error, success} from '../utils/colors'

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
	success: {
		backgroundColor: success,
		paddingVertical: 10,
		paddingHorizontal: 20,
		color: "#000000",
	},
	errBtn: {
		backgroundColor: error,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	successBtn: {
		backgroundColor: success,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 24,
	},
	card: {
		backgroundColor: white,
		borderColor: '#efefef',
		borderWidth: 1,
		marginHorizontal: 10,
		marginVertical: 20,
		padding: 20,

	}
})