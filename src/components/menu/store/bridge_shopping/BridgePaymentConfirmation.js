import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CarCategories from './BridgeCarCategories';
import Header from '../../../common/Header';
import Cart from './BridgeCart';
import History from './BridgeHistory';
//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../../common/Menu');
import MenuButton from '../../../common/MenuButton';
//menu

import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native';

class BridgePaymentConfirmation extends Component {

  state = { noRedirects: 0, uri: "" };

  //initiate state items with constructor
  constructor(props) {
    super(props);
    this.state = {
      uri:this.props.linkToAccess
    };
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

  _onNavigationStateChange(webViewState) {

    console.log("webstate");
    console.log(webViewState);
    console.log("webstate");

    if(webViewState.url.indexOf("/apps/success") >= 0 ||
    webViewState.url.indexOf("/apps/pending") >= 0 ||
    webViewState.url.indexOf("/apps/failed") >= 0)
    {
      console.log("Redirecting...");  
      Actions.bridge_shop({
        componentToDisplay: 'history',
        responseData: this.props.responseData
      });
    }
  }


  render() {

    return (
      <WebView
        source={{ uri: this.state.uri }}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      />
    );
  }
};


export default BridgePaymentConfirmation;
