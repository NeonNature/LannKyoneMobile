import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, IconButton, Card, Title, List, Checkbox } from 'react-native-paper';
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
	},
	lists: {
		backgroundColor: 'white',
		width: '70%',
		marginTop: 5,
		marginLeft: '15%',
		marginRight: '15%'
	},
	flist: {
		backgroundColor: 'white',
		width: '70%',
		marginTop: 5,
		marginLeft: '15%',
		marginRight: '15%',
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25
	},
	noti: {
		marginTop: 5
	},
	center: {
		alignItems: 'center',
	}
})

export default class RouteViewScreen extends Component {
/*
	static navigationOptions = ({navigation}) => ({
		headerTitle: 'Routes',
		headerRight: (
			<Button title='+ Add' onPress={ ()=>(navigation.navigate('AddRoute')) } color='#31c3e0' />
		),
	})
*/

 _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });


constructor(props) {
    super(props);
    this.state = {
      requester: 'PK',
      expanded: false,
    };
  }



	render() {
		return (

		<View style={styles.main}>
			<List.Accordion
				 style={styles.list}
         		 title="YTU - Junction City"
         		 description="2/4"
         		 left={props => <List.Icon {...props} icon="map" />}
         		 expanded={this.state.expanded}
         		 onPress={this._handlePress}
        	>
          		<List.Item style={styles.lists} title="PK" />
          		<List.Item style={styles.flist} title="Chit Poat" />
        	</List.Accordion>
				<Card style={styles.noti}>
				    <Card.Content>
				      <Title> {this.state.requester} has requested!</Title>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						/>
				      <IconButton
  						  icon="done"
  						  color="green"
  						  size={25}
  						/>
				      <IconButton
  						  icon="menu"
  						  color="silver"
  						  size={25}
  						/>
				    </Card.Actions>
				</Card>
		</View>
		);
	}
}