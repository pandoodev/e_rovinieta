import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import CarCategories from './CarCategories';
import Header from '../../../common/Header';
import Cart from './Cart';
import History from './History';
//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../../common/Menu');
import MenuButton from '../../../common/MenuButton';
//menu
class RovignetteShopMain extends Component {

	state = { selected: 'categories', };
	displayModule() {
		console.log("Dashboard header:");
		console.log(this.props.infoClientLogin);
		console.log("Dashboard header:");
		switch (this.state.selected) {
			case 'categories':
				return (<CarCategories infoClientLogin={this.props.infoClientLogin} />);
			case 'cart':
				return (<Cart />);
			case 'history':
				return (<History />);
		}
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




	render() {

		  //menu
    const menu = <Menu onItemSelected={this.onMenuItemSelected} currentItem={this.state.selectedItem} />;
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
			<View>
				<View style={styles.containerStyle}>
					<View style={styles.headerStyle}>
					

					<TouchableOpacity
							onPress={() => { this.setState({ selected: 'categories' }) }}
							style={styles.buttonStyle}>

							<View >
								<Text > {'\n'}</Text>
								<Image
									source={require('../../../../../assets/categories.png')} style={styles.imgStyle} />
							</View>

							<Text style={styles.textStyle}>Categorii  {'\n'}</Text>
						</TouchableOpacity>

					<TouchableOpacity
							onPress={() => { this.setState({ selected: 'cart' }) }}
							style={styles.buttonStyle}>

							<View >
								<Text > {'\n'}</Text>
								<Image
									source={require('../../../../../assets/cart.png')} style={styles.imgStyle} />
							</View>

							<Text style={styles.textStyle}>Cos Cumparaturi  {'\n'}</Text>
						</TouchableOpacity>


						<TouchableOpacity
							onPress={() => { this.setState({ selected: 'history' }) }}

							style={styles.buttonStyle}>
							<View >
								<Text > {'\n'}</Text>
								<Image
									source={require('../../../../../assets/history.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Istoric comenzi  {'\n'}</Text>
							
						</TouchableOpacity>
							
					</View>
				</View>
				<Text > {'\n'}</Text>
				{this.displayModule()}
			</View>
			          {/*!!!Content end!!! */}
          <MenuButton onPress={() => this.toggle()} />
        </View>
      </SideMenu>
      // !!!Side menu end!!!

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
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 15,
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
		height: 70,
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

export default RovignetteShopMain;
