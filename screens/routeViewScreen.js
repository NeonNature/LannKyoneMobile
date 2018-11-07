import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
  render() {
    return (
		<View style={styles.main}>
			<Text style={styles.text}>RouteViewScreen</Text>
		</View>
    );
  }
}