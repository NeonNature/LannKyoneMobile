import React from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Expo from 'expo';

import { getUser } from '../api/api';

const styles= StyleSheet.create({
	main : {
		flex : 1,
		paddingTop : Expo.Constants.statusBarHeight,
	},
	textbox : {
		borderWidth: 1,
		borderColor: 'black',
		minWidth: 320,
		minHeight: 35,
		margin: 10,
		borderRadius: 8,
		flexDirection: 'row',
		backgroundColor: '#d4d7db',
	}
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
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView style={styles.main} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
					<TextInput style={styles.textbox} value={this.state.user.name} />
					<TextInput style={styles.textbox} value={this.state.user.nrc} />
					<TextInput style={styles.textbox} value={this.state.user.phone} />
					<TextInput style={styles.textbox} value={this.state.user.university} />
					<TextInput style={styles.textbox} value={this.state.user.carModel} />
					<TextInput style={styles.textbox} value={this.state.user.carNumber} />
				</ScrollView>
				</TouchableWithoutFeedback>
			);
		}
		
		return (
			<ScrollView style={styles.main}>
				<TextInput style={styles.textbox} value={this.state.user.name} />
				<TextInput style={styles.textbox} value={this.state.user.nrc} />
				<TextInput style={styles.textbox} value={this.state.user.phone} />
				<TextInput style={styles.textbox} value={this.state.user.university} />
			</ScrollView>
		);
  	}
}