import React, { Component } from 'react';

import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';

import { Button, Title, Paragraph, List, Checkbox } from 'react-native-paper';

import Expo from 'expo';





import { getRoutes } from '../api/api';

const mapstyles= StyleSheet.create({



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

    state = {
      expanded: {},

      routes: [],
    }



  async componentDidMount() {
	const routeData = await getRoutes()
	this.setState({routes : routeData})
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



  render() {

    return (
    <ScrollView style={mapstyles.main}>
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
			<List.Item style={mapstyles.flist} title="Request" />
		</List.Accordion>
		))}
    </ScrollView>

    

    );

  }

}