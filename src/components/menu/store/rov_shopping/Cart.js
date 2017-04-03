import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, AsyncStorage, Linking, Alert, ScrollView, Dimensions } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../../../common';
import axios from 'axios';
import querystring from 'query-string';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native';



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
			var itemsInCart = AsyncStorage.getItem(inCartRovignetteKey);
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


	deleteElementFromCart(elementPosition) {
		var currentItemsInCart = this.state.itemsInCart;
		currentItemsInCart.splice(elementPosition, 1);
		this.setState({ itemsInCart: currentItemsInCart });
		this._removeStorage(inCartRovignetteKey);
		this._addToStorage(inCartRovignetteKey, JSON.stringify(currentItemsInCart));

	}
	delelteButton() {
		this.deleteItems();
		this.message('Succes', 'Elementele au fost eliminate din cos.');
	}


	//Removes stored cart items from AsyncStorage
	deleteItems() {
		this._removeStorage(inCartRovignetteKey);
		this.setState({ itemsInCart: "" });
		this.setState({ loading: false });
	}


	//Called when buy items from cart button is pressed
	buyItemsButton() {

		this.prepareData(this.state.itemsInCart);
		//console.log("Items in cart state variable");

		//console.log(this.state.itemsInCart);

	}


	prepareData(obj) {
		var preparedRovignettes = [];
		var userInformation = [];
		var self = this;


		console.log("Unprepared rovignetes")
		console.log(obj);
		console.log("Unprepared rovignetes")


		for (var i = 0; i < this.state.itemsInCart.length; i++) {

			preparedRovignettes[i]=
				{
					'categoryID': obj[i]['categoryID'],
					'priceID': obj[i]['priceID'],
					'startDate': obj[i]['startDate'],
					'vehicleNo': obj[i]['vehicleNo'],
					'chasisNo': obj[i]['chasisNo'],
					'vehicleCountry': obj[i]['vehicleCountry']
				};
		}
		if (userInformation === undefined || userInformation.length == 0) {
			userInformation[0] = 'emission';
			userInformation[1] = obj[0]['token'];
			userInformation[2] = obj[0]['device'];
			userInformation[3] = obj[0]['profileID'];

		}
		
		this.generateInvoice(preparedRovignettes, userInformation);

	}

	stringifyPreparedRovignettes(tag,token,device,profileID,preparedRovignettes)
	{

		result = "";

		result += "tag=" + tag + 
		"&token="+token + 
		"&device="+device + 
		"&profileID="+profileID;

		for(x in preparedRovignettes)
		{
			for(y in preparedRovignettes[x])
			{
				result += "&" + y + "=" + preparedRovignettes[x][y];
			}
		}

		return result;
	}

	generateInvoice(preparedRovignettes, userInformation) {
		url = 'http://e-rovinieta.ctrlf5.ro/ro/apps/payment';
		//url2 = "https://secure.payu.ro/order/lu.php";
		console.log('ready to generate invoice with');
		console.log( preparedRovignettes);

		
		parameters = "tag=emission&token=xGeYMO3sGXXOyJAgVwbwB7dLaif7pOIY&device=android&profileID=39955&cart%5B1%5D%5BcategoryID%5D=1&cart%5B1%5D%5BpriceID%5D=1&cart%5B1%5D%5BstartDate%5D=03-04-2017&cart%5B1%5D%5BvehicleNo%5D=GJ31ATM&cart%5B1%5D%5BchasisNo%5D=gwwfwqdfqw&cart%5B1%5D%5BvehicleCountry%5D=1";
		stringifyResult = this.stringifyPreparedRovignettes(userInformation[0],
		userInformation[1],
		userInformation[2],
		userInformation[3],
		preparedRovignettes);


		stringifyResult = querystring.stringify({
		 		tag: userInformation[0],
		 		token: userInformation[1],
		 		device: userInformation[2],
				profileID: userInformation[3],
		 		cart:preparedRovignettes});


		console.log("parameters:");
		console.log(querystring.stringify({

			cart:preparedRovignettes

		}));
		console.log("parameters:");
		
				

		console.log("parameters:");
		console.log(parameters);
		console.log("parameters:");
		
		console.log("stringifyPreparedRovignettes");
		console.log(stringifyResult);
		console.log("stringifyPreparedRovignettes");

		cart = preparedRovignettes;
		// console.log(querystring.stringify({
		// 		tag: userInformation[0],
		// 		token: userInformation[1],
		// 		device: userInformation[2],
		// 		profileID: userInformation[3],
		// 		'cart[1][categoryID]': preparedRovignettes[0].categoryID,
		// 		'cart[1][priceID]': preparedRovignettes[0].priceID,
		// 		'cart[1][startDate]': preparedRovignettes[0].startDate,
		// 		'cart[1][vehicleNo]': preparedRovignettes[0].vehicleNo,
		// 		'cart[1][chasisNo]': preparedRovignettes[0].chasisNo,
		// 		'cart[1][vehicleCountry]': preparedRovignettes[0].vehicleCountry,
		// 	}));
		axios.post(
			url,
			//url2,
			parameters,
			// querystring.stringify({
			// 	tag: userInformation[0],
			// 	token: userInformation[1],
			// 	device: userInformation[2],
			// 	profileID: userInformation[3],
			// //	preparedRovignettes

			// }),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}

		).then(function (response) {
			//console.log(response.data);

			

			// setTimeout(function(){
				
			// myURL = "https://secure.payu.ro/order/lu.php";
			// Linking.openURL(myURL).catch(err => console.error('An error occurred', err));


			// }, 1000);

		}).catch(function (error) {
			console.log(error);
		});

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
		return (

			
			<View style={styles.pageContainerStyle}>
				<ScrollView >

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
								Adaugă rovinieta
	  </Button>

						</View>
						<View style={styles.buttonStyle}>
							<Button onPress={this.buyItemsButton.bind(this)}>
								Plasează Comanda
		  </Button>
						</View>
					</View>
				</ScrollView >

		
			</View>
		
		

		);

	}
	render() {
		return (

			this.waitForData()

		);
	}


};
const window = Dimensions.get('window');
// AsyncStorage key to in cart rovignetts
const inCartRovignetteKey = '@inCartRovignetteKey:key';
const styles = {

	pageContainerStyle: {
		height: window.height * 0.7,
	},
	elementStyle: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
	},
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginLeft: 10,
		marginRight: 10,
	}
	, buttonContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',

	}
	,
	buttonStyle: {
		flex: 1,

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
		resizeMode: 'contain',
	},
	deleteItemButtonContainerStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		width: 5,
	},
	textStyle: {
		color: 'black',
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,

	},
	nrCrtStyle: {
		color: 'black',
		flex: 0.65,
		justifyContent: 'center',
		alignItems: 'center',
		width: 10,

	},
	emptyCartContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
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