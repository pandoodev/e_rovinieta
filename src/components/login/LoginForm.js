import React, { Component } from 'react';
import { View, Text, Navigaor, Image, Alert, AppState, AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../common';
import axios from 'axios';
import querystring from 'query-string';
import md5 from "react-native-md5";
import { Actions } from 'react-native-router-flux';
import Header from '../common/Header';
import PushController from "./PushController";
var PushNotification = require('react-native-push-notification');

class LoginForm extends Component {

	state = { username: '', password: '', error: '', loading: false, loggedIn: false };

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
				loginData.then(function(value) {
						if(value != null || value != undefined)
						{
							var loginDataFromStorage = JSON.parse(value);
							Actions.main({ responseData: loginDataFromStorage });
						}
					});
			}
		} catch (error) {
		}
	}
	componentWillMount(){
		this.checkIfUserIsLoged();
	}
	constructor(props) {
		super(props);
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 5,
		};
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.addEventListener('change', this.handleAppStateChange);

	}

	handleAppStateChange(appState) {

		if (appState === 'background') {
			PushNotification.localNotificationSchedule({
				message: "My Notification Message", // (required)
				date: new Date(Date.now() + (5 * 1000)) 
			});
		}

	}

	onButtonPress() {

		const { username, password } = this.state;

		let hashedPass = md5.hex_md5("123");
		var self = this;
		this.setState({ error: '', loading: true });
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'login',
				device: 'android',
				password: hashedPass,
				username: "dorinbujor"
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				console.log(response);

				if (response.data.success) {
					self._addToStorage(STORAGE_KEY,JSON.stringify(response.data));
					self.onLoginSuccess(response);
					self.setState({ loggedIn: true });

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
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
		</Button>
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

		Actions.main({ responseData: response.data });

	}

	render() {

		//this.getPrice();


		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',




			}}>
				<Image source={require('../../../assets/login.jpg')}
					style={styles.backgroundImage}>



					<View style={styles.logInStyle}>
						<Card >
							<View style={styles.containerStyle} >
								<Input
									placeholder="utilizator"
									label="Utilizator:"
									value={this.state.username}
									onChangeText={username => this.setState({ username })}
								/>
							</View>

							<View style={styles.containerStyle} >
								<Input
									secureTextEntry
									placeholder="parola"
									label="Parola:"
									value={this.state.password}
									onChangeText={password => this.setState({ password })}
								/>
							</View>

						</Card>
						<Text>
							{"\n\n"}

						</Text>
						<View style={styles.containerStyle} >

							{this.renderButton()}
						</View>
						<Text>
							{"\n\n\n\n\n\n\n\n"}

						</Text>
					</View>
				</Image>
				<PushController />
			</View>
		);
	}

}




const STORAGE_KEY = '@LgInfStore:key';
const styles = {
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative'
	},

	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	logInStyle: {
		flex: 1,
		justifyContent: 'center',

	},
	backgroundImage: {

		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover'
	}

};
export default LoginForm;