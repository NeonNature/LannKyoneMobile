import React from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet, Button } from 'react-native';

import {addNewRoute} from '../api/api';

const styles= StyleSheet.create({
	main : {
        flex: 1,
		alignItems: 'center', 
		justifyContent: 'center',
	},
	textbox : {
		borderWidth: 1,
		borderColor: 'black',
		minWidth: 320,
		minHeight: 35,
		margin: 10,
		borderRadius: 8,
		flexDirection: 'row',
		backgroundColor: '#edeff2',
	},
})

export default class AddRouteScreen extends React.Component {

    state = {
        startPoint : '',
        endPoint : '',
        note : '',
        date : '',
        time : '',
    }

    setStartPoint = (data) => (
        this.setState({startPoint: data})
    )
    setEndPoint = (data) => (
        this.setState({endPoint: data})
    )
    setNote = (data) => (
        this.setState({note: data})
    )
    setDate = (data) => (
        this.setState({date: data})
    )
    setTime = (data) => (
        this.setState({time: data})
    )

    addRoute = async (newRoute) => {
        const response = await addNewRoute(newRoute)
        console.log(response)
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.main} behavior='padding'>
                <TextInput style={styles.textbox} placeholder='Start point' value={this.state.startPoint} onChangeText={this.setStartPoint} />
                <TextInput style={styles.textbox} placeholder='Destination' value={this.state.endPoint} onChangeText={this.setEndPoint} />
                <TextInput style={styles.textbox} multiline={true} placeholder='Notes' value={this.state.note} onChangeText={this.setNote} />
                <TextInput style={styles.textbox} placeholder='Date' value={this.state.date} onChangeText={this.setDate} />
                <TextInput style={styles.textbox} placeholder='Time' value={this.state.time} onChangeText={this.setTime} />
                <Button title="Add route" onPress={this.addRoute} />
            </KeyboardAvoidingView>
        );
    }
}