import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Expo from 'expo';

const styles= StyleSheet.create({
	main : {
		alignItems: 'center', 
		justifyContent: 'center',
	},
	text : {
		paddingTop: Expo.Constants.statusBarHeight
	}
})

export default class RouteViewScreen extends React.Component {

	static navigationOptions = ({navigation}) => ({
		headerTitle: 'Routes',
		headerRight: (
			<Button title='+ Add' onPress={ ()=>(navigation.navigate('AddRoute')) } color='#31c3e0' />
		),
	})

	render() {
		return (
			<View style={styles.main}>
				<Text style={styles.text}>RouteViewScreen</Text>
			</View>
		);
	}
}