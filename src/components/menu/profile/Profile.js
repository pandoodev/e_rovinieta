import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Spinner, Button, } from '../../common';
import axios from 'axios';
import querystring from 'query-string';
import { Actions } from 'react-native-router-flux';
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

	state = { selected: '', cart: false, history: false, loading: true, profiles: [] };
	constructor(props) {
		super(props)
		this.state = { profile: [], loading: true }
	}
	renderProfiles() {
		var self = this;

		if (this.state.loading || this.state.loading == undefined) {
			return (
			
			<View  style={{ marginTop: 50}} >
			<Spinner size='small' />
			</View>
			);
		}
		return (<View style={{ marginTop: window.height * 0.01 }}>
			<View style={styles.titleContainerStyle}>
				<Text style={styles.textTitleContainerStyle}>Nume Profil:</Text>
				<Text style={styles.iconTitleContainerStyle}>Tip:</Text>
				<Text style={styles.iconTitleContainerStyle}>  Edit</Text>
				<Text style={styles.iconTitleContainerStyle}> Sterge</Text>

			</View>
			{this.state.profiles.map(function (o, i) {


				if (o.type == "0") {
					var profileType = "Jur.";
					var profileName = o.companyName;

				} else {
					var profileType = "Fiz.";
					var profileName = o.lastName + ' ' + o.firstName;

				}

				return (
					<View key={i} style={styles.containerStyle}>
						<Text style={styles.textStyle} key={0}>{i + 1}. {profileName}</Text>
						<Text style={styles.iconTitleStyle} key={1}>{profileType}</Text>

						<TouchableOpacity style={styles.iconContainerStyle} onPress={() => { self.editProfileButton(i) }} key={2}>
							<Image
								style={styles.deleteItemButtonStyle}
								source={require('../../../../assets/edit.png')}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles.iconContainerStyle} onPress={() => { self.deleteProfileButton(i) }} key={3}>
							<Image
								style={styles.deleteItemButtonStyle}
								source={require('../../../../assets/delete.png')}
							/>
						</TouchableOpacity>



					</View>);

			})}
		</View>);
	}
	addProfileButton(i) {
		console.log('add' + i);
		Actions.add_profile({ responseData: this.props.responseData, headerTitle: 'Creare Profil' });

	}
	editProfileButton(i) {
		console.log('edit' + i);
		Actions.edit_profile({ responseData: this.props.responseData, headerTitle: 'Editare Profil', profileToModify:this.state.profiles[i] });
	}
	deleteProfileButton(index) {
		// 		@tag = ‘profile_delete’
		// @device (‘android’ sau ‘ios’)
		// @token (Tokenul returnat prin metoda de login)
		// @pid - id-ul profilului
		console.log("--deleteProfileButton--");
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'profile_delete',
				device: 'android',
				token: this.props.responseData.user.token,
				pid: this.state.profiles[index].id
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {

					console.log(self.state.profiles)
					self.message('Succes', 'Profilul a fost șters din baza de date.');

					var profilesCurrent = self.state.profiles;
					profilesCurrent.splice(index, 1);
					self.setState({ itemsInCart: profilesCurrent });


					console.log(self.state.profiles)

					console.log(response.data)
				}
				if (response.data.success === 0) {
					console.log(response.data);
					if (response.data.error_msg != undefined && response.data.error_msg != '') {
						self.message('Eroare', response.data.error_msg);
					}
					else {
						self.message('Atentie', 'Eroare la stergerea profilului');
					}
				}
			});




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
					console.log(response.data)
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
					<View style={styles.buttonContainerStyle}>
						<View style={styles.buttonStyle}>
							<Button onPress={this.addProfileButton.bind(this)}>
								Adaugă Profil
	 						 </Button>
						</View>
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
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10,
	},
	titleContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 30,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
	},
	textStyle: {
		color: 'black',
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		width: 10,
		height: 20,
		paddingLeft: 5,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,
	},
	textTitleContainerStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 20,
		fontSize: 16,
		borderBottomColor: '#bbb',
		borderBottomWidth: 2,
	},
	iconTitleStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 20,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,


	},
	iconContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		height: 20,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,


	},
	iconTitleContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 20,
		fontSize: 16,
		borderBottomColor: '#bbb',
		borderBottomWidth: 2,
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
	deleteItemButtonStyle: {
		flex: 1,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
	buttonContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 30

	}
	,
	buttonStyle: {
		flex: 1,
		height: 40

	},
};

export default Profile;