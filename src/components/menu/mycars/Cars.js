import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, Dimensions, Linking } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import { Spinner } from '../../common';
//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../common/Menu');
import MenuButton from '../../common/MenuButton';
import Header from '../../common/Header';

//!menu!!
class Cars extends Component {


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


  state = {
    selected: '', cart: false, history: false, loading: true, vehicles: [], isOpen: false,
    selectedItem: 'Dashboard',
  };
  constructor(props) {
    super(props)
    this.state = { vehicles: [], loading: true }
  }
  renderCars() {
    if (this.state.loading || this.state.loading == undefined) {
      return <Spinner style={{paddingTop:40}} size='small' />;
    }

    if (this.state.vehicles == undefined || this.state.vehicles.length == 0)
      return <View style={styles.emptyContainerStyle}><View style={styles.buttonStyle}><Text > Nu exista masini inregistrate pe acest cont.</Text></View></View>
    return (<View style={{ marginTop: window.height * 0.01 }}>
      <View key={0} style={styles.containerStyle}>
        <Text style={styles.nrCrtStyle}>Nr.</Text>
        <Text style={[styles.textStyle,{flex:0.35}]}>Nr. înmatriculare</Text>
        <Text style={[styles.textStyle,{flex:0.50}]}>Nr. șasiu</Text>
      </View>
      {this.state.vehicles.map(function (o, i) {

        return <View key={i + 1} style={styles.containerStyle}><Text style={styles.nrCrtStyle} key={0}> {i + 1}. </Text><Text style={[styles.textStyle,{flex:0.35}]} key={1}>{o.plateNo}</Text><Text style={[styles.textStyle,{flex:0.50}]} key={2}>{o.chasisNo}</Text></View>



      })}
    </View>);
  }
  getCars() {
    var self = this;
    console.log("--getCars--");
    axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
      querystring.stringify({
        tag: 'vehicles',
        device: 'android',
        token: this.props.responseData.user.token
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        if (response.data.success) {
          self.state.vehicles = response.data.vehicles;
          self.setState({ loading: false });
        }
        if (response.data.success === 0) {
          console.log("Failed ");
        }
      });

  }
  componentWillMount() {
    this.getCars();
  }
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
          <Header headerText={'Masinile Mele'} />

          <View>
            {this.renderCars()}
            <View style={styles.insideStyle} >
						<Text 
						style={{color: 'blue', paddingBottom: 10}}
						onPress={() => Linking.openURL('https://www.e-rovinieta.ro/ro/masini')}
						>Iti poti configura parcul auto de aici</Text>								
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
const window = Dimensions.get('window');
const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    color: 'black',    
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    borderWidth:1,
    paddingLeft: 5,
  },
  nrCrtStyle: {
    color: 'black',
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    height: 20,
    borderWidth:1,
    paddingLeft: 5,
  },
	insideStyle: {
		padding: 50,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative',
		alignSelf: 'center',
	},
  	emptyContainerStyle: {
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
};

export default Cars;