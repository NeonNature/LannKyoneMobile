import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Expo from 'expo';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
    },
})

export default class Register extends React.Component {
    state = {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/icon.png')} />
                <Text>#Towards a close Yangon</Text>
            </View>
        )
    }
}