import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

import { userData, routeData } from '../api/data';
import { getLocation, setLocation, rate } from '../api/api';
import TimerMixin from 'react-timer-mixin';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
   RactionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#803176',
  },
})

export default class TrackScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    header: null,
  })

    constructor(props) {
    super(props);
    this.state = {
      region: {
                latitude: 16.8661,
                longitude: 96.1951,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
      id: '',
      routeID: '',
      markers: [],
      lat: null,
      long: null,
    };
  }

  componentDidMount() {
    this.setState({routeID : '0809052158739638'})
    this.setState({id : userData.id})

    console.log (routeData.id);

     TimerMixin.setTimeout.call(this, () =>{ 
                this.track()
            },15000);

    }

    track = async () => {

      let { status } = await Permissions.askAsync(Permissions.LOCATION);

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ lat: location.coords.latitude, long: location.coords.longitude });
    const response = await setLocation(this.state)

      const markerData = await getLocation(this.state.routeID)
      this.setState({markers : markerData})
      
    }

  //--------------------------------------------
  rate = async (userID) => {
    const response = await rate(userID)
    console.log(response)
  }

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

          {this.state.markers.map((mark)=> mark.lat === null ? console.log('Null value detected!') : 
                 <Marker
                   coordinate={{latitude: mark.lat, longitude: mark.long}}
                   title={mark.name}
                 />
            )}
      </MapView>
      <Callout>
              <View style={styles.calloutView} >
                  <Button
                  style={styles.endbtn}
                    onPress={this.end}
                    color="#803176"
                    mode="contained"
                    dark={true}>
                  End Route
                  </Button>
            </View>
        </Callout>


        <ActionButton fixNativeFeedbackRadius={true} buttonColor="#803176" icon={<Icon name='duck' size={25} style={styles.RactionButtonIcon} />}>
        {this.state.markers.map((p)=> p.name === userData.name ? console.log('Disabled Self Vote!') :
          <ActionButton.Item key={p.name} fixNativeFeedbackRadius={true} buttonColor='white' title={p.name} onPress={() => this.rate(p.id)}>
            <Icon key={p.name} name="duck" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          )}
        </ActionButton>

      </View>
    );
  }




}