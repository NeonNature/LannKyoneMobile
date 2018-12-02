import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Expo from 'expo';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : Expo.Constants.statusBarHeight,
    },
})

export default class Register extends React.Component {
    state = {
        name : '',
        phone : '',
        university : '',
        carModel : '',
        carNumber : '',
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    value={this.state.name}
                    placeholder="Enter your name"
                    onChangeText={this.handleName}
                />
                <TextInput 
                    value={this.state.phone}
                    placeholder="Enter phone number"
                    onChangeText={this.handlePhone}
                />
                <TextInput 
                    value={this.state.university}
                    placeholder="Enter university"
                    onChangeText={this.handleUniversity}
                />
                <TextInput 
                    value={this.state.carModel}
                    placeholder="Enter car model"
                    onChangeText={this.handleCarModel}
                />            
                <TextInput 
                    value={this.state.carNumber}
                    placeholder="Enter car number"
                    onChangeText={this.handleCarNumber}
                />
                <TouchableOpacity style={styles.loginButton} onPress={this.userLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
            </View>
        )
    }
}