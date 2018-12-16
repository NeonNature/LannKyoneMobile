import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Constants } from 'expo';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { getRoutesByUser } from '../../api/api';
import { userData } from '../../api/data';

const historyStyle = StyleSheet.create({
    main : {
        paddingTop : Constants.statusBarHeight,
        flex : 1,
        backgroundColor : '#70206a',
    },
    card : {
        marginVertical : hp('1%'),
    }
})

export default class HistoryScreen extends React.Component {
    state = {
        routeData : [],
    }
    
    async componentDidMount() {
        const data = await getRoutesByUser(userData.id)
        this.setState({routeData : data})
    }

    cardView = () => {
        return 
    }

    render() {
        return (
            <ScrollView style={historyStyle.main}>
                {this.state.routeData.map((route)=>(
                <Card style={historyStyle.card} key={route.id}>
                    <Card.Content>
                        <Title>Start point : {route.startPoint}</Title>
                        <Title>Destination : {route.endPoint}</Title>
                        <Paragraph>Date & time : {route.date} </Paragraph>
                    </Card.Content>
                </Card>
            )
        )}
            </ScrollView>
        )
    }
}