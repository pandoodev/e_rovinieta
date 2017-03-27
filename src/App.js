import React, {Component } from 'react';
import {View, Text, AppState} from 'react-native';
import { Header } from './components/common';
import Router from './Router';


class App extends Component{


	render(){
		
		return(
		<Router />
		);
	}
}
export default App;