import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import BuyRov from './components/BuyRov';
import Shop from './components/Shop';
import StoreType from './components/StoreType';
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
				<Scene key="shop" component={Shop}  />
			</Scene>
		</Router>

	);

};

export default RouterComponent;