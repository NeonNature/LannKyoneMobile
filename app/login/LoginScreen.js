import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, TextInput } from 'react-native-paper';

import { login } from './api';
import { setUserData, userData } from '../../data/data';

const theme = { colors: { placeholder: 'white', background: 'white', text: 'white', surface: 'white', primary: 'white' } };

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#70206a',
        alignItems : 'center',
        justifyContent : 'center',
    },
    textInput : {
       marginTop: 20,
    width: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor : '#70206a',
    },
    loginButton : {
        marginTop: 40,
        width : 200,
		borderRadius : 30,
		backgroundColor : '#70206a',
        shadowOffset: { width: 10, height: 10 },  
        shadowColor: 'black',  
        shadowOpacity: 1,  
        elevation: 10,  
        zIndex:10, 
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
    regText: {
        marginTop: 50,
    }
})

export default class LoginScreen extends React.Component {
    state = {
        phone : '',
        password : '',
    }

    componentDidMount() {
        console.log(userData)
    }

    setPhoneNumber = (phoneNo) => {
        this.setState({phone : phoneNo})
    }

    setPassword = (password) => {
        this.setState({password : password})
    }

    userLogin = async() => {
        const response = await login(this.state)
        if(response.ok) {
            const {data} = await response.json()
            console.log(data)
            if(data.status !== 'Verified') {
                Alert.alert(
                    'Error!',
                    'Your account is in verification process!Please wait for a while.',
                    [
                        {text: 'OK', style: 'default'},
                    ]
                )
            } else {
                setUserData(data)
                try {
                    await AsyncStorage.setItem('userData', JSON.stringify(data))
                } catch (err) {
                    console.error(err)
                }
                if(userData.role==='Driver') {
                    this.props.navigation.navigate('DriverMain')
                } else {
                    this.props.navigation.navigate('PassengerMain')
                }
            }
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
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={this.state.phone}
                    theme={theme}
                    onChangeText={this.setPhoneNumber}
                    label="Phone number"
                    keyboardType='number-pad'
                    underlineColor="#fff"                    
                    mode="flat"
                />
                <TextInput
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={this.setPassword}
                    theme={theme}
                    label="Password"
                    secureTextEntry={true}
                    underlineColor="#fff"
                    mode="flat"
                />

                <Button style={styles.loginButton} onPress={this.userLogin} mode="contained">
                    Login
                </Button>

                <TouchableOpacity onPress={this.register} style={styles.regText}>
                    <Text style={styles.buttonText}>အေကာင့္မရွိဘူးလားခ်ိဖ</Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}