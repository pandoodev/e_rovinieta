import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, AsyncStorage, Linking, Alert } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../../../common';
import axios from 'axios';
import querystring from 'query-string';


class Cart extends Component {

	state = { selected: '', cart: false, history: false, itemsInCart: '' };

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
			console.log('Saved selection to disk: ' + objData);
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	// END Storage Methods

	componentWillMount() {
		this.addCartItemsToState();
	}

	constructor(props) {
		super(props);
		this.state = {
			itemsInCart: null,
			loading: true,
		};
	}

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

	waitForData() {



		if (this.state.loading) {
			return <Spinner size='small' />;
		}

		return (
			this.showItemsToUser()

		
		
		);

	}


	showItemsToUser() {

		if (this.state.itemsInCart.length == 0)
			return (<View style={{marginTop:80}} ><Text > Cosul este gol.</Text></View>);


		return (<View>
			<View style={styles.containerStyle}>
				<Text style={styles.nrCrtStyle}>Nr.</Text>
				<Text style={styles.textStyle}>Nr. înmatriculare</Text>
				<Text style={styles.textStyle}>Incepe la</Text>
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
				<View style={{height: 80,marginTop:30}}>
			<Button onPress={this.buyItems.bind(this)}>
				Cumpara Produse
		</Button>
		<Button onPress={this.delelteButton.bind(this)}>
				Goleste Cosul
		</Button>
		</View>
		</View>
		);

	}

delelteButton(){
	this.deleteItems();
					
			Alert.alert(
				'Succes',
				'Elementele au fost eliminate din cos.',

				[

					{ text: 'OK', onPress: () => { } },
				],
				{ cancelable: false }
			)
}
deleteItems(){
this._removeStorage(inCartRovignette);
this.setState({ itemsInCart: "" });
this.setState({ loading: false });
}

buyItems() {
	let url= "http://www.e-rovinieta.ro";
	var self=this;
	
// 		var self = this;
// for(var i=0; i<this.state.itemsInCart.length; i++)
// {
// 	this.buy(this.state.itemsInCart[i]);
// }

// 		// console.log(argToken+"argToken");
		// console.log(argProfileID+"argProfileID");
		// console.log(argCategoryID+"argCategoryID");
		// console.log(argPriceID+"argPriceID");
		// console.log(argStartDate+"argStartDate");
		// console.log(argVehicleNo+"argVehicleNo");
		// console.log(argChasisNo+"argChasisNo");
		// console.log(argVehicleCountry+"argVehicleCountry");
Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
	self.deleteItems();

	}
buy(obj){
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
	,
	buttonStyle: {
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
