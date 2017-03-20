import React, {Component}from 'react';
import { View, Image, Text, TouchableOpacity, Picker } from 'react-native';
import { Button, Card, CardSection, Input , Spinner} from './common';
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');
import Header from './common/Header';
import axios from 'axios';
import querystring from 'query-string';



class BuyRov extends  Component {
	state = { vehicleNo: '', chasisNo: '', startDate: '', loading:true, country:'Romania', nrDays:"", countries: null };
	constructor(props){
		super(props)
		this.state = {date: this.getCurerntDate()}
	}
	
	
	componentWillMount(){
		
		console.log("componentWillMount");
		this.getCountries();
		this.getPrice();
		console.log("componentWillMount");
		
	}
	
	getPrice(){
		console.log("--getPrice--");
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
		querystring.stringify({
			tag: 'prices',
			device: 'android'
		}), {
			headers: { 
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function(response) {
			if (response.data.success)
			{
				response.data.prices.forEach(function(priceInfo) {
					console.log("****");
					console.log( priceInfo['id'] );
					console.log( priceInfo['currency'] );
					console.log( priceInfo['valability_id'] );
					console.log( priceInfo['vehicle_id'] );
					console.log( priceInfo['active'] );
					console.log("****");					
				}, this);
				
			}
			if(response.data.success===0)
			{
				console.log("unsuccess");
			}
		});
	}
	
	getCountries(){
		
		var self = this;
		
		var serv;
		console.log("--getCountries--");
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
		querystring.stringify({
			tag: 'countries',
			device: 'android'
		}), {
			headers: { 
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function(response) {


			if (response.data.success)
			{


								
				self.setState({error:'', loading:false, countries: response.data.countries});
				console.log(self.state.countries);

			}
			if(response.data.success===0)
			{
				console.log("unsuccess");
			}
		});

	}
	
	getCurerntDate(){
		let currentDate=new Date();
		let date=dateFormat(currentDate, "dd-mm-yyyy").toString();
		
		return date;
	}
	renderCountries() {
			/*if(this.state.loading)
			{
				return <Spinner size='small' />;
			}
			var textCountries = "";
			console.log(this.state.countries);
			
			this.state.countries.forEach(function(countrieInfo) {
					console.log( countrieInfo['id'] );
					console.log( countrieInfo['code'] );
					console.log( countrieInfo['name'] );
					textCountries+="<Picker.Item label=\"" + 	 countrieInfo['name'] + "\" value=\"" + 		 countrieInfo['id'] +"\" /></Picker>\n";				
				}, this);		
			return (
				<Picker
				style={styles.pickerStyle}
				selectedValue={this.state.counrDaysntry}
				onValueChange={(days) => this.setState({nrDays: days})}>
				{textCountries}
				
				</Picker>
				);*/

		}

	render(){
		
		
		return (
		
		<View>
		
		<Header headerText="Introduceti Datele" />
		<Card >
		<CardSection >
		<Input
		placeholder= "SM79BET"
		label= "Numar Inm."
		value= {this.state.vehicleNo}
		onChangeText= {vehicleNo => this.setState({vehicleNo})}
		/>
		</CardSection>
		<CardSection >
		<Input
		placeholder= "WAULC68E92A140677"
		label= "Serie Sasiu"
		value= {this.state.chasisNo}
		onChangeText= {chasisNo => this.setState({chasisNo})}
		/>
		</CardSection>
		<CardSection >
		
		<DatePicker
		style={{width: 200}}
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
			// ... You can check the source to find the other keys.
		}}
		onDateChange={(date) => {this.setState({startDate: date})}}
		/>
		</CardSection>
		
		<CardSection>
	
		
		<Picker
		style={styles.pickerStyle}
		selectedValue={this.state.country}
		onValueChange={(loc) => this.setState({country: loc})}>

		<Picker.Item label="ROMANIA" value="1" />
		<Picker.Item label="Austria" value="17" />			 
		
		
		</Picker>
	
		
		</CardSection>
		<CardSection>
			

				<Picker
				style={styles.pickerStyle}
				selectedValue={this.state.counrDaysntry}
				onValueChange={(days) => this.setState({nrDays: days})}>
			
						<Picker.Item label="7 zile - 3 EUR" value="95" />
						<Picker.Item label="30 zile - 7 EUR" value="96" />

				</Picker>

		</CardSection>
		<CardSection>
		<Button onPress = {this.addToCart.bind(this)}> 
			Adauga in cos
				</Button>
		</CardSection>
		</Card>
		</View>
		
		
		
		
		
		)
	}
};

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
	pickerStyle:{
		width: 200,   
		
	},  
	buttonStyle:{
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
	imgStyle:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50, 
		height: 50,
		resizeMode: 'contain',
	},
	textStyle:{
		paddingTop: -5,
		marginBottom: 15,
		
		
	}
};

export default BuyRov;
