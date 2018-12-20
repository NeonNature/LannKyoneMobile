import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Modal, Portal, TextInput, Button, Card, Title, Paragraph, List, Checkbox, FAB } from 'react-native-paper';

import Communications from 'react-native-communications';
import TimerMixin from 'react-timer-mixin';
import { getPendingByUser, requestRoute, getRoutes } from '../api/api';
import { userData } from '../api/data';

const mapstyles= StyleSheet.create({
textInput: {
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

});


var userID = userData.id;

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
		flex: 1,
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



  handleStart = (startPoint) => {
        this.setState({startPoint: startPoint})
    }

    handleEnd = (endPoint) => {
        this.setState({endPoint: endPoint})
    }



	static navigationOptions = ({navigation}) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		this.state = {
			route: [],
			expand: false,
			expanded: {},
       visible: false,
      routes: [],
      startPoint: '',
      endPoint: '',
      userID: '',
      routeID: '',
		};
	}

mount = async () => {
  const routeData = await getRoutes(userData.university)
  this.setState({routes : routeData, userID : userData.id})


    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/pending/${this.state.userID}`)
    const responsedata = await response.json()
    this.setState({route: responsedata.data})
}

	async componentDidMount () {
    this.mount
    TimerMixin.setTimeout.call(this, async() =>{ 
		  this.mount
    },15000);
	}

     _handlePress = () =>
    this.setState({
      expand: !this.state.expand
    });


request = async() => {

        const response = await requestRoute(this.state)
        console.log(response)
        
        if(response.ok) {
			this.setState({visible : false})
            Alert.alert(
                'Success!',
                'ၾကိတ္လိုက္ျပီ ခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('PassengerMain') ,style: 'default'},
                ]
            )
        } else {
			Alert.alert(
				'Error!',
				'Something went wrong :(',
				[
					{text : 'OK', style : 'default'},
				]
			)
		}
    }


  _showModal = (route) => {
	  this.setState({ visible: true, routeID: route })
  }
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
		
		(this.state.route && this.state.route.startPoint !== undefined) ? <View style={styles.container}><ScrollView style={styles.main}>
			<List.Accordion
			key={this.state.route.id}
				style={styles.list}
				title = {`${this.state.route.startPoint} - ${this.state.route.endPoint}`}
				description={this.state.route.date}
				left={props => <List.Icon {...props} icon="map" />}
			>
			<List.Item 
				style={styles.lists} 
				title={this.state.route.name}
				left={props => <List.Icon {...props} icon='directions-car'  style={styles.duck} /> } 
			/>
			<List.Item 
				style={styles.lists} 
				title={this.state.route.rating} 
				left={props => <List.Icon {...props} icon={require('../assets/duck.png')}  style={styles.duck} /> }
			/>
		      <List.Item 
		        style={styles.lists} 
		        title={this.state.route.notes} 
		        left={props => <List.Icon {...props} icon="gps-fixed"  style={styles.duck} /> }
		      />
			<List.Item 
		        style={styles.flist} 
		        title={this.state.route.phone} 
		        onPress={() => Communications.phonecall(this.state.route.phone, true)}
		        left={props => <List.Icon {...props} icon="gps-fixed"  style={styles.duck} /> }
		      />
		</List.Accordion> 
		
  				</ScrollView>
  				<FAB
    				style={styles.track}
    				color="white"
    				icon="gps-fixed"
    				onPress={()=>this.props.navigation.navigate('Track')}
  				/>
  				</View>
		: 
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
      <List.Item 
        style={mapstyles.lists} 
        title={route.notes} 
        left={props => <List.Icon {...props} icon="gps-fixed"  style={mapstyles.duck} /> }
      />
			<List.Item style={mapstyles.flist} title="Request" onPress={()=>{
				this.setState({routeID : route.id, visible: true})
				console.log(this.state.routeID)
			}} />
		</List.Accordion>
		))}
    </ScrollView>
				
		
		
		);
	}
}