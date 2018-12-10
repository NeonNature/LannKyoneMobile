import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Card, Button, Divider } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { userRegister, profileUpload } from '../api/api';

const styles= StyleSheet.create({
  main: {
    backgroundColor: '#ecf0f1',
  },
  textInput: {
    marginTop: 20,
    width: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  card: {
    marginTop: 25,
    elevation: 4,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  createbtn: {
    marginTop: 50,
    elevation: 10
  },
  datebtn: {
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 20,
  }
})

export default class MapViewScreen extends Component {

static navigationOptions = ({navigation}) => ({
        headerTitle: 'Add Route',
        headerRight: (
            <Button title='Back' onPress={ ()=>(navigation.navigate('Route')) } color='#803176' />
        ),
    })

constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      datetime: 'Pick Date and Time',
      modalVisibility: false,
      isDateTimePickerVisible: false,
  
    };
  }


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (datetime) => {
    this.setState({datetime : moment(datetime).format('MMMM Do, h:mm:ss a')})
    this.hideDateTimePicker();
  };

  toggleModal = () => {
        this.setState({modalVisibility : true})
    }

  handleStart = (start) => {
        this.setState({start: start})
    }

    handleEnd = (end) => {
        this.setState({end: end})
    }

    create = async() => {
       /* 
        const response = await userRegister(this.state)
        
        if(response.ok ) {
            Alert.alert(
                'Success!',
                'ၾကိတ္လိုက္ျပီခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('Routes') ,style: 'default'},
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
        } */
    }


  render() {
    return (
      <KeyboardAwareScrollView style={styles.main} alignItems='center' justifyContent='center'>
      <Card style={styles.card}>
      <Card.Content>
            <TextInput 
              value={this.state.start}
              label="Starting Point"
              onChangeText={this.handleStart}
              underlineColor="#803176"
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.start}
              label="Ending Point"
              onChangeText={this.handleEnd}
              underlineColor="#803176"
              style={styles.textInput}
             />
             <Button
             style={styles.datebtn}
              onPress={this.showDateTimePicker}
              color="#803176"
              mode="contained"
              dark={true}
              >
              {this.state.datetime}
              </Button>
               <DateTimePicker
                 isVisible={this.state.isDateTimePickerVisible}
                 onConfirm={this.handleDatePicked}
                 onCancel={this.hideDateTimePicker}
                 mode="datetime"
               />
               <Divider />
             <Button
                  style={styles.createbtn}
                    onPress={this.create}
                    color="green"
                    mode="contained"
                    dark={true}>
                  Create
            </Button>
      </Card.Content>
      </Card>
           
      </KeyboardAwareScrollView>
    );
  }
}