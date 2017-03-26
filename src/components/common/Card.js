import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',  
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 10,
  }
};

export { Card };
