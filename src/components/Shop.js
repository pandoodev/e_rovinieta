import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import MyCars from './MyCars';
import Cart from './Cart';
import History from './History';
class Shop extends Component {

	state = { selected: 'categories', };
	displayModule() {
		console.log("Dashboard header:");
		console.log(this.props.infoClientLogin);
		console.log("Dashboard header:");
		switch (this.state.selected) {
			case 'categories':
				return (<MyCars infoClientLogin={this.props.infoClientLogin} />);
			case 'cart':
				return (<Cart />);
			case 'history':
				return (<History />);
		}
	}
	render() {
		return (
			<View>
				<View style={styles.containerStyle}>
					<View style={styles.headerStyle}>
						<TouchableOpacity
							onPress={() => { this.setState({ selected: 'categories', }) }}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../assets/categories.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle} > Categorii </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => { this.setState({ selected: 'cart' }) }}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../assets/cart.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Cos cumparaturi </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => { this.setState({ selected: 'history' }) }}

							style={styles.buttonStyle}>
							<View >
								<Image
									source={require('../../assets/history.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Istoric comenzi </Text>
						</TouchableOpacity>
					</View>
				</View>
				{this.displayModule()}
			</View>

		);
	}
};

const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	}
	,
	headerStyle: {
		flex: 1,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 55,
	},
	imgStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 35,
		resizeMode: 'contain',
	},
	textStyle: {
		marginBottom: 15,
	}
};

export default Shop;
