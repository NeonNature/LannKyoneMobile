import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../api/Fire';

Chat = (props) => (
	<GiftedChat 
		messages={props.messages} 
		onSend={Fire.shared.send}
		user={{
			_id: 3,
			name: 'React Native',
			avatar: 'https://placeimg.com/140/140/any',
		}}
	/>
)

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
		console.log(this.state.messages)
	}

	componentWillUnmount() {
		Fire.shared.off()
	}

	render() {
		return (
			<Chat messages={this.state.messages}/>
		);
	}
}