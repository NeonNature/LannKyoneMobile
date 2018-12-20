import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, SafeAreaView } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MapViewScreen from './screens/MapViewScreen';

import MessageListScreen from './screens/message/MessageListScreen';
import MessageScreen from './screens/message/MessageScreen';

import ProfileScreen from './screens/profile/ProfileScreen';
import PaymentScreen from './screens/profile/PaymentScreen';
import HistoryScreen from './screens/profile/HistoryScreen';

import RouteViewScreen from './screens/RouteViewScreen';
import RouteViewPassengerScreen from './screens/RouteViewPassengerScreen';
import AddRouteScreen from './screens/AddRouteScreen';
import CheckerScreen from './screens/CheckerScreen';
import TrackScreen from './screens/TrackScreen';

import RegisterOption from './screens/register/RegisterOption';
import RegisterScreen from './screens/register/RegisterScreen';
import LoginScreen from './screens/register/LoginScreen';
import IntroScreen from './screens/IntroScreen';

import { userData, setUserData } from './api/data';

//navigation


const RegisterStack = createStackNavigator(
	{
		RegisterOption : RegisterOption,
		Registration : RegisterScreen,
	},
	{
		initialRouteName : 'RegisterOption',
		navigationOptions : {
			headerTintColor : '#70206a',
			headerStyle : {
				backgroundColor : '#fff',
			}
		}
	}
)


const DriverRouteStack = createStackNavigator({
	RouteList : RouteViewScreen,
	AddRoute : AddRouteScreen,
})

const PassengerRouteStack = createStackNavigator({
	RouteNoti : RouteViewPassengerScreen,
	Track : TrackScreen,
})

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
		History : HistoryScreen,
	},
	{
		mode : 'modal',
		headerMode : 'none',
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
}

DriverRouteStack.navigationOptions = {
	tabBarIcon : ({focused, tintColor}) => (
		<Ionicons name={`ios-car${focused ? '' : '-outline'}`} size={25} color={tintColor} />
	),
}

PassengerRouteStack.navigationOptions = {
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

ProfileStack.navigationOptions = {
	tabBarIcon : ({focused, tintColor}) => (
		<Ionicons name={`ios-contact${focused ? '' : '-outline'}`} size={25} color={tintColor} />
	),
}

const DriverMainTabs = createBottomTabNavigator(
	{
		Routes : DriverRouteStack,
		Profile : ProfileStack,
	},
	{
		tabBarOptions : {
			activeTintColor : '#c239b1',
		}
	}
)

const PassengerMainTabs = createBottomTabNavigator(
	{
		Routes : PassengerRouteStack,
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
		Intro : IntroScreen,
		Login : LoginScreen,
		Register : RegisterStack,
		DriverMain : DriverMainTabs,
		PassengerMain : PassengerMainTabs,
	},
	{
		initialRouteName : 'Intro',
		headerMode : 'none',
	}
)

//navigation end

export default class App extends React.Component {

	async componentDidMount() {
		await AsyncStorage.getItem('userData')
			.then((data)=>{
				if(data !== null) {
					setUserData(JSON.parse(data))
				}
			})
		
	}

	render() {
		return (
			<SafeAreaView style={styles.safeArea} forceInset={{bottom : 'never'}}>
				<PaperProvider>
					<MainStack />
				</PaperProvider>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
})