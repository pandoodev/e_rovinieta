import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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

	state = { selected: 'categories', componentToDisplay:''};
	displayModule() {
	
		switch (this.state.selected) {
			case 'categories':
				return (<CarCategories responseData={this.props.responseData}  />);
			case 'cart':
				return (<Cart responseData={this.props.responseData} changeParentState={this.changeStateFromCart.bind(this)} />);
			case 'history':
				return (<History responseData={this.props.responseData} />);
		}
	}
componentWillMount(){
	if(this.props.componentToDisplay!=undefined){
	 this.setState({selected: this.props.componentToDisplay});
	}
	if(this.state.componentToDisplay!=''){
	 this.setState({selected: this.state.componentToDisplay})
	}

}
changeStateFromCart(event) {
    this.setState({selected: 'categories'})
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
    const menu = <Menu onItemSelected={this.onMenuItemSelected} currentItem={this.state.selectedItem}  responseData={this.props.responseData}/>;
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
					 <Header headerText={'Plasează Comanda'} />
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

							<Text style={styles.textStyle}>Coș   {'\n'}</Text>
						</TouchableOpacity>


						<TouchableOpacity
							onPress={() => { this.setState({ selected: 'history' }) }}

							style={styles.buttonStyle}>
							<View >
								<Text > {'\n'}</Text>
								<Image
									source={require('../../../../../assets/history.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Istoric  {'\n'}</Text>
							
						</TouchableOpacity>

					</View>
				</View>
				<Text > {'\n'}</Text>
									<ScrollView >
				
				{this.displayModule()}
											</ScrollView >
				
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
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		
	}
	,
	headerStyle: {
		height:window.height*0.13,
		
		flex: 1,
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
		marginTop:15
	},
	imgStyle: {
		
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
		resizeMode: 'contain',
	},
	textStyle: {

		marginBottom: 15,
	marginLeft:7
		
	}
};

export default RovignetteShopMain;
