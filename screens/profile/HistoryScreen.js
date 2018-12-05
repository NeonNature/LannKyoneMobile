import React from 'react';
import { View } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class HistoryScreen extends React.Component {
    state = {
        hasCameraPermission : null,
        type : Camera.Constants.Type.front,
    }

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermission : status==='granted'})
    }

    render() {
        const { hasCameraPermission } = this.state
        if(hasCameraPermission === null) {
            return (
                <View />
            )
        } else if(hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera :(</Text>
                </View>
            )
        } else {
            return (
                <Camera style={{flex : 1}} type={this.state.type}></Camera>
            )
        }
    }
}