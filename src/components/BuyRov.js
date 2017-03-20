import React, {Component}from 'react';
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');



class BuyRov extends  Component {

  constructor(props){
    super(props)
    this.state = {date: this.getCurerntDate()}
    console.log(this.getCurerntDate())
  }
  getCurerntDate(){
      let currentDate=new Date();
    let date=dateFormat(currentDate, "yyyy-mm-dd").toString();

      return date;
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
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
        onDateChange={(date) => {this.setState({date: date})}}
      />
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
