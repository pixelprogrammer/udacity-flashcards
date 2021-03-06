import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import reducer from './reducers'
import {orange, lightOrange, white} from './utils/colors'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import {setNotification} from './utils/helpers'
import { Entypo } from '@expo/vector-icons'

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
			tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
		}
	}
	}, {
		navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: white,
		inactiveTintColor: white,
		activeBackgroundColor: lightOrange,
		style: {
			height: 56,
			backgroundColor: orange,
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
	},
	DeckDetails: {
		screen: DeckDetails
	},
	Quiz: {
		screen: Quiz,
	}

})

export default class App extends React.Component {

	componentDidMount = () => {
		setNotification()
	}
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

