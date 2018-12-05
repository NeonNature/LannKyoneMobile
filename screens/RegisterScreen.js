import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, StyleSheet, Alert, Picker, Platform, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Expo from 'expo';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { userRegister } from '../api/api';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#fff',
    },
    registerButton : {
        marginTop : hp('1%'),
        width : wp('40%'),
        height : hp('6%'),
        padding : hp('1%'),
		borderRadius : 30,
		backgroundColor : '#9e005d',
		alignItems : 'center',
    },
    buttonText : {
        color: '#fff',
		fontSize: hp('2.5%'),
		fontWeight: 'bold',
    },
    selectButton : {
        marginTop : hp('1%'),
        width : wp('70%'),
        height : hp('6%'),
        padding : hp('1%'),
		borderRadius : 30,
		backgroundColor : '#a04099',
    },
    selectText : {
        color: '#fff',
        fontSize: 15,
        paddingVertical : 7,
        paddingLeft : 5,
    },
    textInput : {
        padding : 10,
        fontSize : 15,
        backgroundColor : '#a04099',
        color : '#fff',
        minWidth : wp('70%'),
        minHeight : hp('6%'),
        borderRadius : 30,
        marginVertical : hp('1%'),
    },
    passwordInput : {
        padding : 10,
        fontSize : 15,
        backgroundColor : '#fff200',
        color : '#111',
        minWidth : wp('70%'),
        minHeight : hp('6%'),
        borderRadius : 30,
        marginVertical : hp('1.5%'),
    },
    inputContainer: {
        ...Platform.select({
          ios: {
            borderBottomColor: "gray",
          }
        })
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        padding: 4,
        backgroundColor: "#ececec"
    },
    input: {
        height: 40
      },
})

export default class Register extends React.Component {
    state = {
        name : '',
        phone : '',
        university : '',
        carModel : '',
        carNumber : '',
        password : '',
        confirmPassword : '',
        modalVisibility : false,
    }

    handleName = (name) => {
        this.setState({name: name})
    }

    handlePhone = (phone) => {
        this.setState({phone: phone})
    }

    toggleModal = () => {
        this.setState({modalVisibility : true})
    }

    handleUniversity = (itemValue, itemIndex) => {
        this.setState({university: itemValue})
        console.log(this.state.university)
    }

    handlePassword = (password) => {
        this.setState({password: password})
    }

    handleConfirmPassword = (confirmPassword) => {
        this.setState({confirmPassword: confirmPassword})
    }

    handleCarModel = (carModel) => {
        this.setState({carModel: carModel})
    }

    handleCarNumber = (carNumber) => {
        this.setState({carNumber: carNumber})
    }

    userRegister = async() => {
        const response = await userRegister(this.state)
        if(response.ok) {
            Alert.alert(
                'Success!',
                'အေကာင့္ရၿပီခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('Login') ,style: 'default'},
                ]
            )
        } else {
            const message = await response.json()
            if(message) {
                Alert.alert(
                    'Error',
                    message,
                    [
                        {text: 'OK', style: 'cancel'},
                    ]
                )
            } else {
                Alert.alert(
                    'Error',
                    'Something went wrong :(',
                    [
                        {text: 'OK', style: 'cancel'},
                    ]
                )
            }            
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} alignItems='center' justifyContent='center' extraHeight={hp('2%')}>
                <TextInput 
                    value={this.state.name}
                    placeholder="Enter your name"
                    placeholderTextColor='#fff'
                    onChangeText={this.handleName}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.phone}
                    placeholder="Enter phone number"
                    placeholderTextColor='#fff'
                    onChangeText={this.handlePhone}
                    style={styles.textInput}
                />

                {Platform.OS === 'android' ? (
                    <Picker selectedValue={this.state.university} onValueChange={this.handleUniversity} style={{backgroundColor : '#ececec'}}>
                        <Picker.Item key='1' label='YTU' value='YTU'/>
                        <Picker.Item key='2' label='YUFL' value='YUFL'/>
                        <Picker.Item key='3' label='UM2' value='UM2'/>
                        <Picker.Item key='4' label='NMDC' value='NMDC'/>
                    </Picker>
                ) : (
                    <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => this.setState({ modalVisibility: true })} style={styles.selectButton}>
                        <Text style={styles.selectText}>{this.state.university ? this.state.university : 'Select University'}</Text>
                    </TouchableOpacity>
                    <Modal animationType="slide" transparent={true} visible={this.state.modalVisibility}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ modalVisibility: false })}>
                            <View style={styles.modalContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={{ color: "blue", fontSize : 18, paddingVertical : 5 }} onPress={() => this.setState({ modalVisibility: false })}>Done</Text>
                                </View>
                                <View>
                                    <Picker selectedValue={this.state.university} onValueChange={this.handleUniversity} style={{backgroundColor : '#fff'}}>
                                            <Picker.Item key='1' label='YTU' value='YTU'/>
                                            <Picker.Item key='2' label='YUFL' value='YUFL'/>
                                            <Picker.Item key='3' label='UM2' value='UM2'/>
                                            <Picker.Item key='4' label='NMDC' value='NMDC'/>
                                    </Picker>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
                )}
                
                <TextInput 
                    value={this.state.carModel}
                    placeholder="Enter car model"
                    placeholderTextColor='#fff'
                    onChangeText={this.handleCarModel}
                    style={styles.textInput}
                />            
                <TextInput 
                    value={this.state.carNumber}
                    placeholder="Enter car number"
                    placeholderTextColor='#fff'
                    onChangeText={this.handleCarNumber}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.password}
                    placeholder="Enter password"
                    placeholderTextColor='#9e005d'
                    onChangeText={this.handlePassword}
                    style={styles.passwordInput}
                    secureTextEntry={true}
                />
                <TextInput 
                    value={this.state.confirmPassword}
                    placeholder="Confirm password"
                    placeholderTextColor='#9e005d'
                    onChangeText={this.handleConfirmPassword}
                    style={styles.passwordInput}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.registerButton} onPress={this.userRegister}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
            </KeyboardAwareScrollView>
        )
    }
}