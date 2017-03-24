import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import BuyRov from './components/BuyRov';
import DashboardHeader from './components/DashboardHeader';
import Basic from '../Basic';

const RouterComponent= () =>{
return(

<Router >

<Scene key="auth" hideNavBar initial>
<Scene key="login" component={LoginForm} title="Please Login" />
</Scene>


<Scene key="dashboard" hideNavBar >
<Scene key="header"  component={DashboardHeader} title="HI"  />
</Scene>


<Scene key="main" hideNavBar >

<Scene key="menu"  component={Basic} title="HI"  />
<Scene key="buy"   component={BuyRov} title="HI" />

</Scene>
</Router>

	);

};

export default RouterComponent;