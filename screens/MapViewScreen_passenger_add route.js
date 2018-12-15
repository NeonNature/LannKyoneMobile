import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Portal, Modal, Button, Title, Paragraph, List, Checkbox } from 'react-native-paper';
import Expo from 'expo';


import { getRoutes } from '../api/api';

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
    elevation: 4,
    alignItems: 'center',
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
      expanded: {},
      routes: {},
      visible: false,
    };
  }

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });


  async componentDidMount() {

    const routes = await getRoutes()
    this.setState({routes : routes})

  }



 request = () => {
        console.log('Accept Quack');

    }

    toggle(name) {
   this.setState({
        expanded: {
            ...this.state.expanded,
            [name]: !this.state.expanded[name]
        }
    });
}


    generateRoutes = () => {

      for (let routes of this.state.routes) {

      return (

      <List.Accordion
         style={styles.list}
             title = {`${routes.start} - ${routes.end}`}
             description={routes.time}
             left={props => <List.Icon {...props} icon="map" />}
             expanded={this.state.expanded[`${routes.name}`]}
             onPress={this.toggle(`${routes.name}`)}
          >
              <List.Item 
              style={styles.lists} 
              title={routes.name}
              left={props => <List.Icon {...props} icon='directions-car'  style={styles.duck} /> } 
              />
              <List.Item 
              style={styles.lists} 
              title={routes.rating} 
              left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} /> }
              />
              <List.Item style={styles.flist} title="Request" />
          </List.Accordion>

        ); 
    }
  }

  render() {
    return (
    <ScrollView style={styles.main}>
    <Portal>
        <Modal visible={visible} onDismiss={this._hideModal}>
          <Text>Example Modal</Text>
        </Modal>
      </Portal>

        {this.generateRoutes}      
    </ScrollView>
    
    );
  }
}