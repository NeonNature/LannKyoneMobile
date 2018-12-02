import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Expo from 'expo';

import { userRegister } from '../api/api';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
    },
    registerButton : {
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
    textInput : {
        marginVertical : 10,
        fontSize : 15,
    }
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
    }

    handleName = (name) => {
        this.setState({name: name})
    }

    handlePhone = (phone) => {
        this.setState({phone: phone})
    }

    handleUniversity = (university) => {
        this.setState({university: university})
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
            <View style={styles.container}>
                <TextInput 
                    value={this.state.name}
                    placeholder="Enter your name"
                    onChangeText={this.handleName}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.phone}
                    placeholder="Enter phone number"
                    onChangeText={this.handlePhone}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.university}
                    placeholder="Enter university"
                    onChangeText={this.handleUniversity}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.password}
                    placeholder="Enter password"
                    onChangeText={this.handlePassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                <TextInput 
                    value={this.state.confirmPassword}
                    placeholder="Confirm password"
                    onChangeText={this.handleConfirmPassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                <TextInput 
                    value={this.state.carModel}
                    placeholder="Enter car model"
                    onChangeText={this.handleCarModel}
                    style={styles.textInput}
                />            
                <TextInput 
                    value={this.state.carNumber}
                    placeholder="Enter car number"
                    onChangeText={this.handleCarNumber}
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.registerButton} onPress={this.userRegister}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
            </View>
        )
    }
}