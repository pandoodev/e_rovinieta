import React, { Component } from 'react';
import { View, Text, Navigaor, Image, Alert, AppState, AsyncStorage, TextInput, Linking } from 'react-native';
import { LoginButton, Card, CardSection, Input, Spinner } from '../common';
import axios from 'axios';
import querystring from 'query-string';
import md5 from "react-native-md5";
import { Actions } from 'react-native-router-flux';
import Header from '../common/Header';
import PushController from "./PushController";
var PushNotification = require('react-native-push-notification');

class LoginForm extends Component {

	state = { username: '', password: '', error: '', loading: false, loggedIn: false, appState: null };

	// START Storage Methods
	_removeStorage = async (STORAGE_KEY_ARG) => {
		try {
			await AsyncStorage.removeItem(STORAGE_KEY_ARG);
			//console.log('Selection removed from disk.');
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	_addToStorage = async (STORAGE_KEY_ARG, objData) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY_ARG, objData);
			//console.log('Saved selection to disk: ' + objData);
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	// END Storage Methods
	checkIfUserIsLoged() {
		try {
			var loginData = AsyncStorage.getItem(STORAGE_KEY);
			if (loginData !== null) {
				loginData.then(function (value) {
					if (value != null || value != undefined) {
						var loginDataFromStorage = JSON.parse(value);
						Actions.main({ responseData: loginDataFromStorage });
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	}


	componentWillMount() {
		this.checkIfUserIsLoged();
		//this.notification();
	}
	constructor(props) {
		super(props);
		//this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 5,
			username: '',
			password: '',
			appState: null
		};
	}

	componentDidMount() {

		if (this.state.appState != null) {
		}
		else {
			AppState.addEventListener('change', this.handleAppStateChange);
			//	this.notification();
		}
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange = (nextAppState) => {

		this.setState({ appState: nextAppState });
		console.log("currentState");
		console.log(this.state.appState);
		console.log("currentState");

	}

	notification() {
		PushNotification.localNotificationSchedule({
			message: "Notificare expirare rovinieta",
			date: new Date(Date.now() + (5 * 1000))
		});
	}

	onButtonPress() {

		const { username, password } = this.state;

		let hashedPass = md5.hex_md5(password);
		var self = this;
		this.setState({ error: '', loading: true });
		axios.post('https://api.e-rovinieta.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'login',
				device: 'android',
				password: hashedPass,
				username: username
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				console.log(response);

				if (response.data.success) {
					self._addToStorage(STORAGE_KEY, JSON.stringify(response.data));
					self.setState({ loggedIn: true });
					self.onLoginSuccess(response);

				}
				if (response.data.success === 0) {
					self.onLoginFail(response);
				}
			});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size='small' />;
		}

		return (
			<LoginButton onPress={this.onButtonPress.bind(this)}>
				Login
			    </LoginButton>
		);

	}
	onLoginFail(response) {
		this.setState({ error: response.data.error_msg, loading: false });
		Alert.alert(
			'Eroare',
			'Utilizator sau parola gresita',
			[
				{ text: 'OK', onPress: () => { } },
			],
			{ cancelable: false }
		)
	}

		onLoginSuccess(response) {

		this.setState({
			username: '',
			password: '',
			loading: false,
			error: ''
		});

		console.log("Push-notification setup started!");
		PushNotification.configure({
			onNotification:

			function (notification) {

				var loginData = AsyncStorage.getItem(STORAGE_KEY);
				if (loginData !== null) {
					loginData.then(function (value) {
						if (value != null || value != undefined) {
							var loginDataFromStorage = JSON.parse(value);


							PushNotification.localNotificationSchedule({
								message: notification['gcm.notification.body'],
								date: new Date(Date.now())
							});
						}
					});
				}
			},
			// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			senderID: "145264640175",

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},

			onRegister: function(token) {
				console.log( 'TOKEN:', token );

				//TODO: replace the post url to the provided api
				// axios.post('http://coiot.xyz/test.php',
				// 	querystring.stringify({
				// 		token_firebase: token.token,
				// 	}), {
				// 		headers: {
				// 			"Content-Type": "application/x-www-form-urlencoded"
				// 		}
				// 	}).then(function (response) {
				// 		console.log("response");
				// 		console.log(response);
				// 		console.log("response");
				// 	});
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 */
			requestPermissions: true,

		});

		Actions.main({ responseData: response.data });

	}

	render() {

		//this.getPrice();


		return (

			<View style={styles.container}>
				<View style={styles.headerStyle}>
					<Image source={require('../../../assets/erovinieta_red.png')} />
				</View>
				<View style={styles.loginStyle}>
					<View style={styles.insideStyle}>
						<TextInput
							placeholder="utilizator"
							autoCorrect={false}
							style={styles.inputStyle}
							value={this.state.username}
							onChangeText={username => this.setState({ username })}
						/>
					</View>
					<View style={styles.insideStyle}>
						<TextInput
							secureTextEntry
							placeholder="parola"
							autoCorrect={false}
							style={styles.inputStyle}
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</View>
					<View style={styles.insideStyle} >

						{this.renderButton()}
					</View>
				</View>
				<View style={styles.footerStyle}>
					<View style={styles.insideStyle} >
						<Text
							style={{ color: '#337ab7' }}
							onPress={() => Linking.openURL('https://www.e-rovinieta.ro/ro/contnou')}
						>
							Crează cont</Text>
					</View>

					<View style={styles.insideStyle} >
						<Text
							style={{ color: '#337ab7', paddingBottom: 10 }}
							onPress={() => Linking.openURL('https://www.e-rovinieta.ro/ro/reset')}
						>Resetare parolă</Text>
					</View>
				</View>
			</View>
		);
	}

}




const STORAGE_KEY = '@LgInfStore:key';
const styles = {
	inputStyle: {
		flex: 1,
		textAlign: 'center',
		height: 40,
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
	},
	loginStyle: {
		flex: .5,
		justifyContent: 'center',
	},
	footerStyle: {
		flex: .3,
		alignSelf: 'center',
		justifyContent: 'flex-end',
		paddingBottom:15
		
	},
	headerStyle: {
		flex: .25,
		justifyContent: 'flex-end',
		alignSelf: 'center',
	},
	insideStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative',
		alignSelf: 'center',
	}

};
export default LoginForm;

