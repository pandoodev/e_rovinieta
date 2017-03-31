import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, AsyncStorage, Linking, Alert, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../../../common';
import axios from 'axios';
import querystring from 'query-string';
import { Actions } from 'react-native-router-flux';


class Cart extends Component {

	state = { selected: '', cart: false, history: false, itemsInCart: '' };

	//Display pop-up message to the user
	message(title, content) {
		Alert.alert(
			title,
			content,
			[
				{ text: 'OK', onPress: () => { } },
			],

			{ cancelable: false }
		)
	}

	// START Storage Methods
	//Remove an element from storage
	_removeStorage = async (STORAGE_KEY_ARG) => {
		try {
			await AsyncStorage.removeItem(STORAGE_KEY_ARG);
			//console.log('Selection removed from disk.');
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	//Add new element to storage
	_addToStorage = async (STORAGE_KEY_ARG, objData) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY_ARG, objData);
			console.log('Saved selection to disk: ' + objData);
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	// END Storage Methods




	componentWillMount() {
		this.addCartItemsToState();
	}

	//initiate state items with constructor
	constructor(props) {
		super(props);
		this.state = {
			itemsInCart: null,
			loading: true,
		};
	}

	//Getting data from AsyncStorage into state variable
	addCartItemsToState() {
		var self = this;
		try {
			var itemsInCart = AsyncStorage.getItem(inCartRovignette);
			if (itemsInCart !== null) {
				itemsInCart.then(function (value) {
					if (value != null || value != undefined) {
						var itemsInCartJson = JSON.parse(value);
						self.setState({ itemsInCart: itemsInCartJson });
						self.setState({ loading: false });
					}
					else {
						self.setState({ itemsInCart: '' });
						self.setState({ loading: false });
					}
				});
			}
		} catch (error) {
			console.log(error);
			self.setState({ loading: false });
		}

	}



	//Checking if data is ready
	waitForData() {
		//In case data is not ready showing th loading spinner
		if (this.state.loading) {
			return <Spinner size='small' />;
		}

		//In case data is ready 
		return (
			this.showItemsToUser()
		);

	}

	showItemsToUser() {
		var self = this;
		//Displaying empty cart if no items in storage
		if (this.state.itemsInCart.length == 0)
			return (
				<View style={styles.emptyCartContainerStyle}>
					<View style={styles.emptyCartTextStyle} >
						<Text > Cosul este gol.</Text>

					</View>
				</View>

			);
		//Displaying items in cart stored in AsyncStorage
		return (<View>
			<View style={styles.containerStyle}>
				<Text style={styles.nrCrtStyle}>Nr.</Text>
				<Text style={styles.textStyle}>Nr. înmatriculare:</Text>
				<Text style={styles.textStyle}>  Incepe la:</Text>
				<Text style={styles.textStyle}>Sterge din Cos</Text>

			</View>

			{this.state.itemsInCart.map(function (o, i) {
				return (

					<View key={i} style={styles.elementStyle}>
						<Text style={styles.nrCrtStyle} key={0}> {i + 1}.</Text>
						<Text style={styles.textStyle} key={1}>{o.vehicleNo}</Text>
						<Text style={styles.textStyle} key={2}>{o.startDate}</Text>
						<TouchableOpacity style={styles.deleteItemButtonContainerStyle} onPress={() => { self.deleteElementFromCart(i) }} key={3}>
							<Image
								style={styles.deleteItemButtonStyle}
								source={require('../../../../../assets/delete.png')}
							/>
						</TouchableOpacity>
					</View>

				);
			})}
			<View style={styles.buttonContainerStyle}>
				<View style={styles.buttonStyle}>

					<Button onPress={this.props.changeParentState}>
						Adauga rovinieta
	  </Button>

				</View>
				<View style={styles.buttonStyle}>
					<Button onPress={this.buyItemsButton.bind(this)}>
						Plaseaza Comanda
		  </Button>
				</View>
			</View>

		</View>
		);

	}


	deleteElementFromCart(elementPosition) {
		var currentItemsInCart = this.state.itemsInCart;
		currentItemsInCart.splice(elementPosition, 1);
		this.setState({ itemsInCart: currentItemsInCart });
		this._removeStorage(inCartRovignette);
		this._addToStorage(inCartRovignette, JSON.stringify(currentItemsInCart));

	}
	delelteButton() {
		this.deleteItems();
		this.message('Succes', 'Elementele au fost eliminate din cos.');
	}


	//Removes stored cart items from AsyncStorage
	deleteItems() {
		this._removeStorage(inCartRovignette);
		this.setState({ itemsInCart: "" });
		this.setState({ loading: false });
	}


	//Called when buy items from cart button is pressed
	buyItemsButton() {
		let url = "http://www.e-rovinieta.ro";
		var self = this;

	//Opening the url in case there exists an app that can handle request
	Linking.canOpenURL(url).then(supported => {
		if (!supported) {
			console.log('Can\'t handle url: ' + url);
		} else {
			return Linking.openURL(url);
		}
	}).catch(err => console.error('An error occurred', err));
		this.deleteItems();
		//this.buy(this.state.itemsInCart);
		console.log(this.state.itemsInCart);

	}

	//Opening the url in case there exists an app that can handle request
	// Linking.canOpenURL(url).then(supported => {
	// 	if (!supported) {
	// 		console.log('Can\'t handle url: ' + url);
	// 	} else {
	// 		return Linking.openURL(url);
	// 	}
	// }).catch(err => console.error('An error occurred', err));
	//	self.deleteItems();

	generateInvoice(validRovignetes, userInformation) {
		url='http://e-rovinieta.ctrlf5.ro/ro/apps/payment';
		console.log('ready to generate invoice');
		console.log(validRovignetes);
		console.log(userInformation);
		axios.post(url,
			querystring.stringify({
				tag: userInformation[0],
				token: userInformation[1],
				device: userInformation[2],
				profileID: userInformation[3],
				cart: validRovignetes

			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}

		).then(function (response) {


			if (response.data.success) {
				console.log(response.data);
				console.log("success la invoice ");
				
			}
			if (response.data.success === 0) {
				
				console.log(response.data);
					console.log("unsuccess");

				
			}
		}).catch(function (error) {
    console.log(error);
  });
		//Opening the url in case there exists an app that can handle request
	Linking.canOpenURL(url).then(supported => {
		if (!supported) {
			console.log('Can\'t handle url: ' + url);
		} else {
			return Linking.openURL(url);
		}
	}).catch(err => console.error('An error occurred', err));
		this.deleteItems();

	}

	//Calling API to perform a new 'initiate' rovignette request
	buy(obj) {
		var validRovignetes = [];
		var userInformation = [];
		console.log("object to initiate:");
		console.log(obj);
		console.log("object to initiate:");
		
		var self = this;

		for (var i = 0; i < this.state.itemsInCart.length; i++) {
			var aux = obj[i];
			axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
				querystring.stringify(
					obj[i]),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}

			).then(function (response) {

				//	self.deleteItems();
				if (i === self.state.itemsInCart.length) {
					console.log(i);
					console.log(i);

					self.generateInvoice(validRovignetes, userInformation);
				}

				if (response.data.success) {
					console.log(response.data);
					console.log("success");
					validRovignetes.push(
						{
							'categoryID': aux['categoryID'],
							'priceID': aux['priceID'],
							'startDate': aux['startDate'],
							'vehicleNo': aux['vehicleNo'],
							'chasisNo': aux['chasisNo'],
							'vehicleCountry': aux['vehicleCountry']
						});
					if (userInformation === undefined || userInformation.length == 0) {
						userInformation[0]=	'emision';
						userInformation[1]=	aux['token'];
						userInformation[2]=	aux['device'];
						userInformation[3]=	aux['profileID'];
					
					}

					i++;

				}
				if (response.data.success === 0) {
					i++;

					console.log(response.data);

					if (response.data.error_msg === undefined) {
						console.log(response.data);
						console.log("unsuccess");


					}
				}
			});
		}
	}

	render() {
		return (

			this.waitForData()

		);
	}


};
// AsyncStorage key to in cart rovignetts
const inCartRovignette = '@inCartRovignette:key';
const styles = {
	elementStyle: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10,
	},
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 80,
		marginLeft: 10,
		marginRight: 10,
	}
	, buttonContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50

	}
	,
	buttonStyle: {
		flex: 1,
		height: 50,



	},
	deleteItemButton: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
	imgStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		resizeMode: 'contain',
	},
	deleteItemButtonContainerStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		width: 5,
		height: 23,
	},
	textStyle: {
		color: 'black',
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,

	},
	nrCrtStyle: {
		color: 'black',
		flex: 0.65,
		justifyContent: 'center',
		alignItems: 'center',
		width: 10,
		height: 60,

	},
	emptyCartContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 80,
		marginLeft: 10,
		marginRight: 10,
	}
	,
	emptyCartTextStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		elevation: 1,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
};

export default Cart;
