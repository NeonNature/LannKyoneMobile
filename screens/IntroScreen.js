import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

styles = StyleSheet.create({
    imagebg : {
        width : '100%',
        height : '100%',
    },
    container : {
        position : 'absolute',
        height : hp('100%'),
        width : wp('100%'),
        backgroundColor : '#70206a',
        flex : 1,
        opacity : 0.8,
        alignItems : 'center',
        justifyContent : 'center',
    },
    loginButton : {
		width : wp('70%'),
		padding : hp('2%'),
		backgroundColor : '#fff',
        alignItems: 'center',
        marginVertical : hp('3%'),
        opacity : 1,
        borderRadius : 40,
    },
    registerButton : {
		width : wp('70%'),
		padding : hp('2%'),
		backgroundColor : '#e0ff00',
        alignItems: 'center',
        opacity : 1,
        borderRadius : 40,
	},
	buttonText : {
		color: '#111',
		fontSize: hp('3%'),
		fontWeight: 'bold',
    },
    image : {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    }
})

let displayInterval = null

export default class IntroScreen extends React.Component {
    state = {
        stay : true,
    }

    componentDidMount() {
        const numOfBg = 4
        let scrolled = 0
        let scrollValue = 0
        displayInterval = setInterval(() => {
            if(this.state.stay === true) {
                scrolled++
                if(scrolled < numOfBg) {
                    scrollValue = scrollValue + Dimensions.get('window').width
                    _scrollView.scrollTo({x: scrollValue})
                }
                else {
                    scrollValue = 0
                    scrolled = 0
                    _scrollView.scrollTo({x: scrollValue, animated : false})
                }
            }
        }, 3000)   
    }

    componentWillUnmount() {
        clearInterval(displayInterval)
    }

    login = () => {
        this.setState({stay : false})
        this.props.navigation.navigate('Login')
    }

    register = () => {
        this.setState({stay : false})
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View>
                <ScrollView ref={(ScrollView) => { _scrollView = ScrollView}} horizontal={true} pagingEnabled={true}>
                    <Image source={require('../assets/intro1.jpg')} style={styles.image} />
                    <Image source={require('../assets/intro2.jpg')} style={styles.image} />
                    <Image source={require('../assets/intro3.jpg')} style={styles.image} />
                    <Image source={require('../assets/intro4.jpg')} style={styles.image} />
                </ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.loginButton} onPress={this.login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} onPress={this.register}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
