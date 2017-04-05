import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Spinner } from '../../../common';

import axios from 'axios';
import querystring from 'query-string';

class History extends Component {

	state = { selected: '',  history: '', loading: true };

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			history:''
		};

	}
	componentDidMount() {
		this.getOrderHistory();
	}
	getOrderHistory() {
		console.log("--getOrderHistory--")
		var self = this;

		
		console.log(this.props.responseData);
		

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
				self.setState({ loading: false });
				if (response.data.success) {

					console.log("before");
					console.log(response.data.orders);
					console.log("before");
					
					response.data.orders.sort(function (a, b) {
						var keyA = new Date(a.startDate),
							keyB = new Date(b.startDate);
						// Compare the 2 dates
						if (keyA < keyB) return 1;
						if (keyA > keyB) return -1;
						return 0;
					});

					console.log("after");
					console.log(response.data.orders);
					console.log("after");

					self.setState({ history: response.data.orders });
				}
				if (response.data.success === 0) {
					console.log("unsuccess while getting orders");

					console.log(response.data);
				}
			});
	}
	setPageHeight = function (options) {
		return {

			height: window.height * this.state.history.length / 19
		}
	}
	renderHistory() {
		if (this.state.loading || this.state.loading == undefined) {
			return (
				<View style={{ marginTop: 50 }} >
					<Spinner size='small' />
				</View>);
		}
		else {
			return (
			this.showOrderHistory()
			);
		}
	}

	showOrderHistory() {

		if (this.state.history.length >= 1) {
			console.log('ok');
			console.log(this.state.history);

			return (
				<View style={this.setPageHeight()}>
					<ScrollView >

						<View style={styles.containerStyle}>
							<Text style={styles.nrCrtStyle}>Nr.</Text>
							<Text style={styles.textStyle}>Nr. înmmatriculare:</Text>
							<Text style={styles.textStyle}>Valabil până la:</Text>
						</View>

						{this.state.history.map(function (o, i) {
							return (

								<View key={i} style={styles.elementStyle}>
									<Text style={styles.nrCrtStyle} key={0}> {i + 1}.</Text>
									<Text style={styles.textStyle} key={1}>{o.vehicleNo}</Text>
									<Text style={styles.textStyle} key={2}>{o.endDate}</Text>

								</View>

							);
						})}
					</ScrollView >


				</View>
			);
		}
		else {
			return (
				<View style={styles.containerStyle}>
					<View style={styles.buttonStyle} >
						<Text>Nu aveți comenzi anterioare </Text>
					</View>
				</View>
			);
		}
	}

	render() {
		return (
			<View>
				{this.renderHistory()}
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

	},
	nrCrtStyle: {
		color: 'black',
		flex: 0.65,
		justifyContent: 'center',
		alignItems: 'center',
		width: 10,

	}, elementStyle: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
	},
};

export default History;
