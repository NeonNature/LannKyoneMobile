import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph, List, Checkbox, Divider } from 'react-native-paper';
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
		elevation: 4
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
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,		
		elevation: 4
	},
	noti: {
		marginTop: 5,
		elevation: 4
	},
	center: {
		alignItems: 'center',
	},
	ricon: {
			right: 10,
			position: 'absolute',
			marginBottom: 5
	},
	divider: {
		marginTop: 10,
		marginBottom: 5
	},
	duck : {
		width: 25,
		height: 25
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
      requester: 'Waing La Min Lwin',
      expanded: false,
    };
  }



	render() {
		return (
		<ScrollView>
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
        	<Divider style={styles.divider}/>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x 212</Paragraph>
				      <Paragraph>09440259616</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						/>
				    </Card.Actions>
				</Card>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x 212</Paragraph>
				      <Paragraph>09440259616</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						/>
				    </Card.Actions>
				</Card>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x 212</Paragraph>
				      <Paragraph>09440259616</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						/>
				    </Card.Actions>
				</Card>
		</View>
		</ScrollView>
		);
	}
}