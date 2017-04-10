import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Spinner } from '../../../common';

import axios from 'axios';
import querystring from 'query-string';
import Moment from 'moment'

class History extends Component {

	state = { selected: '', history: '', loading: true };

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			history: ''
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
				
				if (response.data.success) {

					response.data.orders.sort(function (a, b) {
						var keyA = Moment(a.startDate),
							keyB = Moment(b.startDate);
						// Compare the 2 dates
						if (keyA < keyB) return 1;
						if (keyA > keyB) return -1;
						return 0;
					});

					self.setState({ history: response.data.orders });
					self.setState({ loading: false });
				}
				if (response.data.success === 0) {
					console.log("unsuccess while getting orders");

					console.log(response.data);
				}
			});
	}
	setPageHeight = function (options) {
		return {

			height: 250+ this.state.history.length *30
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
			console.table(this.state.history);

			return (
				<View style={this.setPageHeight()}>
					<ScrollView >

						<View style={styles.containerStyle}>
							<Text style={styles.nrCrtHeaderStyle}>Nr.</Text>
							<Text style={styles.autonrHeaderStyle}>Nr. auto</Text>
							<Text style={styles.textHeaderStyle}>Valabil până la</Text>
						</View>

						{this.state.history.map(function (o, i) {
							return (

								<View key={i} style={styles.itemContainerStyle}>
									<Text style={styles.nrCrtStyle} key={0}> {i + 1}.</Text>
									<Text style={styles.autonrStyle} key={1}>{o.vehicleNo}</Text>
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
	    paddingTop: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
	}
	,
	 itemContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
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


	autonrStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 30,
		paddingTop: 6,

		borderColor: '#bbb',
		borderWidth: 1,

	},
	textStyle: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 30,
		paddingTop: 6,
		borderColor: '#bbb',
		borderWidth: 1,
	},
	nrCrtStyle: {
		flex: 1,

		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 5,
		color: 'black',
		height: 30,
		paddingTop: 6,
		borderColor: '#bbb',
		borderWidth: 1,

	}, elementStyle: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
	},
  autonrHeaderStyle: {
    flex: 3,
    paddingTop: 3,
     backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    color: 'white',
    height: 30,
    fontSize: 16,
  },
  textHeaderStyle: {
    flex: 5,
    paddingTop: 3,
     backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    color: 'white',
    height: 30,
    fontSize: 16,


  },
  nrCrtHeaderStyle: {
    flex: 1,
    paddingTop: 3,
     backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    color: 'white',
    height: 30,
    fontSize: 16,

  },
};

export default History;
