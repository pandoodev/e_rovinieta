const React = require('react');
const SideMenu = require('react-native-side-menu');
const Menu = require('./src/components/common/Menu');
import { Keyboard,AsyncStorage } from 'react-native';
import StoreType from './src/components/menu/store/StoreType';
import AddToCart from './src/components/menu/store/rov_shopping/AddToCart';
import AccountSettings from './src/components/menu/accountsettings/AccountSettings';
import  Cars from './src/components/menu/mycars/Cars';
import  Profile from './src/components/menu/profile/Profile';
import  MenuButton from './src/components/common/MenuButton';
import { Actions } from 'react-native-router-flux';
const {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;
import Header from './src/components/common/Header';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 15,
    padding: 10,

  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
}
});


class Basic extends Component {
  state = {
    isOpen: false,
    selectedItem: 'Dashboard',
  };

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

  displayMainScreen(selectedItem){

    	switch(selectedItem){
		  case 'shop':
			return(
        <View style={{flex:1 }}>
       <Header headerText="Magazin"/>
       <StoreType infoClientLogin={this.props.responseData.user}/>
       </View>
       );
			case 'profiles':
			return( 
           <View style={{flex:1}}>
       <Header headerText="Profilurile Mele"/>
       <Profile  infoClientLogin={this.props.responseData.user.token}/>
       </View>
       
       );
			case 'cars':
			return( 
       
      <View style={{flex:1}}>
       <Header headerText="Masinile mele"/>
       <Cars  infoClientLogin={this.props.responseData.user.token} />
       </View>
      
      );
      case 'accountsettings':
			return( 
       <View style={{flex:1}}>
       <Header headerText="Setari Cont"/>
       <AccountSettings />
       </View>
      );
      case 'logout':
      this._logoutUser();
			return;
      default:
      return(
         <View style={{flex:1 }}>
       <Header headerText="Magazin"/>
       <StoreType infoClientLogin={this.props.responseData.user}/>
       </View>
      );
		}
  }
  _logoutUser = async () => {
		try {
			await AsyncStorage.removeItem('@LgInfStore:key');
			//console.log('Selection removed from disk.');
      Actions.auth();
		} catch (error) {
			//console.log('AsyncStorage error: ' + error.message);
		}
	};
  render() {
Keyboard.dismiss();
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    //console.log(this.props.responseData.user.token);
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>       
        
          {this.displayMainScreen(this.state.selectedItem)}
        </View>
        <MenuButton style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
        </MenuButton>
      </SideMenu>
    );
  }
};
export default Basic;