const React = require('react');
const {  Dimensions, StyleSheet,  ScrollView,  View,  Image,  Text,  TouchableOpacity } = require('react-native');
const { Component } = React;



module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
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
                      <Text
                    onPress={() => this.props.onItemSelected('shop')}
                    style={styles.item}>
                    Magazin
                    </Text>
          </View>

          <View style={styles.rowItem}>
                      <Image
                        style={styles.smallIcon}
                        source={require('../../../assets/menu/profiles.png')} />
                      <Text
                        onPress={() => this.props.onItemSelected('profiles')}
                        style={styles.item}>
                        Profilurile mele
              </Text>
          </View>
          <View style={styles.rowItem}>
                      <Image
                      style={styles.smallIcon}
                      source={require('../../../assets/menu/car.png')} />
                        <Text
                          onPress={() => this.props.onItemSelected('cars')}
                          style={styles.item}>
                          Masinile mele
                </Text>
          </View>
          <View style={styles.rowItem}>
                    <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/accountsettings.png')} />
                          <Text
                            onPress={() => this.props.onItemSelected('accountsettings')}
                            style={styles.item}>
                            Setari cont
                  </Text>
          </View>
          <View style={styles.rowItem}>
                    <Image
              style={styles.smallIcon}
              source={require('../../../assets/menu/logout.png')} />
                          <Text
                            onPress={() => this.props.onItemSelected('logout')}
                            style={styles.item}>
                            Delogare
                  </Text>
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
  rowItem:{
        flex: 1, 
        flexDirection: 'row',
        paddingLeft: window.width * 0.05,
  },
});