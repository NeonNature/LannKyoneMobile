import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TextInput, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import MapView, { Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Expo from 'expo';


const GOOGLE_MAPS_APIKEY = 'AIzaSyDfl-3OpxnLkWWfQ3PBoZUXOteCKYRLAXw';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

const styles= StyleSheet.create({
  calloutView: {
  borderRadius: 10,
  width: 200,
  backgroundColor: 'white',
  marginTop: 20,
  flex: 1
},
main : {
    alignItems: 'center', 
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
modal: {
	backgroundColor: 'white',
	flex: 1,
	alignItems: 'center',
	marginLeft: 20,
	marginRight: 20,
	marginTop: 20,
	marginBottom: 50,
	borderRadius: 20
},


})

export default class MapViewScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      origin: null,
      final: null,
      origin_name: '',
      final_name: '',
      region: {
                latitude: 16.8661,
                longitude: 96.1951,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
      modal: false,

    };
  }

   showModal = () => this.setState({ modal: true });
  hideModal = () => this.setState({ modal: false });

  //--------------------------------------------

      setOrigin = (data, details = null) => {

      let region = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };

      this.setState({
        origin: {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        },
        origin_name: data.description, // get the full address of the user's destination
      });

    }

      //--------------------------------------------

      setFinal = (data, details = null) => {


      this.setState({
        final: {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        },
        final_name: data.description, // get the full address of the user's destination
      });

    }


    //----------------------------------------

  create = () => {
        console.log('Filler Quack');

        this.showModal();
    }

  render() {
    return (
    <View style={styles.main}>
    <Portal>
 	  	<Modal  style={styles.modal} visible={this.state.modal} onDismiss={this.hideModal}>
 	  		<View style={styles.modal}>
	         	<Text>Example Modal</Text>
	         </View>
	  	</Modal>
  	</Portal>
      <MapView
              customMapStyle={mapStyle}
              width={width}
              height={height}
              initialRegion={this.state.region}>
              <MapViewDirections
                origin={this.state.origin}
                destination={this.state.final}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                />
      </MapView>
      <Callout>
              <View style={styles.calloutView} >
                <GooglePlacesAutocomplete
                      placeholder='Starting Point'
                      minLength={2}
                      query={{
                      key: 'AIzaSyDfl-3OpxnLkWWfQ3PBoZUXOteCKYRLAXw',
                      components:'country:mm',
                      }}
                      onPress={this.setOrigin}
                      listViewDisplayed={false}
                      returnKeyType={'default'}
                      fetchDetails={true}
                      styles={{
                        textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0
                        },
                        textInput: {
                          marginLeft: 0,
                          marginRight: 0,
                          height: 38,
                          color: '#5d5d5d',
                          fontSize: 16
                        },
                      }}
                      currentLocation={false}
                      value={this.state.origin_name}
                      debounce={200}
                      enablePoweredByContainer={false}
                />
                <GooglePlacesAutocomplete
                      style={styles.origin}
                      placeholder='Ending Point'
                      minLength={2}
                      query={{
                      key: 'AIzaSyDfl-3OpxnLkWWfQ3PBoZUXOteCKYRLAXw',
                      components:'country:mm'
                      }}
                      onPress={this.setFinal}
                      listViewDisplayed={false}
                      returnKeyType={'default'}
                      fetchDetails={true}
                      styles={{
                        textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0
                        },
                        textInput: {
                          marginLeft: 0,
                          marginRight: 0,
                          height: 38,
                          color: '#5d5d5d',
                          fontSize: 16
                        },
                      }}
                      currentLocation={false}
                      value={this.state.final_name}
                      debounce={200}
                      enablePoweredByContainer={false}
                />           
                  <Button
                    onPress={this.create}
                    color="hotpink"
                    mode="contained"
                    dark={true}>
                  Create
                  </Button>
            </View>
        </Callout>

    </View>
    );
  }
}