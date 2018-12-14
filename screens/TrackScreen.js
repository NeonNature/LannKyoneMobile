import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TextInput, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import MapView, { Callout, Marker, AnimatedRegion } from 'react-native-maps';
import Expo from 'expo';

const Scaledrone = require('scaledrone-react-native');

const SCALEDRONE_CHANNEL_ID = 'TTgdxI4T39mMgxfZ';


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
createbtn: {
  elevation: 4,
},

 members: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },


  member: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 20,
    height: 30,
    marginTop: 10,
  },
  memberName: {
    marginHorizontal: 10,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  }


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
      modal: false,
      members: [],
      name: 'Chit Poat',
      routeid: 1,

    };
  }

   componentDidMount() {

    const drone = new Scaledrone(SCALEDRONE_CHANNEL_ID);

    drone.on('error', error => console.error(error));

    drone.on('close', reason => console.error(reason));

    drone.on('open', error => {

      if (error) {

        return console.error(error);

      }

    AuthRequest(drone.clientId, this.state.name);

    drone.authenticate(jwt);


    });

    const room = drone.subscribe('observable-' + this.state.routeid, {

      historyCount: 50 // load 50 past messages

    });

    room.on('open', error => {

      if (error) {

        return console.error(error);

      }

      this.startLocationTracking(position => {

        const {latitude, longitude} = position.coords;

        // publish device's new location

        drone.publish({

          room: 'observable-' + this.state.routeid,

          message: {latitude, longitude}

        });

      });

    });

    // received past message

    room.on('history_message', message =>

      this.updateLocation(message.data, message.clientId)

    );

    // received new message

    room.on('data', (data, member) =>

      this.updateLocation(data, member.id)

    );

    // array of all connected members

    room.on('members', members =>

      this.setState({members})

    );

    // new member joined room

    room.on('member_join', member => {

      const members = this.state.members.slice(0);

      members.push(member);

      this.setState({members});

    });

    // member left room

    room.on('member_leave', member => {

      const members = this.state.members.slice(0);

      const index = members.findIndex(m => m.id === member.id);

      if (index !== -1) {

        members.splice(index, 1);

        this.setState({members});

      }

    });

  }



  startLocationTracking(callback) {

    navigator.geolocation.watchPosition(

      callback,

      error => console.log(error),

      {

        enableHighAccuracy: true,

        timeout: 20000,

        maximumAge: 1000

      }

    );

  }



  updateLocation(data, memberId) {
    const {members} = this.state;
    const member = members.find(m => m.id === memberId);
    if (!member) {
      // a history message might be sent from a user who is no longer online
      return;
    }
    if (member.location) {
      member.location.timing({
        latitude: data.latitude,
        longitude: data.longitude,
      }).start();
    } else {
      member.location = new AnimatedRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      this.forceUpdate();
    }
  }



   showModal = () => this.setState({ modal: true });
  hideModal = () => this.setState({ modal: false });

  //--------------------------------------------

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
              ref={ref => {this.map = ref;}}
              width={width}
              height={height}
              initialRegion={this.state.region}>
            <View pointerEvents="none" style={styles.members}>
                {this.createMembers()}
            </View>
      </MapView>
      <Callout>
              <View style={styles.calloutView} >
                
                  <Button
                  style={styles.createbtn}
                    onPress={this.create}
                    color="#803176"
                    mode="contained"
                    dark={true}>
                  End
                  </Button>
            </View>
        </Callout>
        <View pointerEvents="none" style={styles.members}>
          {this.createMembers()}
        </View>

    </View>
    );
  }



  createMarkers() {
    const {members} = this.state;
    const membersWithLocations = members.filter(m => !!m.location);
    return membersWithLocations.map(member => {
      const {id, location, authData} = member;
      const {name, color} = authData;
      return (
        <Marker.Animated
          key={id}
          identifier={id}
          coordinate={location}
          pinColor={color}
          title={name}
        />
      );
    })
  }

  createMembers() {
    const {members} = this.state;
    return members.map(member => {
      const {name, color} = member.authData;
      return (
        <View key={member.id} style={styles.member}>
          <View style={[styles.avatar, {backgroundColor: color}]}></View>
          <Text style={styles.memberName}>{name}</Text>
        </View>
      );
    });
  }

  AuthRequest(clientId, name) {
  let status;
  return fetch('http://localhost:3000/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({clientId, name}),
  }).then(res => {
    status = res.status;
    return res.text();
  }).then(text => {
    if (status === 200) {
      return text;
    } else {
      alert(text);
    }
  }).catch(error => console.error(error));
}


}