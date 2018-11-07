import React from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native';
import Expo from 'expo';

import { getUser } from '../api/api';

const styles= StyleSheet.create({
	main : {
		paddingTop : 50,
		
	},
	textbox : {
		borderWidth: 1,
		borderColor: 'black',
		minWidth: 320,
		minHeight: 35,
		margin: 10,
		borderRadius: 8,
		flexDirection: 'row',
		backgroundColor: '#edeff2',
	},
	image : {
		width: 100,
		height: 70,
		paddingBottom: 100,
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
		const data = await getUser();
		this.setState({user : data})
	}

  	render() {
		if(this.state.user.role=="Driver")
		{
			return (
				<TouchableWithoutFeedback onPress={() => (Keyboard.dismiss)}>
					<ImageBackground source={require('../assets/profilebg.jpg')} style={{width: '100%', height: '100%'}}>
						<ScrollView style={styles.main} contentContainerStyle={{flexGrow: 1, alignItems: 'center', }}>
							<Image style={styles.image} source={require('../assets/profile.png')} />
							<TextInput style={styles.textbox} value={this.state.user.name} />
							<TextInput style={styles.textbox} value={this.state.user.nrc} />
							<TextInput style={styles.textbox} value={this.state.user.phone} />
							<TextInput style={styles.textbox} value={this.state.user.carModel} />
							<TextInput style={styles.textbox} value={this.state.user.carNumber} />
						</ScrollView>
					</ImageBackground>
				</TouchableWithoutFeedback>
			);
		}
		
		return (
			<ScrollView style={styles.main} contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
				<TextInput style={styles.textbox} value={this.state.user.name} />
				<TextInput style={styles.textbox} value={this.state.user.nrc} />
				<TextInput style={styles.textbox} value={this.state.user.phone} />
				<TextInput style={styles.textbox} value={this.state.user.university} />
			</ScrollView>
		);
  	}
}