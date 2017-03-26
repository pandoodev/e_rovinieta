const React = require('react');
const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
import { Keyboard } from 'react-native';
import StoreType from './src/components/menu/store/StoreType';
import AddToCart from './src/components/menu/store/rov_shopping/AddToCart';
import AccountSettings from './src/components/menu/accountsettings/AccountSettings';
import  Cars from './src/components/menu/mycars/Cars';
import  Profile from './src/components/menu/profile/Profile';
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
class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
Keyboard.dismiss();
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <View>
        <Text>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

module.exports = class Basic extends Component {
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
      default:
      return(
         <View style={{flex:1 }}>
       <Header headerText="Magazin"/>
       <StoreType infoClientLogin={this.props.responseData.user}/>
       </View>
      );
		}
  }

  render() {

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
        <Button style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
        </Button>
      </SideMenu>
    );
  }
};
