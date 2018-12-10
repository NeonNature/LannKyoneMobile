import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph, List, Checkbox, Divider, FAB } from 'react-native-paper';
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
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,		
		elevation: 4
	},
	noti: {
		marginTop: 5,
		elevation: 4,
    	marginTop: 5,
    	marginLeft: 5,
    	marginRight: 5,
    	marginBottom: 5,
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
	},
	fab: {
    	position: 'absolute',
    	backgroundColor: '#803176',
    	margin: 16,
    	right: 0,
    	bottom: 0,
  	},
})

export default class RouteViewScreen extends Component {

	static navigationOptions = ({navigation}) => ({
		header: null,
	})






constructor(props) {
    super(props);
    this.state = {
      requester: 'Waing La Min Lwin',
      expanded: false,
      rating: 123,
      phone: '09440259616'
    };
  }

 accept = () => {
        console.log('Accept Quack');

    }

 reject = () => {
        console.log('Reject Quack');

    }

     _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

	render() {
		return (
		
		<View>
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
          		onPress={this.reject}
          		style={styles.lists} 
          		title={this.state.requester} 
          		description={this.state.phone}
          		left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} />}
          		/>
          		<List.Item style={styles.flist} title="Chit Poat" />
        	</List.Accordion>
        	<Divider style={styles.divider}/>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x {this.state.rating}</Paragraph>
				      <Paragraph>{this.state.phone}</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						  onPress={this.reject}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						  onPress={this.accept}
  						/>
				    </Card.Actions>
				</Card>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x {this.state.rating}</Paragraph>
				      <Paragraph>{this.state.phone}</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						  onPress={this.reject}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						  onPress={this.accept}
  						/>
				    </Card.Actions>
				</Card>

				<Card style={styles.noti}>
				    <Card.Content style={styles.center}>
				      <Title> {this.state.requester}</Title>
				      <Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x {this.state.rating}</Paragraph>
				      <Paragraph>{this.state.phone}</Paragraph>
				    </Card.Content>
				    <Card.Actions style={styles.center}>
				      <IconButton			
  						  icon="cancel"
  						  color="red"
  						  size={25}
  						  onPress={this.reject}
  						/>
				      <IconButton
				      	style={styles.ricon}
  						  icon="done"
  						  color="green"
  						  size={25}
  						  onPress={this.accept}
  						/>
				    </Card.Actions>
				</Card>
				</ScrollView>
				<FAB
    				style={styles.fab}
    				color="white"
    				icon="add"
    				onPress={()=>this.props.navigation.navigate('AddRoute')}
  				/>
		</View>
		
		);
	}
}