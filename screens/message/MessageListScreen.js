import React from 'react';
import { View, Button } from 'react-native';
 
export default class MessageListScreen extends React.Component {

	static navigationOptions = () => ({
		title : 'Chat List',
	})

	state = {
		messages : [],
	}

	goToCB = () => {
		this.props.navigation.navigate('MessageBox')
	}

	render() {
		return (
			<View>
				<Button title="Go to chat box" onPress={this.goToCB} />
			</View>
		);
	}
}