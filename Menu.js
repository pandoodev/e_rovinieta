const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: -20,
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 3,
    width:200,

  },
  avatar: {
    paddingTop: 15,
    width: 200,
    height: 65,
    resizeMode: 'contain',
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  menuItems:{
paddingTop: 30,

  },
  item: {
    color:"#FFFFFF",
    fontSize: 18,
    fontWeight: '400',
    paddingTop: 10,
    height: 40,
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1,
   width:150,
   fontFamily: 'FuturaStd-ExtraBold',
  },
});

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
            source={require('./assets/rovinieta.png')}  />
            <View>
          <Text style={styles.name}></Text>
          </View>
        </View>

<View style={styles.menuItems}>
   <View>
        <Text
          onPress={() => this.props.onItemSelected('dashboard')}
          style={styles.item}>
          Dashboard
        </Text>
         </View> 

         <View>
        <Text
          onPress={() => this.props.onItemSelected('shop')}
          style={styles.item}>
          Magazin
        </Text>
         </View>

         <View>
        <Text
          onPress={() => this.props.onItemSelected('profiles')}
          style={styles.item}>
          Profilurile mele
        </Text>
        </View>
        <View>
        <Text
          onPress={() => this.props.onItemSelected('cars')}
          style={styles.item}>
          Masinile mele
        </Text>
        </View>
        <View>
        <Text
          onPress={() => this.props.onItemSelected('account')}
          style={styles.item}>
          Setari cont
        </Text>
        </View>
        </View>
      </ScrollView>
    );
  }
};
