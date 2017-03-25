
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
class Dashboard extends Component {
  render() {
    return (
      <View style={{flex: 1}}> 
        <View style={styles.containerRov}>

          <Image source={require('../../assets/e-rov.jpg')} style={styles.backgroundImage}>
            <Text style={styles.instructions}>e-rovinieta.ro</Text>
          </Image>
        </View>
        <View style={styles.containerBridge}>
          <Image source={require('../../assets/pod-f.jpg')} style={styles.backgroundImage}>
            <Text style={styles.instructions}>taxa-pod-fetesti.ro</Text>
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
    backgroundColor: 'rgba(135,0,21,1)',
    borderBottomWidth: 2.5,
  },
  containerBridge: {
    justifyContent: 'center',
    flex: 0.5,
    backgroundColor: 'rgba(30,30,31,1)',
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
        width: 50,
        height: 50,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
};

export default Dashboard;
