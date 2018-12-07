import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

regstyles = StyleSheet.create({
    main : {
        backgroundColor : '#fff',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    button : {
        width : wp('70%'),
		padding : hp('2%'),
		backgroundColor : '#a04099',
        alignItems: 'center',
        opacity : 1,
        borderRadius : 40,
        marginVertical : hp('1%'),
    },
    buttonText : {
        color: '#fff',
		fontSize: hp('2.5%'),
		fontWeight: 'bold',
    },
})

export default class RegisterOption extends React.Component {
    static navigationOptions = {
        header : null,
    }

    state = {
    }

    passengerRegister = () => {
        this.props.navigation.navigate('Registration', {option : 'Passenger'})
    }

    driverRegister = () => {
        this.setState({option : 'Driver'})
        this.props.navigation.navigate('Registration', {option : 'Driver'})
    }

    render() {
        return (
            <View style={regstyles.main}>
                <TouchableOpacity style={regstyles.button} onPress={this.passengerRegister}>
                    <Text style={regstyles.buttonText}>Register as Passenger</Text>
                </TouchableOpacity>

                <TouchableOpacity style={regstyles.button} onPress={this.driverRegister}>
                    <Text style={regstyles.buttonText}>Register as Driver</Text>
                </TouchableOpacity>
            </View>
        )
    }
}