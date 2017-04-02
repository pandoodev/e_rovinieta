import React, { Component } from 'react';
import { View, Text, Picker, Alert, AsyncStorage, ScrollView } from 'react-native';
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
		userType: '', profileID: '', vehicleNo: '', chasisNo: '', startDate: '1', loading: true, country: 1, nrDays: 95, error: '', countries: [], isOpen: false,
		selectedItem: 'Dashboard',
	};
	constructor(props) {
		super(props)
		this.state = { date: this.getCurerntDate() }
	}

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
					//	console.log(response.data);
				}
				if (response.data.success === 0) {
					//	console.log("unsuccess");
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
					self.setState({ error: '', loading: false });
				}
				if (response.data.success === 0) {
					console.log("unsuccess from getCountries");
				}
			});

	}


	getCurerntDate() {
		let currentDate = new Date();
		let date = dateFormat(currentDate, "dd-mm-yyyy").toString();

		return date;
	}

	componentWillMount() {
		this.setState({ startDate: this.getCurerntDate(), country: "1", nrDays: "95", error: "" });
		this.getCountries();
		this.getProfileID();
		//this.getValabilities();
		//this.getPrices();
		///	console.log("add to cart");

		//console.log(this.props.responseData);

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
	renderButton() {
		if (this.state.loading) {
			return <Spinner size='small' />;
		}

		return (
			//	<Button onPress = {this.onButtonPress.bind(this)}> 
			<Button onPress={this.addToCartButton.bind(this)}>
				Adaugă în coș
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
				token: this.props.responseData.user.token
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {

					self.setState({ profileID: response.data.profiles[0]['id'] });


				}
				if (response.data.success === 0) {
					console.log("unsuccess while getting profile id");
					console.log(response.data);
				}
			});
	}




	addToCartButton() {
		this.setState({ loading: true });

		if (this.checkIfNotEmpty() == 1) {
			this.validateRovignette(
				this.props.responseData.user.token,
				this.state.profileID,
				this.props.categoryID,
				this.state.nrDays,
				this.state.startDate,
				this.state.vehicleNo,
				this.state.chasisNo,
				this.state.country);
		}
		else {
			this.setState({ loading: false });
			Alert.alert(
				'Eroare',
				this.checkIfNotEmpty(),
				[
					{ text: 'OK', onPress: () => { } },
				],
				{ cancelable: false }
			)

		}
	}


	checkIfNotEmpty() {
		//Vehicle number validation
		if (this.state.vehicleNo === undefined
			|| this.state.vehicleNo == ""
		) {
			return "Vă rugăm să introduceți numărul de înmatriculare al vehiculului !";

		}

		//Chasis number validation
		if (this.state.chasisNo === undefined
			|| this.state.chasisNo == ""

		) {
			return "Vă rugăm să introduceți numărul șasiului vehiculului !";
		}


		return 1;

	}

	validateRovignette(argToken, argProfileID, argCategoryID, argPriceID,
		argStartDate, argVehicleNo, argChasisNo, argVehicleCountry) {

		let rovignetteInfo = [
			{
				'token': this.props.responseData.user.token,
				'tag': 'initiate',
				'device': 'android',
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
		var self = this;
		var aux = rovignetteInfo;

		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify(
				rovignetteInfo[0]),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}

		).then(function (response) {

			if (response.data.success) {


				self.appendIfNotEmpty(inCartRovignetteKey, rovignetteInfo);
				return 1;

			}

			if (response.data.success === 0) {
				self.setState({ loading: false });
				if (response.data.errors != undefined && response.data.errors != '') {
					if (response.data.errors[0] != undefined && response.data.errors[0] != '') {
						self.message('Eroare', response.data.errors[0]);
						return 0;
					}
				}

				if (response.data.error_msg != undefined && response.data.error_msg != '') {
					self.message('Eroare', response.data.error_msg);
				}
				else {
					console.log(response.data);
					self.message('Eroare', 'Vă rugăm să verificați corectitudinea datelor introduse.');
				}
				return 0;

			}

		});
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
			//	console.log('The object has been added to storage:');
				//console.log(objData);
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
			var itemsInCart = AsyncStorage.getItem(inCartRovignetteKey);
			if (itemsInCart !== null) {
				itemsInCart.then(function (value) {
					if (value != null || value != undefined) {
						var itemsInCartJson = JSON.parse(value);

						if (itemsInCartJson.length >= 9) {
							console.log(itemsInCartJson.length + "can't add more than 8 items to cart");
							self.message("Atenție", "Nu pot fi adăugate mai mult de 8 roviniete în coș!")
							self.setState({ loading: false });
						}
						else {
							itemsInCartJson.push(newItem[0]);
							self._addToStorage(STORAGE_KEY_ARG, JSON.stringify(itemsInCartJson))
							self.setState({ loading: false });

						}


					}
					else {
						self._addToStorage(STORAGE_KEY_ARG, JSON.stringify(newItem))
						self.setState({ loading: false });

					}

				});
			}
		} catch (error) {

			console.log(error);

		}

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
					<ScrollView >

						<Card >
							<CardSection >
								<Input
									placeholder="SM79BET"
									label="Număr înm:"
									value={this.state.vehicleNo}
									onChangeText={vehicleNo => this.setState({ vehicleNo })}
								/>
							</CardSection>
							<CardSection >
								<Input
									placeholder="WAULC68E92A140677"
									label="Serie șasiu:"
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
								<Text style={styles.textStyle} > Țara: </Text>
								{this.renderCountries()}

							</CardSection>
							<CardSection>
								<Text style={styles.textStyle}> Valabilitate: </Text>
								<Picker
									style={styles.pickerStyle}
									selectedValue={this.state.nrDays}
									onValueChange={(days) => this.setState({ nrDays: days })}>
									<Picker.Item label="1 zi - 7 EUR" value="76" />
									<Picker.Item label="7 zile - 20 EUR" value="59" />
									<Picker.Item label="30 zile - 91 EUR" value="63" />
									<Picker.Item label="90 zile - 210 EUR" value="61" />
									<Picker.Item label="12 luni - 320 EUR" value="62" />

								</Picker>
							</CardSection>

							<CardSection>
								{this.renderButton()}
							</CardSection>
						</Card>
					</ScrollView >

					{/*!!!Content end!!! */}
				</View>
				<MenuButton onPress={() => this.toggle()} />

			</SideMenu>
			// !!!Side menu end!!!

		)
	}
};
const inCartRovignetteKey = '@inCartRovignetteKey:key';
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
		color: 'black',


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