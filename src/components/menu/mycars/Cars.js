import React, {Component}from 'react';
import { View, Button, Image, Text, TouchableOpacity,Dimensions } from 'react-native';
import axios from 'axios';
import querystring from 'query-string';
import { Spinner } from '../../common';

class Cars extends  Component {

	state = { selected:'', cart:false, history:false, loading: true, vehicles: [] };
    constructor(props) {
		super(props)
		this.state = { vehicles: [], loading: true }
	}
    renderCars(){
		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		}

                if(this.state.vehicles.length==0)
                   return <View style={{marginTop: window.height*0.01}}><Text > Nu exista masini inregistrate pe acest cont.</Text></View>
		return (<View style={{marginTop: window.height*0.01}}>
			 	 <View  key={0} style={styles.containerStyle}>
                                          <Text style={styles.nrCrtStyle}>Nr.</Text>
                                          <Text style={styles.textStyle}>Nr. înmatriculare</Text>
                                          <Text style={styles.textStyle}>Nr. șasiu</Text>
                                 </View>
			{this.state.vehicles.map(function (o, i) {
               
               return <View  key={i+1} style={styles.containerStyle}><Text style={styles.nrCrtStyle} key={0}> {i+1}. </Text><Text style={styles.textStyle} key={1}>{o.plateNo}</Text><Text style={styles.textStyle} key={2}>{o.chasisNo}</Text></View>
			
					
				})}
				</View>);
	}
	getCars() {
			var self = this;
			console.log("--getCars--");
			axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
				querystring.stringify({
					tag: 'vehicles',
					device: 'android',
					token: this.props.responseData
				}), {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}).then(function (response) {
					if (response.data.success) {
						self.state.vehicles = response.data.vehicles;
						self.setState({loading: false });
					}
					if (response.data.success === 0) {
						console.log("Failed ");
					}
				});

		}
         componentWillMount() {
			 this.getCars();
         }
	render(){
		return (
			<View>
					{this.renderCars()}
			</View>
			);
	}
};
const window = Dimensions.get('window');
const styles = {
	containerStyle: {
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
	},
	textStyle:{
		color: 'black',
		 flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,

	},
        nrCrtStyle:{
		color: 'black',
		 flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        width: 10,
        height: 60,

	}
};

export default Cars;