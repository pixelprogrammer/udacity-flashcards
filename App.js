import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import reducer from './reducers'
import {orange, white} from './utils/colors'
import DeckList from './components/DeckList'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

function FCStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
	
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Deck List',
			tabBarIcon: ({ tintColor }) => <FontAwesome name='ios-speedometer' size={30} color={tintColor} />
		}
	},
	AddDeck: {
		screen: AddDeck
	}
	}, {
		navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? orange : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : orange,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1
		}
	}
})

const MainNav = StackNavigator({
	Home: {
		screen: Tabs,
	},
	AddCard: {
		screen: AddCard
	}

})

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <FCStatusBar backgroundColor={orange} barStyle="light-content" />
                    <MainNav />
                </View>
            </Provider>
        );
    }
}

