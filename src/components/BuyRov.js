import React, {Component}from 'react';
import { View, Image, Text, TouchableOpacity, Picker } from 'react-native';
import { Button, Card, CardSection, Input , Spinner} from './common';
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');
import Header from './common/Header';




class BuyRov extends  Component {
state = { vehicleNo: '', chasisNo: '', startDate: '', loading:false, country:'Romania', nrDays:"" };
  constructor(props){
    super(props)
    this.state = {date: this.getCurerntDate()}
  }
  getCurerntDate(){
      let currentDate=new Date();
    let date=dateFormat(currentDate, "dd-mm-yyyy").toString();

      return date;
  }
  		
		renderButton() {
			if(this.state.loading)
			{
				return <Spinner size='small' />;
			}

			return (
        //	<Button onPress = {this.onButtonPress.bind(this)}> 
				<Button> 
				Adauga in cos
				</Button>
				);

		}

  render(){
    return (

<View>
  
    	<Header headerText="Introduceti Datele" />
				<Card >
				<CardSection >
				<Input
				placeholder= "SM79BET"
				label= "Numar Inm."
				value= {this.state.vehicleNo}
				onChangeText= {vehicleNo => this.setState({vehicleNo})}
				/>
				</CardSection>
               	<CardSection >
				<Input
				placeholder= "WAULC68E92A140677"
				label= "Serie Sasiu"
				value= {this.state.chasisNo}
				onChangeText= {chasisNo => this.setState({chasisNo})}
				/>
				</CardSection>
	<CardSection >

      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        format="DD-MM-YYYY"
        minDate={this.getCurerntDate()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({startDate: date})}}
      />
      </CardSection>

      <CardSection>
        <Picker
        style={styles.pickerStyle}
  selectedValue={this.state.country}
  onValueChange={(loc) => this.setState({country: loc})}>
  <Picker.Item label="Romania" value="Romania" />
  <Picker.Item label="Franta" value="Franta" />
  <Picker.Item label="Bulgaria" value="Bulgaria" />
</Picker>
          </CardSection>
          <CardSection>
        <Picker
        style={styles.pickerStyle}
  selectedValue={this.state.counrDaysntry}
  onValueChange={(days) => this.setState({nrDays: days})}>
  <Picker.Item label="50" value="50" />
 
</Picker>
          </CardSection>
      <CardSection>
				{this.renderButton()}
				</CardSection>
       </Card>
      </View>





    )
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
    pickerStyle:{
 width: 200,   

    },  
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

export default BuyRov;
