import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Expo from 'expo';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center',
    },
    mainText : {
        fontSize : 15,
        fontWeight : 'bold',
    }
})

export default class LoginScreen extends React.Component {
    state = {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/icon.png')} />
                <Text style={styles.mainText}>#Towards a closer Yangon</Text>
            </View>
        )
    }
}