import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/login/LoginForm';
import BuyRov from './components/menu/store/rov_shopping/BuyRov';
import AddToCart from './components/menu/store/rov_shopping/AddToCart';
import BuyBridgeTicket from './components/menu/store/bridge_shopping/BuyBridgeTicket';
import Categories from './components/menu/store/bridge_shopping/Categories';
import StoreType from './components/menu/store/StoreType';
import Basic from '../Basic';

const RouterComponent = () => {
	return (

		<Router >
			<Scene key="auth" hideNavBar initial>
				<Scene key="login" component={LoginForm} title="Please Login"  />
			</Scene>
			<Scene key="main" hideNavBar >
				<Scene key="menu" component={Basic}  />
				<Scene key="buy" component={BuyRov} />
				<Scene key="shop" component={AddToCart}  />
				<Scene key="bridge_ticket" component={BuyBridgeTicket}  />
				<Scene key="bridge_ticket_to_cart" component={Categories}  />
			</Scene>
		</Router>
	);

};

export default RouterComponent;