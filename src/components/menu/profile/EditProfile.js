import React, { Component } from 'react';
import { View, Text, Picker, Alert, AsyncStorage, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../../common';
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');
import Header from '../../common/Header';
import axios from 'axios';
import querystring from 'query-string';
import { Actions } from 'react-native-router-flux';


//menu
const SideMenu = require('react-native-side-menu');
const Menu = require('../../common/Menu');
import MenuButton from '../../common/MenuButton';
//menu

class EditProfile extends Component {
    state = {
        userType: '', profileID: '', vehicleNo: '', chasisNo: '', startDate: '1', loading: false, country: 1, profileType: 95, error: '', countries: [], isOpen: false,
        selectedItem: 'Dashboard', headerTitle: ''
    };
    constructor(props) {
        super(props)
     
    }

    //Display pop-up message to the user
    message(title, content) {
        Alert.alert(
            title,
            content,
            [
                { text: 'OK', onPress: () => { } },
            ],

            { cancelable: false }
        )
    }

    // Start side-menu functions
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen, });
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }
    // !!!End side-menu functions!!!




    componentWillMount() {
        this.setState({  country: "1", profileType: "95", error: "", loading:false });
 this.getCountries();
    }
    
    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }

        return (
            //	<Button onPress = {this.onButtonPress.bind(this)}> 
            <Button onPress={this.addToCartButton.bind(this)}>
              Salvează Modificările
		</Button>
        );

    }

    redirectToCart() {
        Actions.shop({ responseData: this.props.responseData, componentToDisplay: 'cart' })

    }
    getProfileID() {
        console.log("this.props.responseData")
        var self = this;
        console.log(this.props.responseData)
        axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
            querystring.stringify({
                tag: 'profile',
                device: 'android',
                token: this.props.responseData.user.token
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                if (response.data.success) {

                    self.setState({ profileID: response.data.profiles[0]['id'] });


                }
                if (response.data.success === 0) {
                    console.log("unsuccess while getting profile id");
                    console.log(response.data);
                }
            });
    }




    addToCartButton() {
        this.setState({ loading: true });

        if (this.checkIfNotEmpty() == 1) {
            this.validateRovignette(
                this.props.responseData.user.token,
                this.state.profileID,
                this.props.categoryID,
                this.state.profileType,
                this.state.startDate,
                this.state.vehicleNo,
                this.state.chasisNo,
                this.state.country);
        }
        else {
            this.setState({ loading: false });
            Alert.alert(
                'Eroare',
                this.checkIfNotEmpty(),
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            )

        }
    }


    checkIfNotEmpty() {
        //Vehicle number validation
        if (this.state.vehicleNo === undefined
            || this.state.vehicleNo == ""
        ) {
            return "Vă rugăm să introduceți numărul de înmatriculare al vehiculului !";

        }

        //Chasis number validation
        if (this.state.chasisNo === undefined
            || this.state.chasisNo == ""

        ) {
            return "Vă rugăm să introduceți numărul șasiului vehiculului !";
        }


        return 1;

    }
    getCountries() {
		var self = this;
		axios.post('http://api-erov.ctrlf5.ro/mobile/1.0/get',
			querystring.stringify({
				tag: 'countries',
				device: 'android'
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				if (response.data.success) {
					var arrCountries = [];
					response.data.countries.forEach(function (countrieInfo) {
						arrCountries.push(countrieInfo['name']);
					}, this);
					self.state.countries = arrCountries;
					self.setState({ error: '', loading: false });
				}
				if (response.data.success === 0) {
					console.log("unsuccess from getCountries");
				}
			});

	}


   renderCountries() {
		if (this.state.loading || this.state.loading == undefined) {
			return <Spinner size='small' />;
		}
		return (
			<Picker
				style={styles.pickerStyle}
				selectedValue={this.state.country}
				onValueChange={(loc) => this.setState({ country: loc })}>
				{this.state.countries.map(function (o, i) {

					return <Picker.Item value={i} label={o} key={i} />
				})}</Picker>
		);
	}

    showForm() {

        if (this.state.profileType == 0) {
            return (
                <View>
                    <CardSection >
                        <Input
                            placeholder="Popescu"
                            label="Nume:"
                            value={this.state.vehicleNo}
                            onChangeText={vehicleNo => this.setState({ vehicleNo })}
                        />
                    </CardSection>
                    <CardSection >
                        <Input
                            placeholder="Ion"
                            label="Prenume:"
                            value={this.state.chasisNo}
                            onChangeText={chasisNo => this.setState({ chasisNo })}
                        />
                    </CardSection>
             <CardSection >
                        <Input
                            placeholder="Independenței 23"
                            label="Adresă"
                            value={this.state.chasisNo}
                            onChangeText={chasisNo => this.setState({ chasisNo })}
                        />
                    </CardSection>
                    
                     <CardSection >
                        <Input
                            placeholder="București"
                            label="Oraș"
                            value={this.state.chasisNo}
                            onChangeText={chasisNo => this.setState({ chasisNo })}
                        />
                    </CardSection>

                    <CardSection>
								<Text style={styles.textStyle} > Țara: </Text>
								{this.renderCountries()}

							</CardSection>
            



                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </View>

            );
        }
//         @tag = ‘profile_new’
// @device (‘android’ sau ‘ios’)
// @token (Tokenul returnat prin metoda de login)

// Daca userul este de tip persoana fizica:
// @type = 1
// @firstname
// @lastname
// @address
// @city
// @county(din api-ul de Counties)
// @country(din api-ul de Countries)
// @cnp

// Daca userul este de tip persoana juridica:

// @type = 0
// @company
// @address
// @city
// @county(din api-ul de Counties)
// @country(din api-ul de Countries)
// @fiscalcode(Cod fiscal)
// @jcode(Registru comert)

        else {
            return (
                <View>
                    <CardSection >
                        <Input
                            placeholder="SM79BET"
                            label="Număr înm:"
                            value={this.state.vehicleNo}
                            onChangeText={vehicleNo => this.setState({ vehicleNo })}
                        />
                    </CardSection>
                    <CardSection >
                        <Input
                            placeholder="WAULC68E92A140677"
                            label="Serie șasiu:"
                            value={this.state.chasisNo}
                            onChangeText={chasisNo => this.setState({ chasisNo })}
                        />
                    </CardSection>
                  

               
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </View>
            );
        }
    }


    render() {
        //menu
        const menu = <Menu onItemSelected={this.onMenuItemSelected} currentItem={this.state.selectedItem} responseData={this.props.responseData} />;
        //!!menu!!

        return (
            // Side menu start
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                }}>
                    {/*Content start */}
                    <Header headerText={this.props.headerTitle} />
                    <ScrollView >

                        <Card >
                            <CardSection>
                                <Text style={styles.textStyle}> Tip Profil: </Text>
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={this.state.profileType}
                                    onValueChange={(type) => this.setState({ profileType: type })}>
                                    <Picker.Item label="Persoană Fizică" value="1" />
                                    <Picker.Item label="Persoană Juridică" value="0" />


                                </Picker>
                            </CardSection>
                            {this.showForm()}
                        </Card>
                    </ScrollView >

                    {/*!!!Content end!!! */}
                </View>
                <MenuButton onPress={() => this.toggle()} />

            </SideMenu>
            // !!!Side menu end!!!

        )
    }
};
const inCartRovignetteKey = '@inCartRovignetteKey:key';
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
    pickerStyle: {
        width: 200,

    },
    buttonStyle: {
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
    imgStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    textStyle: {
        flex: 1,
        paddingTop: 10,
        fontSize: 18,
        marginBottom: 15,
        marginLeft: 15,
        color: 'black',


    },
    errorTextStyle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        color: 'red',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    }
};

export default EditProfile;


