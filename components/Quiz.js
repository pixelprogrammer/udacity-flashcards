import React, {Component} from 'react'
import {View, Text, Animated, StyleSheet} from 'react-native'
import commonStyles from '../styles/common'
import Button from './Button'
import {calculateScore, clearNotifications, setNotification} from '../utils/helpers'

let frontInterpolate = null

class Quiz extends Component {
	static navigationOptions = ({navigation}) => {
		const {deck} = navigation.state.params

		return {
			title: "Quiz: " + deck.title
		}
	}

	state = {
		currentIndex: 0,
		showAnswer: false,
		questions: [],
		score: 0,
		flipAnimatedValue: new Animated.Value(0),
	}

	componentWillMount = () => {
		this.initializeQuiz()
		
	}
	componentWillUnmount = () => {
		const {flipAnimatedValue} = this.state
		flipAnimatedValue.removeAllListeners()
	} 

	initializeQuiz = () => {
		const {questions} = this.props.navigation.state.params.deck
		const {flipAnimatedValue} = this.state
		this._flipValue = 0
		
		frontInterpolate = flipAnimatedValue.interpolate({
			inputRange: [0,90],
			outputRange: ['0deg', '90deg'],
		})

		flipAnimatedValue.addListener(({value}) => {
			this._flipValue = value
		})
		this.setState({
			showAnswer: false,
			currentIndex: 0,
			score: 0,
			questions: questions
		})
	}

	halfFlip = (callback) => {
		const {flipAnimatedValue} = this.state 
		if( this._flipValue >= 90) {
			Animated.timing(flipAnimatedValue, {
				toValue: 0,
				duration: 120,
			}).start()
		} else {
			Animated.timing(flipAnimatedValue, {
				toValue: 90,
				duration: 120,
			}).start(callback)
		}
	}

	getFrontAnimStyle() {
		return {
			transform: [
				{rotateY: frontInterpolate}
			]
		}
	}

	onCorrect = () => {
		const {score, currentIndex} = this.state
		this.revealQuestion({
			showAnswer: false,
			score: score + 1,
			currentIndex: currentIndex+1,
		})
	}

	onIncorrect = () => {
		const {currentIndex} = this.state 
		this.revealQuestion({
			showAnswer: false,
			currentIndex: currentIndex + 1
		})
	}

	revealQuestion = (newState) => {
		self = this 
		this.halfFlip(function() {
			self.setState(newState)

			self.halfFlip()
		})
	}
	revealAnswer = () => {
		self = this 
		this.halfFlip(function() {
			self.setState({
				showAnswer: true,
			})

			self.halfFlip()
		})

	}

	resetQuiz = () => {
	    clearNotifications()
	    	.then(setNotification)

		this.setState({
			showAnswer: false,
			currentIndex: 0,
			score: 0,
		})
	}

	goToDeckView = () => {
		this.props.navigation.goBack()
		this.resetQuiz()
	}

	render() {

		const {showAnswer, currentIndex, questions, score} = this.state

		if( currentIndex >= questions.length ) {
			return (
				<View style={commonStyles.container}>
					<Text style={commonStyles.title}>Quiz is done</Text>
					<Text>Here is your score:</Text>
					<Text style={[commonStyles.title, {fontSize: 56}]}>{calculateScore(score, questions.length)}%</Text>
					<Button onPress={this.goToDeckView}>
						<Text>Go Back to Deck View</Text>
					</Button>
					<Button onPress={this.resetQuiz}>
						<Text>Restart Quiz</Text>
					</Button>
				</View>
			)
		}
		const text = questions.length > 0 ? (showAnswer ? questions[currentIndex].answer : questions[currentIndex].question) : ""

		const frontAnimStyle = this.getFrontAnimStyle()

		return (
			<View style={{flex:1}}>
				<View style={{padding: 20}}>
					<Text>Card {currentIndex+1} of {questions.length}</Text>
				</View>
				<View style={commonStyles.container}>
					<Text style={commonStyles.title}>{showAnswer ? "Answer:" : "Question:"}</Text>
					
					<Animated.View style={[commonStyles.card, frontAnimStyle, {alignSelf: "stretch"}]}>
						<Text>{text}</Text>
					</Animated.View>
					{showAnswer ?
						<View>
							<Button style={commonStyles.successBtn} onPress={this.onCorrect}>
								<Text style={{color: "#fff"}}>Correct</Text>
							</Button>
							<Button style={commonStyles.errBtn} onPress={this.onIncorrect}>
								<Text style={{color: "#000"}}>Incorrect</Text>
							</Button>
						</View>
					:
						<View>
							<Button onPress={this.revealAnswer}><Text>Show Answer</Text></Button>
						</View>
					}
				</View>
			</View>
		)
	}	
}

export default Quiz