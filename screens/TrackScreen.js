import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TextInput, Text } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps';
import Expo from 'expo';


const GOOGLE_MAPS_APIKEY = 'AIzaSyDfl-3OpxnLkWWfQ3PBoZUXOteCKYRLAXw';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
endbtn: {
  elevation: 4,
},
  fab: {
      position: 'absolute',
      backgroundColor: '#803176',
      margin: 25,
      right: 0,
      bottom: 0,
    },

})

export default class MapViewScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      region: {
                latitude: 16.8661,
                longitude: 96.1951,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
      name: 'Chit Poat',
      open: false,
    };
  }

  //--------------------------------------------

  end = () => {
        console.log('Filler Quack');
    }

  render() {
    return (
    <View style={styles.main}>
      <MapView
              customMapStyle={mapStyle}
              width={width}
              height={height}
              initialRegion={this.state.region}>

          
                 <Marker
                   coordinate={this.state.region}
                   title={this.state.name}
                 />

      </MapView>
      <Callout>
              <View style={styles.calloutView} >
                  <Button
                  style={styles.endbtn}
                    onPress={this.end}
                    color="#803176"
                    mode="contained"
                    dark={true}>
                  End
                  </Button>
            </View>
        </Callout>
        <FAB.Group
                style={styles.fab}
                open={this.state.open}
                icon={require('../assets/duck.png')}
                actions={[
                  { icon: require('../assets/duck.png'), label: 'Poatie', onPress: () => console.log('Quack!')},
                  { icon: require('../assets/duck.png'), label: 'Poatoat', onPress: () => console.log('Quack!') },
                  { icon: require('../assets/duck.png'), label: 'Chit Poat', onPress: () => console.log('Quack!') },
                ]}
                onStateChange={({ open }) => this.setState({ open })}
            />
      </View>
    );
  }




}