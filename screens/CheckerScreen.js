import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { userData } from '../api/data';

export default class CheckerScreen extends Component {

	static navigationOptions = ({navigation}) => ({
		header: null,
	})


	async componentDidMount() {
		if (userData.role === 'Driver')
		{
			this.props.navigation.navigate('RouteList')
		}
		else
		{
			this.props.navigation.navigate('RouteNoti')
		}
	}

	render() {
		return (
		
		<View style={styles.container}>

		</View>
		
		);
	}
}