import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Expo from 'expo';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { login } from '../../api/api';
import { setUserData } from '../../api/data';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#70206a',
        alignItems : 'center',
        justifyContent : 'center',
    },
    textInput : {
        padding : 10,
        fontSize : 15,
        backgroundColor : '#fff',
        color : '#803176',
        minWidth : wp('70%'),
        minHeight : hp('6%'),
        borderRadius : 30,
        marginVertical : hp('1.5%'),
    },
    loginButton : {
        marginVertical : hp('2%'),
        width : wp('50%'),
		height : hp('6%'),
		borderRadius : 30,
		backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center',
    },
    loginButtonText : {
        color : '#803176',
        fontSize : hp('3%'),
        fontWeight : 'bold',
    },
    buttonText : {
        color: '#e0ff00',
		fontSize: hp('2%'),
		fontWeight: 'bold',
    },
})

export default class LoginScreen extends React.Component {
    state = {
        phone : '',
        password : '',
    }

    setPhoneNumber = (phoneNo) => {
        this.setState({phone : phoneNo})
    }

    setPassword = (password) => {
        this.setState({password : password})
    }

    userLogin = async() => {
        /*const response = await login(this.state)
        if(response.ok) {
            const {data} = await response.json()
            setUserData(data)
            this.props.navigation.navigate('Main')
        }
        else {
            Alert.alert(
                'Error!',
                'မွားေနတယ္ခ်ိဖ',
                [
                    {text: 'ေတာ္ၿပီ', style: 'cancel'},
                    {text: 'ေအးပါကြာ',},
                ]
            )
        }*/
        this.props.navigation.navigate('Main')
    }

    register = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} >
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={this.state.phone}
                    onChangeText={this.setPhoneNumber}
                    placeholder="Enter phone number"
                    keyboardType='number-pad'
                />
                <TextInput
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={this.setPassword}
                    placeholder="Enter password"
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.loginButton} onPress={this.userLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.register}>
                    <Text style={styles.buttonText}>အေကာင့္မရွိဘူးလားခ်ိဖ</Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}