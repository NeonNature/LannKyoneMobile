import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { userData, setUserData } from '../../api/data';
import { makeTopup, getUser } from '../../api/api';

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
    button : {
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

export default class PaymentScreen extends React.Component {
    state = {
        code : '',
        userID : '',
    }

    componentDidMount() {
        const data = userData.id
        this.setState({userID : data})
    }

    handleCode = (code) => {
        this.setState({code: code})
    }

    makePayment = async() => {
        const response = await makeTopup(this.state)
        if(response.ok)
        {
            const message =await response.json()
            Alert.alert(
                'Success!',
                message,
                [
                    {
                        text: 'OK', 
                        onPress : async() => {
                            const data = await getUser(userData.id)
                            setUserData(data)
                            this.props.navigation.navigate('Profile', {status : 'done'})
                        },
                        style: 'default'
                    },
                ]
            )
        } else {
            const message = await response.json()
            Alert.alert(
                'Error!',
                message,
                [
                    {text: 'OK', style: 'cancel'},
                ]
            )
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter topup code"
                    value={this.state.code}
                    onChangeText={this.handleCode}
                />
                <TouchableOpacity style={styles.button} onPress={this.makePayment}>
                    <Text style={styles.buttonText}>Top up</Text>
                </TouchableOpacity>
            </View>

        )
    }
}