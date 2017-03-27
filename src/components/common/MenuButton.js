
import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';



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
        style={this.props.style}>
        <View>
        <Text>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};
export default MenuButton;

