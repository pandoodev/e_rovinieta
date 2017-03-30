//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../common/Menu');
import MenuButton from '../../common/MenuButton';
//!menu!!
import Header from '../../common/Header';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Dashboard extends Component {
  state = {
    isOpen: false,
    selectedItem: 'Dashboard',
  };

componentWillMount(){

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
          
          <Header headerText={'Prima Pagina'} />
          
          <View style={styles.containerRov}>

              <TouchableOpacity
                onPress={() => { Actions.shop({ responseData: this.props.responseData, location: 'rovignette' }); }}
                style={styles.buttonStyle}>
                <View>
                  {/*<Image
                    source={require('../../../../assets/erovinieta_red.png')} style={styles.imgStyle} />*/}
                </View>
                <Text style={styles.welcomeText}> Cumpara rovinieta</Text>

              </TouchableOpacity>
          </View>
        
          {/*!!!Content end!!! */}
        </View>
         <MenuButton onPress={() => this.toggle()} />
      </SideMenu>
      // !!!Side menu end!!!
    );
  }
}

const styles = {
  containerRov: {
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    flex: 0.5,
    borderBottomWidth: 2.5,
  },
  containerBridge: {
    justifyContent: 'center',
    flex: 0.5,
    borderTopWidth: 2.5,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
    
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
};

export default Dashboard;
