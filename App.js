import React from 'react';

import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MapViewScreen from './screens/MapViewScreen';

import MessageListScreen from './screens/message/MessageListScreen';
import MessageScreen from './screens/message/MessageScreen';

import ProfileScreen from './screens/profile/ProfileScreen';
import PaymentScreen from './screens/profile/PaymentScreen';

import RouteViewScreen from './screens/RouteViewScreen';
import AddRouteScreen from './screens/AddRouteScreen';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

//navigation

const RouteStack = createStackNavigator(
	{
		RouteList : RouteViewScreen,
		AddRoute : AddRouteScreen,
	},
	{
		initialRouteName : 'RouteList',
		navigationOptions : {
			headerTintColor : '#31c3e0',
			headerStyle : {
				backgroundColor : '#fff',
			},
		},
	}
)

const MessageStack = createStackNavigator(
	{
		MessageList : MessageListScreen,
		MessageBox : MessageScreen,
	},
	{
		mode : 'card',
		header : 'none',
		initialRouteName : 'MessageList',
		navigationOptions : {
			headerTintColor : '#31c3e0',
			headerStyle : {
				backgroundColor : '#fff',
			},
		},
	}
)

const ProfileStack = createStackNavigator(
	{
		Profile : ProfileScreen,
		Payment : PaymentScreen,
	},
	{
		mode : 'modal',
		header : 'none',
		initialRouteName : 'Profile',
		navigationOptions : {
			headerTintColor : '#31c3e0',
			headerStyle : {
				backgroundColor : '#fff',
			},
		},
	}
)

MapViewScreen.navigationOptions = {
	tabBarIcon : ({focused, tintColor}) => (
		<Ionicons name={`ios-map${focused ? '' : '-outline'}`} size={25} color={tintColor} />
	),
	headerTintColor: '#31c3e0',
    headerStyle: {
        backgroundColor: '#fff',
    },
}

RouteStack.navigationOptions = {
	tabBarIcon : ({focused, tintColor}) => (
		<Ionicons name={`ios-car${focused ? '' : '-outline'}`} size={25} color={tintColor} />
	),
}

MessageStack.navigationOptions = ({navigation}) => {
	if(navigation.state.index == 1) {
		return {
			tabBarVisible : false,
			tabBarIcon : ({focused, tintColor}) => (
				<Ionicons name={`ios-chatboxes${focused ? '' : '-outline'}`} size={25} color={tintColor} />
			),
		}
	}
	return {
		tabBarVisible : true,
		tabBarIcon : ({focused, tintColor}) => (
			<Ionicons name={`ios-chatboxes${focused ? '' : '-outline'}`} size={25} color={tintColor} />
		),
	}
}

ProfileScreen.navigationOptions = {
	tabBarIcon : ({focused, tintColor}) => (
		<Ionicons name={`ios-contact${focused ? '' : '-outline'}`} size={25} color={tintColor} />
	),
}

const MainTabs = createBottomTabNavigator(
	{
		Map : MapViewScreen,
		Routes : RouteStack,
		Messages : MessageStack,
		Profile : ProfileStack,
	},
	{
		tabBarOptions : {
			activeTintColor : '#c239b1',
		}
	}
)

const MainStack = createSwitchNavigator(
	{
		Login : LoginScreen,
		Register : RegisterScreen,
		Main : MainTabs,
	},
	{
		initialRouteName : 'Login',
		headerMode : 'none',
	}
)

//navigation end

export default class App extends React.Component {
  render() {
    return (
		<MainStack />
    );
  }
}
