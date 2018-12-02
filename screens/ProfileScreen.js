import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';

import { userData, setUserData } from '../api/data';

const styles= StyleSheet.create({
	main : {
		paddingTop : 30,
		alignItems : 'center',
		flex : 1,
	},
	image : {
		width: 120,
		height: 120,
	},
	buttonView : {
		height : 60,
		flex: 0,
		flexDirection: 'row',
	},
	historyButton : {
		width : Dimensions.get('window').width/2,
		paddingTop : 15,
		backgroundColor : '#c239b1',
		alignItems: 'center',
	},
	shareButton : {
		width : Dimensions.get('window').width/2,
		paddingTop : 15,
		backgroundColor : '#803176',
		alignItems: 'center',
	},
	buttonText : {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
	lkp : {
		paddingTop : 15,
		paddingBottom : 15, 
		fontSize : 15,
		fontWeight : 'bold',
	},
	content : {
		padding : 20,
		backgroundColor : '#f2f1f2',
		width : Dimensions.get('window').width*0.75,
		height : 190,
		borderRadius : 40,
		alignItems : 'center',
	},
	paymentButton : {
		width : 170,
		height : 55,
		padding : 15,
		borderRadius : 40,
		backgroundColor : '#9e005d',
		alignItems : 'center',
	},
	logoutButton : {
		width : 170,
		height : 55,
		padding : 15,
		borderRadius : 40,
		backgroundColor : '#464646',
		alignItems : 'center',
	},
})

export default class ProfileScreen extends React.Component {
	state = {
		user : {},
	}

	componentDidMount() {
		this.getData()
	}

	getData = async () => {
		const data = userData
		this.setState({user : data})
	}

	showHistory = () => {

	}

	shareProfile = () => {

	}

	logout = () => {
		setUserData({})
		this.props.navigation.navigate('Login')
	}

  	render() {
		if(this.state.user.role=="Driver")
		{
			return (
				<View style={styles.main}>
					<Image source={require('../assets/profile.png')} style={styles.image} />
					<Text style={styles.lkp} >1500 LKP</Text>

					<View style={styles.buttonView}>
						<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
							<Text style={styles.buttonText}>History</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareButton} onPress={this.shareProfile}>
							<Text style={styles.buttonText}>Share</Text>
						</TouchableOpacity>
					</View>
					<View style={{padding : 10}}></View>

					<View style={styles.content}>
						<Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.state.user.name}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.university}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.phone}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.carNumber}</Text>
					</View>
					<Text style={{fontSize: 17, fontWeight: 'bold'}}><Image source={require('../assets/duck.png')} style={{width: 32, height: 32}}/> x{this.state.user.rating}</Text>
					<View style={{padding : 10}}></View>

					<TouchableOpacity style={styles.paymentButton} onPress={this.showHistory}>
						<Text style={styles.buttonText}>Payment</Text>
					</TouchableOpacity>
					<View style={{padding : 7}}></View>

					<TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>

				</View>
			);
		}
		
		return (
			<View style={styles.main}>
					<Image source={require('../assets/profile.png')} style={styles.image} />
					<View style={{marginVertical : 5}}></View>
					<View style={styles.buttonView}>
						<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
							<Text style={styles.buttonText}>History</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareButton} onPress={this.shareProfile}>
							<Text style={styles.buttonText}>Share</Text>
						</TouchableOpacity>
					</View>
					<View style={{padding : 10}}></View>

					<View style={styles.content}>
						<Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.state.user.name}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.university}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.phone}</Text>
						<Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 18}}>{this.state.user.carNumber}</Text>
					</View>
					<Text style={{fontSize: 17, fontWeight: 'bold'}}><Image source={require('../assets/duck.png')} style={{width: 32, height: 32}}/> x1000 (153)</Text>
					<View style={{padding : 10}}></View>

					<TouchableOpacity style={styles.paymentButton} onPress={this.showHistory}>
						<Text style={styles.buttonText}>Payment</Text>
					</TouchableOpacity>
					<View style={{padding : 7}}></View>

					<TouchableOpacity style={styles.logoutButton} onPress={this.showHistory}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>

				</View>
		);
  	}
}