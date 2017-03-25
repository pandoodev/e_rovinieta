
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class StoreType extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerRov}>

          <Image source={require('../../assets/e-rov.jpg')} style={styles.backgroundImage}>
            <TouchableOpacity
              onPress={() => { Actions.shop({ infoClientLogin: this.props.infoClientLogin, location: 'rovignette' }); }}
              style={styles.buttonStyle}>
              <View>
                <Image
                  source={require('../../assets/rovinieta.png')} style={styles.imgStyle} />
              </View>

            </TouchableOpacity>
          </Image>
        </View>
        <View style={styles.containerBridge}>
          <Image source={require('../../assets/pod-f.jpg')} style={styles.backgroundImage}>
            <TouchableOpacity
              onPress={() => { Actions.shop({ infoClientLogin: this.props.infoClientLogin, location: 'bridge' }); }}

              style={styles.buttonStyle}>
              <View>
                <Image
                  source={require('../../assets/taxapod.png')} style={styles.imgStyle} />
              </View>

            </TouchableOpacity>
          </Image>
        </View>
      </View>
    );
  }
}

const styles = {
  containerRov: {
    justifyContent: 'center',
    flex: 0.5,
    borderBottomWidth: 2.5,
  },
  containerBridge: {
    justifyContent: 'center',
    flex: 0.5,
    borderTopWidth: 2.5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
};

export default StoreType;
