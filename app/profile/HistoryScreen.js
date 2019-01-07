import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Constants } from 'expo';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { getRouteHistory } from './api';
import { userData } from '../../data/data';

const historyStyle = StyleSheet.create({
    main : {
        paddingTop : Constants.statusBarHeight,
        flex : 1,
        backgroundColor : '#70206a',
    },
    card : {
        marginVertical : hp('1%'),
    },
    textView : {
        alignItems : 'center',
        justifyContent : 'center',
    },
    text : {
        fontSize : 18,
        color : '#fff',
        fontWeight : 'bold',
    }
})

export default class HistoryScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Profile',
        headerRight: (
            <Button title='Back' onPress={ ()=>(navigation.navigate('DriverMain')) } color='#803176' />
        ),
    })

    state = {
        routeData : [],
    }
    
    async componentDidMount() {
        console.log(userData.id)
        const data = await getRouteHistory(userData.id)
        this.setState({routeData : data})
        console.log(this.state.routeData.length)
    }

    render() {
        return (
            <ScrollView style={historyStyle.main}>
                {this.state.routeData.length==0 ? <View style={historyStyle.textView}><Text style={historyStyle.text}>No route records!</Text></View> : 
                    this.state.routeData.map((route)=>(
                        <Card style={historyStyle.card} key={route.id}>
                            <Card.Content>
                                <Title>Start point : {route.startPoint}</Title>
                                <Title>Destination : {route.endPoint}</Title>
                                <Paragraph>Date & time : {route.date} </Paragraph>
                            </Card.Content>
                        </Card>
                    )
                )
                }
                
            </ScrollView>
        )
    }
}