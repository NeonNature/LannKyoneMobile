import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, Alert, AsyncStorage } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph, List, Checkbox, Divider, FAB } from 'react-native-paper';
import Communications from 'react-native-communications';

import { getRequests, respondRequest } from '../api/api';
import { routeData, userData, setRouteData, setUserData } from '../api/data';

const styles= StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
	/*flist: {
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
	},*/
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
  	track: {
    	position: 'absolute',
    	backgroundColor: 'green',
    	margin: 16,
    	left: 0,
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
			id: '',
			route : {},
			requests : [],
			pendings : [],
			requestID : '',
			status : '',
			expanded: false,
		};
	}

	async componentDidMount() {
		if(userData.id) {
			this.setState({id: userData.id})
			await fetch(`https://api.innovatorymm.com/api/v1/routes/user/${userData.id}`)
				.then((response)=>
					response.json()
				)
				.then((responseData)=> {
					setRouteData(responseData)
					this.setState({route: responseData})
					this.getRequestData()
				})
		} else {
			await AsyncStorage.getItem('userData')
				.then((data)=> {
					setUserData(JSON.parse(data))
					this.setState({id: userData.id})
					return fetch(`https://api.innovatorymm.com/api/v1/routes/user/${JSON.parse(data).id}`)
				})
				.then((response)=>
					response.json()
				)
				.then((responseData)=> {
					setRouteData(responseData)
					this.setState({route: responseData})
					this.getRequestData()
				})
		}
		
	}

	async componentWillReceiveProps() {
		this.setState({route: routeData})

		const response = await getRequests(this.state.route.id)
		const data = await response.json()

		const requests = data.filter((request)=>request.status=="Confirmed")
		const pendings = data.filter((request)=>request.status=="Pending")
		this.setState({requests : requests, pendings : pendings})
	}

	getRequestData = async() => {
		const rresponse = await getRequests(userData.id)
		const data = await rresponse.json()
		console.log(data)
		const requests = data.filter((request)=>request.status=="Confirmed")
		const pendings = data.filter((request)=>request.status=="Pending")
		this.setState({requests : requests, pendings : pendings})
	}

	accept = async (rid) => {
		this.setState({status : 'Confirmed', requestID : rid})
		const request = {
			requestID : rid,
			status : 'Confirmed',
		}
		const response = await respondRequest(request)

		if (response.ok)
		{
			Alert.alert(
				'Success',
				'Request accepted successfully!',
				[
					{text: 'OK', style : 'default'},
				]
			)
			this.getRequestData()
		}
	}

	reject = async() => {
		this.setState({status : 'Declined', requestID : rid})
		const request = {
			requestID : rid,
			status : 'Declined',
		}
		const response = await respondRequest(request)

		if (response.ok)
		{
			Alert.alert(
				'Success',
				'Request declined successfully!',
				[
					{text: 'OK', style : 'default'},
				]
			)
			this.getRequestData()
		}
	}

     _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

	render() {
		return (
		
		(this.state.route && this.state.route.startPoint !== undefined) ? 
		<View style={styles.container}>
<ScrollView style={styles.main}>
			<List.Accordion
				 style={styles.list}
         		 title={`${this.state.route.startPoint} - ${this.state.route.endPoint}`}
         		 description={`${this.state.route.passenger}/4`}
         		 left={props => <List.Icon {...props} icon="map" />}
         		 expanded={this.state.expanded}
         		 onPress={this._handlePress}
        	>
          		{this.state.requests.map((request)=>(
					  <List.Item
					  key={request.id}
					  style={styles.lists} 
					  title={request.name} 
					  description={request.phone}
					  onPress={() => Communications.phonecall(request.phone, true)}
					  left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} />}
					  />
				))}
				  
        	</List.Accordion>
        	<Divider style={styles.divider}/>

				{this.state.pendings.map((pending)=>(
					<Card style={styles.noti} key={pending.id}>
						<Card.Content style={styles.center}>
						<Title> {pending.name}</Title>
						<Paragraph><Image source={require('../assets/duck.png')} style={styles.duck} /> x {pending.rating}</Paragraph>
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
							onPress={()=>(this.accept(pending.id))}
							/>
						</Card.Actions>
					</Card>
				))}

		</ScrollView><FAB
    				style={styles.track}
    				color="white"
    				icon="gps-fixed"
    				onPress={()=>{this.props.navigation.navigate('Track')}}
  				/></View> : 
  				<View style={styles.container}>
	  				<View style={styles.center}>
	  					<Text>No current routes!</Text>
	  				</View>
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