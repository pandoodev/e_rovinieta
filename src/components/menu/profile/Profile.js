import React, {Component}from 'react';
import { View, Button, Image, Text, TouchableOpacity,Dimensions } from 'react-native';
import { Spinner } from '../../common';
import axios from 'axios';
import querystring from 'query-string';

class Profile extends  Component {

	state = { selected:'', cart:false, history:false, loading: true, profiles: [] };
    constructor(props) {
		super(props)
		this.state = { profile: [], loading: true }
	}
    renderProfiles(){
		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		}
		return (<View style={{marginTop: window.height*0.01}}>
			 	 
			{this.state.profiles.map(function (o, i) {

			if(o.type=="0"){
               return <View  key={i} style={styles.containerStyle}><Text style={styles.textStyle} key={0}>{i+1}. {o.companyName}</Text><Text style={styles.textStyle} key={1}>Persoană juridică</Text></View>
			}else{
               return <View  key={i} style={styles.containerStyle}><Text style={styles.textStyle} key={0}>{i+1}. {o.lastName} {o.firstName}</Text><Text style={styles.textStyle} key={1}>Persoană fizică</Text></View>
			}

					
				})}
				</View>);
	}
	getProfiles() {
			var self = this;
			console.log("--getProfiles--");
			axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
				querystring.stringify({
					tag: 'profile',
					device: 'android',
					token: this.props.responseData
				}), {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}).then(function (response) {
					if (response.data.success) {
						self.state.profiles = response.data.profiles;
						self.setState({loading: false });
					}
					if (response.data.success === 0) {
						console.log("Failed ");
					}
				});

		}
         componentWillMount() {
			 this.getProfiles();
         }
	render(){
		return (
			<View>
					{this.renderProfiles()}
			</View>
			);
	}
};
const window = Dimensions.get('window');
const styles = {
	containerStyle: {
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
	},
	textStyle:{
		color: 'black',
		 flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,


	}
};

export default Profile;