import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, StyleSheet } from 'react-native';
import { TextInput, Card, Button, Divider } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { addNewRoute } from '../api/api';
import { userData } from '../api/data';

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
      startPoint: '',
      endPoint: '',
      date: 'Pick Date and Time',
      userID : '',
      isDateTimePickerVisible: false,
    };
  }

  componentDidMount() {
    this.setState({userID : userData.id})
  }


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.setState({date : moment(date).format('MMMM Do, h:mm:ss a')})
    this.hideDateTimePicker();
  };

  handleStart = (startPoint) => {
        this.setState({startPoint: startPoint})
    }

    handleEnd = (endPoint) => {
        this.setState({endPoint: endPoint})
    }

    create = async() => {

        const response = await addNewRoute(this.state)
        console.log(response)
        
        if(response.ok ) {
            Alert.alert(
                'Success!',
                'ၾကိတ္လိုက္ျပီ ခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('RouteList') ,style: 'default'},
                ]
            )
        } 
    }


  render() {
    return (
      <KeyboardAwareScrollView style={styles.main} alignItems='center' justifyContent='center'>
      <Card style={styles.card}>
      <Card.Content>
            <TextInput 
              value={this.state.startPoint}
              label="Starting Point"
              onChangeText={this.handleStart}
              underlineColor="#803176"
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.endPoint}
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
              {this.state.date}
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