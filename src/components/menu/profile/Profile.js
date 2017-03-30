import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Spinner } from '../../common';
import axios from 'axios';
import querystring from 'query-string';
//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../common/Menu');
import MenuButton from '../../common/MenuButton';
import Header from '../../common/Header';

//!menu!!
class Profile extends Component {

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

	state = { selected: '', cart: false, history: false, loading: true, profiles: [] };
	constructor(props) {
		super(props)
		this.state = { profile: [], loading: true }
	}
	renderProfiles() {
		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		}
		return (<View style={{ marginTop: window.height * 0.01 }}>

			{this.state.profiles.map(function (o, i) {

				if (o.type == "0") {
					return <View key={i} style={styles.containerStyle}><Text style={styles.textStyle} key={0}>{i + 1}. {o.companyName}</Text><Text style={styles.textStyle} key={1}>Persoană juridică</Text></View>
				} else {
					return <View key={i} style={styles.containerStyle}><Text style={styles.textStyle} key={0}>{i + 1}. {o.lastName} {o.firstName}</Text><Text style={styles.textStyle} key={1}>Persoană fizică</Text></View>
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
				token: this.props.responseData.user.token
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {
					self.state.profiles = response.data.profiles;
					self.setState({ loading: false });
				}
				if (response.data.success === 0) {
					console.log("Failed ");
				}
			});

	}
	componentWillMount() {
		this.getProfiles();
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
					<Header headerText={'Profilele Mele'} />
					<View>
						{this.renderProfiles()}
					</View>
					{/*!!!Content end!!! */}
				</View>
				<MenuButton onPress={() => this.toggle()} />
			</SideMenu>
			// !!!Side menu end!!!
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
	textStyle: {
		color: 'black',
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    height: 20,
    borderWidth:1,
    paddingLeft: 5,

	}
};

export default Profile;