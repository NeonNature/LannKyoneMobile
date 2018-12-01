import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
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

export default class MapViewScreen extends React.Component {
  render() {
    return (
		<View style={styles.main}>
			
		</View>
    );
  }
}