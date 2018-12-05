import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { userData, setUserData } from '../../api/data';
import { makeTopup, getUser } from '../../api/api';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#70206a',
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
    button : {
        marginVertical : hp('2%'),
        width : wp('50%'),
		height : hp('6%'),
		borderRadius : 30,
		backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center',
    },
    buttonText : {
        color : '#803176',
        fontSize : hp('3%'),
        fontWeight : 'bold',
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container} alignItems="center" justifyContent="center">
                        <Text style={{fontSize: hp('3%'), color: '#fff', fontWeight: 'bold', marginVertical: hp('2%')}}>Topup account</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter topup code"
                            value={this.state.code}
                            onChangeText={this.handleCode}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.makePayment}>
                            <Text style={styles.buttonText}>Top up</Text>
                        </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>

        )
    }
}