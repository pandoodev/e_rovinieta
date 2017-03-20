import React, {Component} from 'react';
import {View , Text, Navigaor} from 'react-native';
import { Button, Card, CardSection, Input , Spinner} from './common';
import axios from 'axios';
import querystring from 'query-string';
import md5 from "react-native-md5";
import {Actions} from 'react-native-router-flux';
import Header from './common/Header';


class LoginForm extends Component {


	state = { username: '', password: '', error: '', loading:false, loggedIn:false };

	onButtonPress(){

		const { username, password } = this.state;
		
		let hashedPass= md5.hex_md5(password);
		var self = this;
		this.setState({error:'', loading:true});
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'login',
				device: 'android',
				password: hashedPass,
				username: username
			}), {
				headers: { 
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function(response) {
				console.log(response);

				if (response.data.success)
				{
					self.onLoginSuccess(response);
					self.setState({loggedIn:true});

				}
				if(response.data.success===0)
				{
					self.onLoginFail(response);
				}
				

			});

		}
		
		renderButton() {
			if(this.state.loading)
			{
				return <Spinner size='small' />;
			}

			return (
				<Button onPress = {this.onButtonPress.bind(this)}> 
				Log In 
				</Button>
				);

		}
		onLoginFail(response){
			this.setState({error: response.data.error_msg, loading:false});

		}

		

		onLoginSuccess(response){


			this.setState({
				username:'',
				password:'',
				loading:false,
				error:''
			});

			Actions.main({responseData:response.data});

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
		
		render() {

			//this.getPrice();


			return (
				<View>
				<Header headerText="Autentificare" />
				<Card >
				<CardSection >
				<Input
				placeholder= "username"
				label= "Username"
				value= {this.state.username}
				onChangeText= {username => this.setState({username})}
				/>
				</CardSection>

				<CardSection >
				<Input
				secureTextEntry
				placeholder= "parola"
				label= "Parola"
				value= {this.state.password}
				onChangeText= {password => this.setState({password})}
				/>
				</CardSection>
				<Text style={styles.errorTextStyle}>
				{this.state.error}
				</Text>
				<CardSection>
				{this.renderButton()}
				</CardSection>
				</Card>
				</View>
				);
		}

	}



	const styles ={

		errorTextStyle:{
			fontSize:20,
			alignSelf:'center',
			color: 'red'
		}
	
	};
	export default LoginForm;