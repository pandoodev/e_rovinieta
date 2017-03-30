
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet  } from 'react-native';



class MenuButton extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={styles.button}>
        <View>
              <Image
            source={require('../../../assets/menu.png')} style={{width: 20, height: 20}} />

        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 15,
    padding: 10,

  },
});

export default MenuButton;

