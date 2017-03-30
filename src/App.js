import React, { Component } from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/login/LoginForm';
import AddToCart from './components/menu/store/rov_shopping/AddToCart';
import RovignetteShopMain from './components/menu/store/rov_shopping/RovignetteShopMain';
import BuyBridgeTicket from './components/menu/store/bridge_shopping/BuyBridgeTicket';
import Categories from './components/menu/store/bridge_shopping/Categories';
import Dashboard from './components/menu/store/Dashboard';

const scenes = Actions.create(
	<Scene key="root">

		<Scene key="auth" hideNavBar initial>
			<Scene key="login" component={LoginForm} title="Please Login" />
		</Scene>

		<Scene key="main" hideNavBar type={ActionConst.RESET}>
			<Scene key="dashboard" component={Dashboard} initial/>
			<Scene key="buy" component={AddToCart} />
			<Scene key="shop" component={RovignetteShopMain} />
			<Scene key="bridge_ticket" component={BuyBridgeTicket} />
			<Scene key="bridge_ticket_to_cart" component={Categories} />
			
		</Scene>
		
	</Scene>

);

class App extends Component {
	
	render(){
		
		return(
		<Router scenes={scenes}/>

		);
	}
}
export default App;