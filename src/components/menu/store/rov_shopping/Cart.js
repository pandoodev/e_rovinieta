import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, AsyncStorage, Linking, Alert } from 'react-native';
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
		console.log('cart is mounting');
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
						console.log(itemsInCartJson[0]['argToken']);
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
		//Displaying empty cart if no items in storage
		if (this.state.itemsInCart.length == 0)
			return (<View style={{ marginTop: 80 }} ><Text > Cosul este gol.</Text></View>);
		//Displaying items in cart stored in AsyncStorage
		return (<View>
			<View style={styles.containerStyle}>
				<Text style={styles.nrCrtStyle}>Nr.</Text>
				<Text style={styles.textStyle}>Nr. înmatriculare</Text>
				<Text style={styles.textStyle}>Incepe la</Text>
				<Text style={styles.textStyle}></Text>
				
			</View>

			{this.state.itemsInCart.map(function (o, i) {
				return (
					<View key={i} style={styles.elementStyle}>
						<Text style={styles.nrCrtStyle} key={0}> {i + 1}.</Text>
						<Text style={styles.textStyle} key={1}>{o.argVehicleNo}</Text>
						<Text style={styles.textStyle} key={2}>{o.argStartDate}</Text>
					</View>

				);
			})}
			<View style={styles.buttonContainerStyle}>
     <View style={styles.buttonStyle}>
   
		  <Button onPress={ this.props.changeParentState}>
	  Adauga rovienieta
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

		// 		var self = this;
		// for(var i=0; i<this.state.itemsInCart.length; i++)
		// {
		// 	this.buy(this.state.itemsInCart[i]);
		// }

		//Opening the url in case there exists an app that can handle request
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				return Linking.openURL(url);
			}
		}).catch(err => console.error('An error occurred', err));
		self.deleteItems();
	}

	//Calling API to perform a new 'initiate' rovignette request
	buy(obj) {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'initiate',
				device: 'android',
				token: obj["argToken"],
				profileID: obj["argProfileID"],
				categoryID: obj["argCategoryID"],
				priceID: obj["argPriceID"],
				startDate: obj["argStartDate"],
				vehicleNo: obj["argVehicleNo"],
				chasisNo: obj["argChasisNo"],
				vehicleCountry: obj["argVehicleCountry"]
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {

				self.deleteItems();

				console.log(response.data);

				if (response.data.success) {
					console.log(response.data);
					console.log("success");
				}
				if (response.data.success === 0) {

					console.log(response.data);
				}
				if (response.data.error_msg === undefined) {
					console.log(response.data);

				}
			});
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
		marginTop: 20,
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
		height:50,
		
		

	},
	imgStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		resizeMode: 'contain',
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

	}
};

export default Cart;
