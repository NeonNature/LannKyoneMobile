import React from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet, Button, AlertIOS, DatePickerIOS, View, TouchableOpacity } from 'react-native';

import {addNewRoute} from '../api/api';

const styles= StyleSheet.create({
	main : {
        flex : 1,
		alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
	},
	textbox : {
		borderWidth: 1,
		borderColor: 'black',
		minWidth: 320,
		minHeight: 35,
		margin: 10,
		borderRadius: 8,
		backgroundColor: '#edeff2',
    },
    datepicker : {
        minWidth: 320,
		minHeight: 35,
		margin: 10,
		borderRadius: 8,
		backgroundColor: '#edeff2',
    }
})

export default class AddRouteScreen extends React.Component {

    static navigationOptions = () => ({
        headerTitle: 'Add new route',
    })

    state = {
        startPoint : '',
        endPoint : '',
        note : '',
        date : new Date(),
        time : '',
        showDatePicker : false,
        showDate : '',
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

    toggleDatePicker = () => {
        console.log(this.state.date.getDate())
        this.setState({
            showDatePicker : !this.state.showDatePicker,
        })
    }

    addRoute = async (newRoute) => {
        const response = await addNewRoute(newRoute)
        if(response.ok) {
            AlertIOS.alert(
                'Success!',
                'Your route is successfully created',
                () => (
                    this.props.navigation.navigate('RouteList')
                )
            )
        }
    }

    render() {

        const datepickershow = this.state.showDatePicker ? 
            <DatePickerIOS
                style= {styles.datepicker}
                date= {this.state.date}
                onDateChange = {this.setDate}
            /> : <View />

        return (
            <KeyboardAvoidingView style={styles.main} behavior='padding'>
                <TextInput style={styles.textbox} placeholder='Start point' value={this.state.startPoint} onChangeText={this.setStartPoint} />
                <TextInput style={styles.textbox} placeholder='Destination' value={this.state.endPoint} onChangeText={this.setEndPoint} />
                <TextInput style={styles.textbox} multiline={true} placeholder='Notes' value={this.state.note} onChangeText={this.setNote} />
                
                <TouchableOpacity style={styles.textbox}
                                  onPress={this.toggleDatePicker}>
                </TouchableOpacity>
                {datepickershow}

                <Button title="Add route" onPress={()=>(this.addRoute(this.state))} />
            </KeyboardAvoidingView>
        );
    }
}