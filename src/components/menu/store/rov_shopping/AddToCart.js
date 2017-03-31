import React, { Component } from 'react';
import { View, Text, Picker, Alert, AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../../../common';
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');
import Header from '../../../common/Header';
import axios from 'axios';
import querystring from 'query-string';
import { Actions } from 'react-native-router-flux';


//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../../common/Menu');
import MenuButton from '../../../common/MenuButton';
//menu

class AddtoCart extends Component {
	state = {
		userType: '', profileID: '', vehicleNo: '', chasisNo: '', startDate: '1', loading: true, country: 1, priceID: 95, error: '', countries: [], pricesAndValabilities: [], isOpen: false,
		selectedItem: 'Dashboard',
	};
	constructor(props) {
		super(props)
		this.state = { date: this.getCurerntDate() }
	}



	// Start side-menu functions
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	updateMenuState(isOpen) {
		this.setState({ isOpen, });
	}

	onMenuItemSelected = (item) => {
		this.setState({
			isOpen: false,
			selectedItem: item,
		});
	}
	// !!!End side-menu functions!!!


	getValabilities() {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'valabilities',
				device: 'android'
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {

					var valabilities = [];
					response.data.valabilities.forEach(function (valability) {
						valabilities.push(valability);
					}, this);

					console.log("valabilities");
					console.log(valabilities);
					console.log("valabilities");

					axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
						querystring.stringify({
							tag: 'prices',
							device: 'android'
						}), {
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							}
						}).then(function (response) {
							if (response.data.success) {
								console.log("Prices:");
								console.log(response.data);

								var valabilitiesWithPrices = [];

								for (x in valabilities) {
									valab = valabilities[x];
									for (idx in response.data.prices) {
										var element = response.data.prices[idx];

										if (element.valability_id == valab.id) {
											valabilityElement = new Object();
											valabilityElement.priceID = element.id;
											valabilityElement.description = valab.description + " - " + element.value + " " + element.currency;
											valabilitiesWithPrices.push(valabilityElement);
											break;
										}
									}
								}

								console.log(valabilitiesWithPrices);

								self.state.pricesAndValabilities = valabilitiesWithPrices;
								self.setState({ error: '', loading: false });

							}
							if (response.data.success === 0) {
								console.log("unsuccess");
							}
						});

				}
				if (response.data.success === 0) {
					console.log("unsuccess");
				}
			});

	}

	getPrices() {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'prices',
				device: 'android'
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {
					console.log("Prices:");
					console.log(response.data);


					for (i = 0; i <= 7; ++i) {
						for (idx in response.data.prices) {
							var element = response.data.prices[idx];

							if (element.valability_id == i) {
								console.log(element);
								break;
							}
						}
					}

				}
				if (response.data.success === 0) {
					console.log("unsuccess");
				}
			});

	}



	getCountries() {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'countries',
				device: 'android'
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {
					var arrCountries = [];
					response.data.countries.forEach(function (countrieInfo) {
						arrCountries.push(countrieInfo['name']);
					}, this);
					self.state.countries = arrCountries;
					//self.setState({ error: '', loading: false });
				}
				if (response.data.success === 0) {
					console.log("unsuccess");
				}
			});

	}
	getCurerntDate() {
		let currentDate = new Date();
		let date = dateFormat(currentDate, "dd-mm-yyyy").toString();

		return date;
	}

	componentWillMount() {
		this.setState({ startDate: this.getCurerntDate(), country: "1", priceID: "95", error: "" });
		this.getCountries();
		this.getProfileID();
		//this.getValabilities();
		//this.getPrices();
		// console.log("add to cart");

		// console.log(this.props.responseData);

	}
	renderCountries() {
		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		}
		return (
			<Picker
				style={styles.pickerStyle}
				selectedValue={this.state.country}
				onValueChange={(loc) => this.setState({ country: loc })}>
				{this.state.countries.map(function (o, i) {

					return <Picker.Item value={i} label={o} key={i} />
				})}</Picker>
		);
	}

	renderValabilitiesAndPrices() {

		console.log("prices");
		console.log(this.state.pricesAndValabilities);
		console.log("prices");

		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		} else {

			console.log("prices");
			this.state.pricesAndValabilities.forEach(function (element) {
				console.log(element);
			}, this)
			console.log("prices");

		}
		return (
			<Picker
				style={styles.pickerStyle}
				selectedValue={this.state.priceID}
				onValueChange={(days) => this.setState({ priceID: days })}>

				return <Picker.Item value="aa" label="ceva"
					key="ggg" />


				{/*{
					
					this.state.pricesAndValabilities.forEach(function (element) {

					return <Picker.Item value={"aa"} label={"ceva"}
						key={"ggg"} />

				}, this)
*/}

				}
			</Picker>
		);
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size='small' />;
		}

		return (
			//	<Button onPress = {this.onButtonPress.bind(this)}> 
			<Button onPress={this.buyRovignette.bind(this)}>
				Adauga In Cos
		</Button>
		);

	}

	redirectToCart() {
		Actions.shop({ responseData: this.props.responseData, componentToDisplay: 'cart' })

	}
	getProfileID() {
		console.log("this.props.responseData")
		var self = this;
		console.log(this.props.responseData)
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'profile',
				device: 'android',
				token: this.props.responseData.token
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {

					self.setState({ profileID: response.data.profiles[0]['id'] });

					// console.log(response.data.profiles[0]['id']);
					// console.log(response.data.profiles[0]['type']);
					// console.log(response.data.profiles[0]['firstName']);
					// console.log(response.data.profiles[0]['lastName']);
					// console.log(response.data.profiles[0]['personalID']);
				}
				if (response.data.success === 0) {
					response.data.error_msg;
					//	console.log("unsuccess");
				}
			});
	}


	getOrderHistory() {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'orders',
				device: 'android',
				token: this.props.responseData.user.token
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {
				}
				if (response.data.success === 0) {
					response.data.error_msg;
					//	console.log("unsuccess");
				}
			});
	}
	buyRovignette() {

		if (this.validateInputs() == 1) {
			this.addRovignetteToCart(this.props.responseData.user.token,
				this.state.profileID,
				this.props.categoryID,
				this.state.priceID,
				this.state.startDate,
				this.state.vehicleNo,
				this.state.chasisNo,
				this.state.country);
		}
		else {

			Alert.alert(
				'Eroare',
				this.validateInputs(),
				[

					{ text: 'OK', onPress: () => { } },
				],
				{ cancelable: false }
			)
		}
	}

	isNumeric(character) {
		if (character >= '0' && character <= '9') {
			return true;
		}

		return false;
	}

	validateInputs() {
		//Vehicle number validation
		if (this.state.vehicleNo === undefined
			|| this.state.vehicleNo == ""
			|| (this.state.vehicleNo.length != 7 && this.state.vehicleNo.length != 6)
		) {
			console.log("first validation");
			return "Numarul de inmatriculare nu este valid !";

		}

		if (this.state.vehicleNo.length == 6) {
			if (this.isNumeric(this.state.vehicleNo.charAt(0)) ||
				!this.isNumeric(this.state.vehicleNo.charAt(1)) ||
				!this.isNumeric(this.state.vehicleNo.charAt(2)) ||
				this.isNumeric(this.state.vehicleNo.charAt(3)) ||
				this.isNumeric(this.state.vehicleNo.charAt(4)) ||
				this.isNumeric(this.state.vehicleNo.charAt(5))) {
				console.log("second validation");
				return "Numarul de inmatriculare nu este valid !";
			}
		}
		else {
			if (this.isNumeric(this.state.vehicleNo.charAt(0)) ||
				this.isNumeric(this.state.vehicleNo.charAt(1)) ||
				!this.isNumeric(this.state.vehicleNo.charAt(2)) ||
				!this.isNumeric(this.state.vehicleNo.charAt(3)) ||
				this.isNumeric(this.state.vehicleNo.charAt(4)) ||
				this.isNumeric(this.state.vehicleNo.charAt(5)) ||
				this.isNumeric(this.state.vehicleNo.charAt(6))) {

				console.log("third validation");
				return "Numarul de inmatriculare nu este valid !";
			}
		}

		//Chasis number validation
		if (this.state.chasisNo === undefined
			|| this.state.chasisNo == ""
			|| this.state.chasisNo.length != 17
			|| this.state.chasisNo.indexOf("Q") >= 0
			|| this.state.chasisNo.indexOf("O") >= 0
			|| this.state.chasisNo.indexOf("I") >= 0
		) {
			return "Numarul sasiului nu este valid! Acesta trebuie sa contina 17 caractere si sa nu contina literele Q, I sau O";
		}
		return 1;

	}


	// START Storage Methods
	_removeStorage = async (STORAGE_KEY_ARG) => {
		try {
			await AsyncStorage.removeItem(STORAGE_KEY_ARG);
			console.log('Selection removed from disk.');
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	_addToStorage = async (STORAGE_KEY_ARG, objData) => {
		var self = this;
		try {
			var x = await AsyncStorage.setItem(STORAGE_KEY_ARG, objData).then((token) => {

				self.redirectToCart();
			});




		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
	// END Storage Methods
	appendIfNotEmpty(STORAGE_KEY_ARG, newItem) {
		var self = this;
		try {
			var itemsInCart = AsyncStorage.getItem(inCartRovignette);
			if (itemsInCart !== null) {
				itemsInCart.then(function (value) {
					if (value != null || value != undefined) {
						var itemsInCartJson = JSON.parse(value);


						itemsInCartJson.push(newItem[0]);
						console.log("appending");

						self._addToStorage(STORAGE_KEY_ARG, JSON.stringify(itemsInCartJson))


					}
					else {


						self._addToStorage(STORAGE_KEY_ARG, JSON.stringify(newItem))
					}

				});
			}
		} catch (error) {

			console.log(error);

		}

	}
 
	addRovignetteToCart(argToken, argProfileID, argCategoryID, argPriceID,
		argStartDate, argVehicleNo, argChasisNo, argVehicleCountry) {
		var self = this;




		let rovignetteInfo = [
			{
				'token': argToken,
				'profileID': argProfileID,
				'categoryID': argCategoryID,
				'priceID': argPriceID,
				'startDate': argStartDate,
				'vehicleNo': argVehicleNo,
				'chasisNo': argChasisNo,
				'vehicleCountry': argVehicleCountry
			}
		];

		self.appendIfNotEmpty(inCartRovignette, rovignetteInfo);
	}

	render() {
		//menu
		const menu = <Menu onItemSelected={this.onMenuItemSelected} currentItem={this.state.selectedItem} responseData={this.props.responseData} />;
		//!!menu!!

		return (
			// Side menu start
			<SideMenu
				menu={menu}
				isOpen={this.state.isOpen}
				onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<View style={{
					flex: 1,
					backgroundColor: '#FFFFFF',
				}}>
					{/*Content start */}
					<Header headerText={"Categoria " + this.props.category} />

					<Card >
						<CardSection >
							<Input
								placeholder="SM79BET"
								label="Numar Inm:"
								value={this.state.vehicleNo}
								onChangeText={vehicleNo => this.setState({ vehicleNo })}
							/>
						</CardSection>
						<CardSection >
							<Input
								placeholder="WAULC68E92A140677"
								label="Serie Sasiu:"
								value={this.state.chasisNo}
								onChangeText={chasisNo => this.setState({ chasisNo })}
							/>
						</CardSection>
						<CardSection >
							<Text style={styles.textStyle}> De la: </Text>
							<DatePicker
								style={{ width: 200 }}
								date={this.state.date}
								mode="date"
								format="DD-MM-YYYY"
								minDate={this.getCurerntDate()}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
								}}
								onDateChange={(date) => { this.setState({ startDate: date }) }}
							/>
						</CardSection>

						<CardSection>
							<Text style={styles.textStyle} > Tara: </Text>
							{this.renderCountries()}

						</CardSection>
						<CardSection>
							<Text style={styles.textStyle}> Valabilitate: </Text>
							<Picker
								style={styles.pickerStyle}
								selectedValue={this.state.priceID}
								onValueChange={(days) => this.setState({ priceID: days })}>


								<Picker.Item label="1 zi - 7 EUR" value="76" />
								<Picker.Item label="7 zile - 20 EUR" value="59" />
								<Picker.Item label="30 zile - 91 EUR" value="63" />
								<Picker.Item label="90 zile - 210 EUR" value="61" />
								<Picker.Item label="12 luni - 320 EUR" value="62" />
								{/*{this.renderValabilitiesAndPrices()}*/}
							</Picker>
						</CardSection>

						<CardSection>
							{this.renderButton()}
						</CardSection>
					</Card>

					{/*!!!Content end!!! */}
				</View>
				<MenuButton onPress={() => this.toggle()} />

			</SideMenu>
			// !!!Side menu end!!!

		)
	}
};
const inCartRovignette = '@inCartRovignette:key';
const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 80,
		marginLeft: 10,
		marginRight: 10,
	}
	,
	pickerStyle: {
		width: 200,

	},
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
		flex: 1,
		paddingTop: 10,
		fontSize: 18,
		marginBottom: 15,
		marginLeft: 15,


	},
	errorTextStyle: {
		flex: 1,
		fontSize: 20,
		justifyContent: 'center',
		color: 'red',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
	}
};

export default AddtoCart;