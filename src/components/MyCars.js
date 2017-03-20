import React, {Component} from 'react';
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';


class MyCars extends  Component {
	
	state = { carCategory:''};
	
	
	
	render(){
		return (
		<View>
		<View style={styles.containerStyle}>
		<TouchableOpacity 
		onPress={ () => {
			Actions.buy({category:'A',
			categoryID:"1"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/a.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle} > Categoria A </Text>
		</TouchableOpacity>
		
		<TouchableOpacity
				onPress={ () => {
			Actions.buy({category:'E',
			categoryID:"5"})
			}}
		
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/e.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle}>Categoria E  </Text>
		</TouchableOpacity>
		
		
		</View>
		<View style={styles.containerStyle}>
		<TouchableOpacity 
				onPress={ () => {
			Actions.buy({category:'B',
			categoryID:"2"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/b.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle} > Categoria B </Text>
		</TouchableOpacity>
		
		<TouchableOpacity
				onPress={ () => {
			Actions.buy({category:'F',
			categoryID:"6"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/f.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle}> Categoria F </Text>
		</TouchableOpacity>
		
		
		</View>
		<View style={styles.containerStyle}>
		<TouchableOpacity 
					onPress={ () => {
			Actions.buy({category:'C',
			categoryID:"3"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/c.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle} > Categoria C </Text>
		</TouchableOpacity>
		
		<TouchableOpacity
				onPress={ () => {
			Actions.buy({category:'G',
			categoryID:"7"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/g.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle}> Categoria G </Text>
		</TouchableOpacity>
		
		
		</View>
		<View style={styles.containerStyle}>
		<TouchableOpacity 
				onPress={ () => {
			Actions.buy({category:'D',
			categoryID:"4"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/d.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle} > Categoria D </Text>
		</TouchableOpacity>
		
		<TouchableOpacity
				onPress={ () => {
			Actions.buy({category:'H',
			categoryID:"8"})
			}}
		style={styles.buttonStyle}>
		<View>
		<Image
		source={require('../../assets/h.png')} style={styles.imgStyle} />
		</View>
		<Text style={styles.textStyle}> Categoria H </Text>
		</TouchableOpacity>
		
		
		</View>
		</View>
		);
	}
};

const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 80,
		marginLeft: 10,
		marginRight: 10,
	}
	,
	buttonStyle:{
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
	imgStyle:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50, 
		height: 50,
		resizeMode: 'contain',
	},
	textStyle:{
		paddingTop: -5,
		marginBottom: 15,
		
		
	}
};

export default MyCars;
