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
    backgroundColor: 'rgba(255, 255, 255, 1)',  
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#000033',
    borderWidth: 1,
  }
};

export { Card };
