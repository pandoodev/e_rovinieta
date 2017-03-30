import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity} from 'react-native';
//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../common/Menu');
import MenuButton from '../../common/MenuButton';
import Header from '../../common/Header';

//!menu!!

class AccountSettings extends Component {
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


	state = { selected: '', cart: false, history: false,isOpen: false,
    selectedItem: 'Dashboard',};

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
		  <Header headerText={'Setari Cont'} />


			<View style={styles.containerStyle}>
				<View style={styles.buttonStyle} >
					<Text style={styles.textStyle} >Setari Cont</Text>
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
		paddingTop: -5,
		marginBottom: 15,


	}
};

export default AccountSettings;
