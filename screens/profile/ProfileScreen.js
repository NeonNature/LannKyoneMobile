import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker, Permissions } from 'expo';

import { userData, setUserData } from '../../api/data';
import { getUser, profileUpload } from '../../api/api';

const styles= StyleSheet.create({
	main : {
		paddingTop : hp('5%'),
	},
	image : {
		width: hp('18%'),
		height: hp('18%'),
		borderRadius : hp('9%'),
	},
	buttonView : {
		height : hp('7.5%'),
		flex: 0,
		flexDirection: 'row',
	},
	historyButton : {
		width : Dimensions.get('window').width,
		padding : hp('2%'),
		backgroundColor : '#803176',
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
		formData : null,
	}

	async componentDidMount() {
		this.setState({user : userData})
	}

	componentWillReceiveProps() {
		this.setState({user : userData})
	}

	getData = () => {
		const data = userData
		this.setState({user : data})
	}

	changeProfile = async() => {
		let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        
        if(status !== 'granted') {
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing : true,
            aspect : [4, 3],
        })

        if(result.cancelled) {
            return
        }

        let localUri = result.uri
        let filename = `${this.state.user.id}.jpg`

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        let formData = new FormData()
		formData.append('photo', {uri: localUri, name: filename, type})
		
		this.setState({formData : formData, source : formData._parts[0][1].uri})
	
        const response = await profileUpload(this.state.formData)
		console.log(await response.json())
	}

	showHistory = () => {
		this.props.navigation.navigate('History')
	}

	shareProfile = () => {

	}

	payment = () => {
		this.props.navigation.navigate('Payment')
	}

	logout = async() => {
		const data = {}
		console.log(data)
		setUserData(data)
		try {
            await AsyncStorage.setItem('userData', '')
        } catch(err) {
            console.error(err)
        }
		this.props.navigation.navigate('Intro')
	}

  	render() {
		if(this.state.user.role=="Driver")
		{
			return (
				<ScrollView 
					style={styles.main} 
					contentContainerStyle={{alignItems : 'center'}} 
				>
					<TouchableOpacity onPress={this.changeProfile}>
						{this.state.user.profile === null ? (
							<Image source={require('../../assets/profile.png')} style={styles.image} />
						) : (
							<Image source={{uri : `https://api.innovatorymm.com/profiles/${this.state.user.profile}`}} style={styles.image} />
						)}
						
					</TouchableOpacity>
					<Text style={styles.lkp} >{this.state.user.point} LKP</Text>

					<View style={styles.buttonView}>
						<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
							<Text style={styles.buttonText}>History</Text>
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
				{this.state.user.profile === null ? (
					<Image source={require('../../assets/profile.png')} style={styles.image} />
				) : (
					<Image source={{uri : `https://api.innovatorymm.com/profiles/${this.state.user.profile}`}} style={styles.image} />
				)}
				<View style={{marginVertical : 5}}></View>
				<View style={styles.buttonView}>
					<TouchableOpacity style={styles.historyButton} onPress={this.showHistory}>
						<Text style={styles.buttonText}>History</Text>
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