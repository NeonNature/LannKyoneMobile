import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Fire from '../api/Fire';

const styles = StyleSheet.create({
	bubbleText : {
		fontSize: 15,
		color : '#b3b6bc',
	}
})

export default class MessageScreen extends React.Component {

	static navigationOptions = ({navigation}) => ({
		title : 'Waing',
	})

	state = {
		messages : [],
	}

	componentDidMount() {
		Fire.shared.on(message => (
			this.setState(prevState => ({
				messages: GiftedChat.append(prevState.messages, message)
			}))
		))
	}

	componentWillUnmount() {
		Fire.shared.off()
	}

	renderBubble = (props) => {
		if(props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage) || props.isSameUser(props.currentMessage, 1)) {
			return (
				<Bubble
					{...props}
				/>
			)
		}
		return (
			<View style={{alignItems : 'baseline'}}>
				<Text style={styles.bubbleText} >{props.currentMessage.user.name}</Text>
				<Bubble
					{...props}
				/>
			</View>
		)
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages} 
				onSend={Fire.shared.send}
				renderBubble={this.renderBubble}
				user={{
					_id: 1,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				}}
			/>
		);
	}
}