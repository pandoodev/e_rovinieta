import React, { Component } from 'react';
import { View, Button, Image, Text, TouchableOpacity, ScrollView ,Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';


class MyCars extends Component {

	state = { responseData: this.props.responseData, category: '' };



	render() {

		return (

			<View style={styles.pageContainerStyle}>
										<Text style={styles.pageTitleStyle}> Alege categoria mașinii </Text>

											<ScrollView >

					<View style={styles.containerStyle}>
						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'A',
									categoryID: "1"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/a.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle} > Categoria A </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'E',
									categoryID: "5"
								})
							}}

							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/e.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}>Categoria E  </Text>
						</TouchableOpacity>


					</View>
					<View style={styles.containerStyle}>
						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'B',
									categoryID: "2"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/b.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle} > Categoria B </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'F',
									categoryID: "6"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/f.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Categoria F </Text>
						</TouchableOpacity>


					</View>
					<View style={styles.containerStyle}>
						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'C',
									categoryID: "3"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/c.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle} > Categoria C </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'G',
									categoryID: "7"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/g.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Categoria G </Text>
						</TouchableOpacity>


					</View>
					<View style={styles.containerStyle}>
						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'D',
									categoryID: "4"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/d.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle} > Categoria D </Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								Actions.buy({
									responseData: this.props.responseData, category: 'H',
									categoryID: "8"
								})
							}}
							style={styles.buttonStyle}>
							<View>
								<Image
									source={require('../../../../../assets/h.png')} style={styles.imgStyle} />
							</View>
							<Text style={styles.textStyle}> Categoria H </Text>
						</TouchableOpacity>


					</View>
											</ScrollView >

			</View>

		);
	}
};
const window = Dimensions.get('window');
const styles = {
	pageContainerStyle: {
		height:window.height-100,
	},
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginLeft: 10,
		marginRight: 10,
	}
	,
	buttonStyle: {
		margin:5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 1,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	imgStyle: {
		marginTop:10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'contain',
	},
	textStyle: {
		paddingTop: -4,
		marginBottom: 10,


	},
	pageTitleStyle: {
		fontSize: 24,
		textAlign: 'center',
		color: '#000000',
		fontWeight: '600',
		paddingBottom: 10,
		paddingTop: -5
	}
};

export default MyCars;