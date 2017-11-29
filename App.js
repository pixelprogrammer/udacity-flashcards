import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import {orange} from './utils/colors'
function FCStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{flex: 1}}>
					<FCStatusBar backgroundColor={orange} barStyle="light-content" />
					<View style={styles.container}>
						<Text>Hello</Text>
					</View>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Platform.OS === 'ios' ? '#efefef' : '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
