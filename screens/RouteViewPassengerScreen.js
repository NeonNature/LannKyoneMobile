import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, List, Checkbox, FAB } from 'react-native-paper';
import Communications from 'react-native-communications';

import { getPendingByUser } from '../api/api';
import { userData } from '../api/data';

const styles= StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
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
	},
	flist: {
		backgroundColor: 'white',
		width: '70%',
		marginTop: 5,
		marginLeft: '15%',
		marginRight: '15%',
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,		
		shadowOffset: { width: 3, height: 3 },  
    shadowColor: 'black',  
    shadowOpacity: 1,  
    elevation: 3,  
    zIndex:10, 
	},
	noti: {
		marginTop: 5,
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
	center: {
		alignItems: 'center',
	},
	ricon: {
			right: 10,
			position: 'absolute',
			marginBottom: 5
	},
	duck : {
		width: 25,
		height: 25
	},
  	track: {
    	position: 'absolute',
    	backgroundColor: 'green',
    	margin: 16,
    	left: 0,
    	bottom: 0,
  	},
})

export default class RouteViewPassengerScreen extends Component {

	static navigationOptions = ({navigation}) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		this.state = {
			route: [],
			expanded: false,
		};
	}

	async componentDidMount() {
		const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/pending/${userData.id}`)
		const responsedata = await response.json()
		this.setState({routes: responsedata.data})
	}


     _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

	render() {
		return (
		
		<View style={styles.container}>

		{this.state.route ? 
			<List.Accordion
			key={route.id}
				style={styles.list}
				title = {`${route.startPoint} - ${route.endPoint}`}
				description={route.date}
				left={props => <List.Icon {...props} icon="map" />}
		>
			<List.Item 
				style={styles.lists} 
				title={route.name}
				left={props => <List.Icon {...props} icon='directions-car'  style={styles.duck} /> } 
			/>
			<List.Item 
				style={styles.lists} 
				title={route.rating} 
				left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} /> }
			/>
		      <List.Item 
		        style={styles.lists} 
		        title={route.notes} 
		        left={props => <List.Icon {...props} icon="gps-fixed"  style={styles.duck} /> }
		      />
			<List.Item 
		        style={styles.flist} 
		        title={route.phone} 
		        onPress={() => Communications.phonecall(route.phone, true)}
		        left={props => <List.Icon {...props} icon="gps-fixed"  style={styles.duck} /> }
		      />
		</List.Accordion> : <View/>
  				 } 

  				 <FAB
    				style={styles.track}
    				color="white"
    				icon="gps-fixed"
    				onPress={()=>this.props.navigation.navigate('Track')}
  				/>
				
		</View>
		
		);
	}
}