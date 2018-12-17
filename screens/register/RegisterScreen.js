import React from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert, Picker, Platform, Modal } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePicker, Permissions } from 'expo';
import { TextInput, Button } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { userRegister, profileUpload, photoUpload } from '../../api/api';

const uniData = [
          { value: 'DU' },
          { value: 'MMU' },
          { value: 'TTU' },
          { value: 'UCSY' },
          { value: 'UFL' },
          { value: 'UIT' },
          { value: 'UM1' },
          { value: 'UM2' },
          { value: 'YU' },
          { value: 'YTU' },
          { value: 'WYTU' },
        ];

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
    },
    marginFix : {
        marginTop: 50,
    },
    registerButton : {
        marginTop: 20,
    borderRadius: 20,
    marginBottom: 20,
    },
   
    selectButton : {
        marginTop: 20,
    borderRadius: 20,
    marginBottom: 20,
    },
    textInput: {
    marginTop: 20,
    width: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
    inputContainer: {
        ...Platform.select({
          ios: {
            borderBottomColor: "gray",
          }
        })
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        padding: 4,
        backgroundColor: "#ececec"
    },
    input: {
        height: 40
      },
})

export default class Register extends React.Component {
    static navigationOptions = {
        header : null,
    }

    state = {
        id : '',
        name : '',
        phone : '',
        university : '',
        carModel : '',
        carNumber : '',
        password : '',
        confirmPassword : '',
        role : '',
        modalVisibility : false,
        formData : null,
    }

    componentDidMount() {
        this.setState({
            role : this.props.navigation.getParam('option', 'Driver')
        })
    }

    handleName = (name) => {
        this.setState({name: name})
    }

    handlePhone = (phone) => {
        this.setState({phone: phone})
    }

    toggleModal = () => {
        this.setState({modalVisibility : true})
    }

    handleUniversity = (itemValue, itemIndex) => {
        this.setState({university: itemValue})
        console.log(this.state.university)
    }

    handlePassword = (password) => {
        this.setState({password: password})
    }

    handleConfirmPassword = (confirmPassword) => {
        this.setState({confirmPassword: confirmPassword})
    }

    handleCarModel = (carModel) => {
        this.setState({carModel: carModel})
    }

    handleCarNumber = (carNumber) => {
        this.setState({carNumber: carNumber})
    }

    handleImage = async() => {

        let {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        
        if(status !== 'granted') {
            return
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing : true,
            aspect : [4, 3],
        })

        if(result.cancelled) {
            return
        }

        let localUri = result.uri
        let filename = localUri.split('/').pop()

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        let formData = new FormData()
        formData.append('photo', {uri: localUri, name: filename, type})
        this.setState({formData : formData})
    }

    userRegister = async() => {
        const imageResponse = await photoUpload(this.state.formData)
        const data = await imageResponse.json()

        this.setState({id : data})

        const response = await userRegister(this.state)
        
        if(response.ok ) {
            Alert.alert(
                'Success!',
                'အေကာင့္ရၿပီခ်ိဖ',
                [
                    {text: 'OK', onPress : ()=>this.props.navigation.navigate('Login') ,style: 'default'},
                ]
            )
        } else {
            const message = await response.json()
            if(message) {
                Alert.alert(
                    'Error',
                    message,
                    [
                        {text: 'OK', style: 'cancel'},
                    ]
                )
            } else {
                Alert.alert(
                    'Error',
                    'Something went wrong :(',
                    [
                        {text: 'OK', style: 'cancel'},
                    ]
                )
            }            
        }
    }

    

    render() {
        return (
            <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' style={styles.container} alignItems='center' justifyContent='center' extraHeight={hp('2%')}>
                <View style={styles.marginFix}>
                <TextInput 
                    value={this.state.name}
                    label="Name"
                    onChangeText={this.handleName}
                    style={styles.textInput}
                />
                <TextInput 
                    value={this.state.phone}
                    label="Phone number"
                    onChangeText={this.handlePhone}
                    style={styles.textInput}
                />

                <Dropdown
                  value={this.state.university}
                  onChangeText={this.handleUniversity}
                  label='University'
                  data={uniData}
                />

                <Button 
                onPress={this.handleImage} 
                style={styles.selectButton} 
                color="green" 
                dark={true}
                mode="contained"
                >
                        {this.state.formData ? 'Photo uploaded!' : 'Upload your Student ID'}
                </Button>
                
                
                {this.props.navigation.getParam('option', 'Driver') === "Driver" ? (
                    <View>
                        <TextInput 
                            value={this.state.carModel}
                            label="Car Model"
                            onChangeText={this.handleCarModel}
                            style={styles.textInput}
                        />

                        <TextInput 
                            value={this.state.carNumber}
                            label="Car Number"
                            onChangeText={this.handleCarNumber}
                            style={styles.textInput}
                        />
                    </View>
                ) : <View />}
                
                <TextInput 
                    value={this.state.password}
                    label="Password"
                    onChangeText={this.handlePassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                <TextInput 
                    value={this.state.confirmPassword}
                    label="Confirm Password"
                    onChangeText={this.handleConfirmPassword}
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                <Button
                style={styles.registerButton}
                onPress={this.userRegister}
                color="#803176"
                mode="contained"
                dark={true}
                >
              Register
              </Button>
              </View>
            </KeyboardAwareScrollView>
        )
    }
}