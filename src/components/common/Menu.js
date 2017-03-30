const React = require('react');
const { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, AsyncStorage } = require('react-native');
const { Component } = React;
import { Actions } from 'react-native-router-flux';


module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };
  _logoutUser = async () => {
		try {
			await AsyncStorage.removeItem('@LgInfStore:key');
		console.log('Selection removed from disk.');
      Actions.auth();
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	};
  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>

        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../../../assets/rovinieta.png')} />
        </View>

        <View style={styles.menuItems}>

          <View style={styles.rowItem}>
            <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/store.png')} />
              <View>
            <Text
              onPress={() => {this.props.onItemSelected('dashboard'); Actions.main({responseData: this.props.responseData})} }
              style={styles.item}>
              Dashboard
                    </Text>
              </View>
                    
          </View>

          <View style={styles.rowItem}>
            <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/profiles.png')} />
              <View>
              
            <Text
              onPress={() => {this.props.onItemSelected('profiles'); Actions.profiles({responseData: this.props.responseData.user.token})}}
              style={styles.item}>
              Profilurile mele
              </Text>   
               </View>
          </View>
          <View style={styles.rowItem}>
            <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/car.png')} />
              <View>
              
            <Text
              onPress={() => {this.props.onItemSelected('cars'); Actions.cars({responseData: this.props.responseData.user.token})}}
              style={styles.item}>
              Masinile mele
                </Text>
          </View>
                
          </View>
          <View style={styles.rowItem}>
            <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/accountsettings.png')} />
              <View>
            <Text
              onPress={() => {this.props.onItemSelected('accountsettings'); Actions.account_settings({responseData: this.props.responseData.user.token})}}
              style={styles.item}>
              Setari cont
                  </Text>
                  </View>
          </View>
          <View style={styles.rowItem}>
            <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/logout.png')} />
              <View>
            <Text
              onPress={() => {this.props.onItemSelected('logout');  this._logoutUser()}}
              style={styles.item}>
              Delogare
                  </Text>
          </View>
 </View>
        </View>
      </ScrollView>
    );
  }
};



const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
  },
  avatarContainer: {
    width: null,
    height: window.height * 0.2,
    backgroundColor: '#000000',
    alignItems: 'center'

  },
  avatar: {
    paddingTop: 15,
    width: 200,
    height: 65,
    resizeMode: 'contain',
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  menuItems: {
    paddingTop: 20,

  },
  smallIcon: {
    paddingTop: 10,
    width: 22,
    height: 22,
  },
  item: {
    color: "#000000",
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 10,
    height: 40,
    width: null,
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: window.width * 0.05,
  },
});