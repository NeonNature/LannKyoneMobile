import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { userData, setUserData } from '../../api/data';

const styles= StyleSheet.create({
	main : {
		paddingTop : hp('5%'),
	},
	image : {
		width: 120,
		height: 120,
	},
	buttonView : {
		height : hp('7.5%'),
		flex: 0,
		flexDirection: 'row',
	},
	historyButton : {
		width : Dimensions.get('window').width/2,
		padding : hp('2%'),
		backgroundColor : '#c239b1',
		alignItems: 'center',
	},
	shareButton : {
		width : Dimensions.get('window').width/2,
		padding : hp('2%'),
		backgroundColor : '#803176',
		alignItems: 'center',
	},
	buttonText : {
		color: '#fff',
		fontSize: hp('3%'),
		fontWeight: 'bold',
	},
	lkp : {
		padding : hp('2%'),
		fontSize : hp('2%'),
		fontWeight : 'bold',
	},
	content : {
		marginVertical : hp('2%'),
		padding : hp('3%'),
		backgroundColor : '#f2f1f2',
		width : Dimensions.get('window').width*0.75,
		height : hp('25%'),
		borderRadius : 40,
		alignItems : 'center',
	},
	paymentButton : {
		marginVertical : hp('1%'),
		width : wp('40%'),
		height : hp('7.5%'),
		padding : hp('2%'),
		borderRadius : 40,
		backgroundColor : '#9e005d',
		alignItems : 'center',
	},
	logoutButton : {
		marginVertical : hp('1%'),
		width : wp('40%'),
		height : hp('7.5%'),
		padding : hp('2%'),
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

	componentWillReceiveProps() {
		this.setState({user : userData})
	}

	getData = () => {
		//const data = await getUser()
		const data = userData
		this.setState({user : data})
	}

	showHistory = () => {
		this.props.navigation.navigate('History')
	}

	shareProfile = () => {

	}

	payment = () => {
		this.props.navigation.navigate('Payment')
	}

	logout = () => {
		const data = {}
		console.log(data)
		setUserData(data)
		this.props.navigation.navigate('Login')
	}

  	render() {
		if(this.state.user.role=="Driver")
		{
			return (
				<ScrollView style={styles} >
					<Image source={require('../../assets/profile.png')} style={styles.image} />
					<Text style={styles.lkp} >{this.state.user.point} LKP</Text>

					<View style={styles.buttonView}>
						<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
							<Text style={styles.buttonText}>History</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareButton} onPress={this.shareProfile}>
							<Text style={styles.buttonText}>Share</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.content}>
						<Text style={{fontSize: hp('3.5%'), fontWeight: 'bold'}}>{this.state.user.name}</Text>
						<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', paddingTop: hp('1.7%')}}>{this.state.user.university}</Text>
						<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', paddingTop: hp('1.7%')}}>{this.state.user.phone}</Text>
						<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', paddingTop: hp('1.7%')}}>{this.state.user.carNumber}</Text>
					</View>
					<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold'}}><Image source={require('../../assets/duck.png')} style={{width: 32, height: 32}}/> x{this.state.user.rating}</Text>

					<TouchableOpacity style={styles.paymentButton} onPress={this.payment}>
						<Text style={styles.buttonText}>Payment</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>

				</ScrollView>
			);
		}
		
		return (
			<ScrollView style={styles.main} contentContainerStyle={{
				alignItems : 'center'}}>
				<Image source={require('../../assets/profile.png')} style={styles.image} />
				<View style={{marginVertical : 5}}></View>
				<View style={styles.buttonView}>
					<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
						<Text style={styles.buttonText}>History</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.shareButton} onPress={this.shareProfile}>
						<Text style={styles.buttonText}>Share</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.content}>
					<Text style={{fontSize: hp('3.5%'), fontWeight: 'bold'}}>{this.state.user.name}</Text>
					<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', paddingTop: hp('1.7%')}}>{this.state.user.university}</Text>
					<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', paddingTop: hp('1.7%')}}>{this.state.user.phone}</Text>
				</View>

				<Text style={{fontSize: hp('2.2%'), fontWeight: 'bold'}}><Image source={require('../../assets/duck.png')} style={{width: 32, height: 32}}/> x{this.state.user.rating}</Text>

				<TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>

			</ScrollView>
		);
  	}
}