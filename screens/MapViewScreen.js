import React, { Component } from 'react';

import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';

import { Modal, Portal, TextInput, Button, Title, Paragraph, List, Checkbox } from 'react-native-paper';

import Expo from 'expo';




import { userData } from '../api/data';
import { getRoutes } from '../api/api';

const mapstyles= StyleSheet.create({

textInput: {
  alignItems: 'center',
    marginTop: 20,
    width: 250,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  modalview: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
  },

  main : {

    marginTop: 20,

    marginLeft: 20,

    marginRight: 20,

    marginBottom: 50,

  },

  list: {

    backgroundColor: 'white',

    borderRadius: 50,

    shadowOffset: { width: 3, height: 3 },  
    shadowColor: 'black',  
    shadowOpacity: 1,  
    elevation: 3,  
    zIndex:10, 

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

    shadowOffset: { width: 3, height: 3 },  
    shadowColor: 'black',  
    shadowOpacity: 1,  
    elevation: 3,  
    zIndex:10, 

    alignItems: 'center',

  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  reqbtn: {
    marginTop: 50,
    elevation: 10
  },

  flist: {

    backgroundColor: 'white',

    width: '70%',

    marginTop: 5,

    marginLeft: '15%',

    marginRight: '15%',

    marginBottom: 5,

    borderRadius: 25,  

    shadowOffset: { width: 3, height: 3 },  
    shadowColor: 'black',  
    shadowOpacity: 1,  
    elevation: 3,  
    zIndex:10, 

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

    state = {
      expanded: {},
       visible: false,
      routes: [],
      startPoint: '',
      endPoint: '',
      userID: '',
      routeID: '',
    }

  handleStart = (startPoint) => {
        this.setState({startPoint: startPoint})
    }

    handleEnd = (endPoint) => {
        this.setState({endPoint: endPoint})
    }

  async componentDidMount() {
	const routeData = await getRoutes()
	this.setState({routes : routeData})
  this.setState({userID : userData.id})
  }

request = async() => {

        const response = await request(this.state)
        console.log(response)
        
        if(response.ok ) {
            Alert.alert(
                'Success!',
                'ၾကိတ္လိုက္ျပီ ခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('RouteList') ,style: 'default'},
                ]
            )
        } else {
          console.error('error!')
        }
    }


  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

    toggle(name) {
   this.setState({
        expanded: {
            ...this.state.expanded,
            [name]: !this.state.expanded[name]
        }
    });
}

  render() {

    return (
    <ScrollView style={mapstyles.main}>
      <Portal>
        <Modal visible={this.state.visible} onDismiss={this._hideModal} style={mapstyles.modal}>
          <View style={mapstyles.modalview}>
          <TextInput 
              value={this.state.startPoint}
              label="Starting Point"
              onChangeText={this.handleStart}
              underlineColor="#803176"
              style={mapstyles.textInput}
            />
            <TextInput 
              value={this.state.endPoint}
              label="Ending Point"
              onChangeText={this.handleEnd}
              underlineColor="#803176"
              style={mapstyles.textInput}
             />
             <Button
                  style={mapstyles.reqbtn}
                    onPress={this.request}
                    color="green"
                    mode="contained"
                    dark={true}>
                  Request
            </Button>
            </View>
        </Modal>
      </Portal>
		{this.state.routes.map((route)=>(
			<List.Accordion
			key={route.id}
				style={mapstyles.list}
				title = {`${route.startPoint} - ${route.endPoint}`}
				description={route.date}
				left={props => <List.Icon {...props} icon="map" />}
		>
			<List.Item 
				style={mapstyles.lists} 
				title={route.name}
				left={props => <List.Icon {...props} icon='directions-car'  style={mapstyles.duck} /> } 
			/>
			<List.Item 
				style={mapstyles.lists} 
				title={route.rating} 
				left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={mapstyles.duck} /> }
			/>
			<List.Item style={mapstyles.flist} title="Request" onPress={this._showModal} />
		</List.Accordion>
		))}
    </ScrollView>

    

    );

  }

}