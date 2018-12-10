import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Title, Paragraph, List, Checkbox } from 'react-native-paper';
import Expo from 'expo';

const styles= StyleSheet.create({

  main : {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  list: {
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 4,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  lists: {
    backgroundColor: 'white',
    width: '70%',
    marginTop: 5,
    marginLeft: '15%',
    marginRight: '15%',   
    elevation: 4
  },
  flist: {
    backgroundColor: 'white',
    width: '70%',
    marginTop: 5,
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: 5,
    borderRadius: 25,  
    elevation: 4
  },
  noti: {
    marginTop: 5,
    elevation: 4
  },
  center: {
    alignItems: 'center',
  },
  duck : {
    width: 25,
    height: 25
  },
})

export default class MapViewScreen extends Component {


constructor(props) {
    super(props);
    this.state = {
      requester: 'Waing La Min Lwin',
      expanded: false,
      rating: 123,
      phone: '09440259616'
    };
  }

 request = () => {
        console.log('Accept Quack');

    }

     _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
    <ScrollView style={styles.main}>
      <List.Accordion
         style={styles.list}
             title="YTU - Junction City"
             description="2/4"
             left={props => <List.Icon {...props} icon="map" />}
             expanded={this.state.expanded}
             onPress={this._handlePress}
          >
              <List.Item 
              style={styles.lists} 
              title={this.state.requester} 
              description={this.state.phone}
              left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} /> }
              />
              <List.Item style={styles.flist} title="Request" />
          </List.Accordion>
    </ScrollView>
    
    );
  }
}