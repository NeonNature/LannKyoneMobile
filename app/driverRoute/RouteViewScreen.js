import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, Alert, AsyncStorage } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph, List, Checkbox, Divider, FAB } from 'react-native-paper';
import Communications from 'react-native-communications';
import TimerMixin from 'react-timer-mixin';
import { getRoutesByUser, getRequests, respondRequest } from './api';
import { routeData, userData, setRouteData, setUserData } from '../../data/data';

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
			bottom: 7
	},
	licon: {
			left: 10,
			position: 'absolute',
			bottom: 7
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
		this.getCurrentRoute()
		 TimerMixin.setTimeout.call(this, async() =>{
			this.start2()
		},15000);
	}

	getCurrentRoute = async () => {
		if(userData.id) {
			this.setState({id: userData.id})
			await getRoutesByUser(userData.id)
				.then((responseData)=> {
					setRouteData(responseData)
					this.setState({route: responseData})
					this.getRequestData()
				})
		}
	}

	start2 = async () => {
		this.setState({route: routeData})

		const response = await getRequests(this.state.route.id)
		const data = await response.json()

		const requests = data.filter((request)=>request.status=="Confirmed")
		const pendings = data.filter((request)=>request.status=="Pending")
		this.setState({requests : requests, pendings : pendings})
	}

	async componentWillReceiveProps() {
		this.start2()
		TimerMixin.setTimeout.call(this, async() =>{
			this.start2()
		},15000);
	}

	getRequestData = async() => {
		const rresponse = await getRequests(this.state.route.id)
		const data = await rresponse.json()
		const requests = data.filter((request)=>request.status=="Confirmed")
		const pendings = data.filter((request)=>request.status=="Pending")
		this.setState({requests : requests, pendings : pendings})
	}

	accept = async (rid) => {
		if(userData.point>=300)
		{
			userData.point = userData.point - 300
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
		} else {
			Alert.alert(
				'Error!',
				'Low point balance! Please purchase more points to accept more passengers.',
				[
					{text: 'Cancel', style : 'cancel'},
					{text: 'Topup', onPress : ()=>this.props.navigation.navigate('Payment'),style : 'default'},
				]
			)
		}
	}

	reject = async(rid) => {
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
		
		(routeData && this.state.route.startPoint !== undefined) ? 
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
					  left={props => <List.Icon {...props} icon={require('../../assets/duck.png')}  style={styles.duck} />}
					  />
				))}
				  
        	</List.Accordion>
        	<Divider style={styles.divider}/>

				{this.state.pendings.map((pending)=>(
					<Card style={styles.noti} key={pending.id}>
						<Card.Content style={styles.center}>
						<Title> {pending.name}</Title>
						<Paragraph><Image source={require('../../assets/duck.png')} style={styles.duck} /> x {pending.rating}</Paragraph>
						</Card.Content>
						<Card.Actions style={styles.center}>
						<IconButton	
							style={styles.licon}		
							icon="cancel"
							color="red"
							size={25}
							onPress={()=>(this.reject(pending.id))}
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