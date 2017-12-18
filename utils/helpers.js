import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'
import {NOTIFICATION_KEY} from '../constants/app'
import {getDecks} from './api'

export function calculateScore(score, total) {
	return Math.round((score/total)*100)
}

export function createNotificationInfo() {
	return {
		title: "Study You Lazy Bum",
		body: "Put that beer down it's time to study",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			vibrate: true,
		}
	}
}

export function setNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted') {
							return getDecks()
						}

						return null
					})
					.then((decks) => {
						Notifications.cancelAllScheduledNotificationsAsync()

						// check if there are any existing decks
						// if not then there is no need to bother the user
						// with notifications
						if(decks === null || decks.length === 0) {
							return
						}

						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate() + 1)
						tomorrow.setHours(19)
						tomorrow.setMinutes(0)

						Notifications.scheduleLocalNotificationAsync(
							createNotificationInfo(),
							{
								time: tomorrow,
								repeat: 'day',
							}
						)

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					})
			}
		})
}

export function clearNotifications() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).
		then(Notifications.cancelAllScheduledNotificationsAsync)
}
