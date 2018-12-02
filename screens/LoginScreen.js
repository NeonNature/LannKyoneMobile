import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Expo from 'expo';
import { login } from '../api/api';
import { setUserData } from '../api/data';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#fff',
        alignItems : 'center',
    },
    mainText : {
        fontSize : 15,
        fontWeight : 'bold',
    },
    textInput : {
        padding : 10,
        fontSize : 15,
        borderWidth : 1,
        borderColor : '#111',
        minWidth : 300,
        minHeight : 30,
        borderRadius : 15,
        marginVertical : 10,
    },
    loginButton : {
        marginTop : 10,
        width : 300,
		height : 40,
		padding : 10,
		borderRadius : 15,
		backgroundColor : '#9e005d',
		alignItems : 'center',
    },
    buttonText : {
        color: '#fff',
		fontSize: 15,
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
        console.log(this.state.phone)
    }

    setPassword = (password) => {
        this.setState({password : password})
        console.log(this.state.password)
    }

    userLogin = async() => {
        const response = await login(this.state)
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
        }
    }

    register = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} >
            <View style={styles.container} behavior='padding' keyboardVerticalOffset={10}>
                <Image source={require('../assets/icon.png')} />
                <Text style={styles.mainText}>#Towards a closer Yangon</Text>
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
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
                <Text style={{marginVertical : 10}}>Or</Text>
                <TouchableOpacity style={styles.loginButton} onPress={this.register}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}