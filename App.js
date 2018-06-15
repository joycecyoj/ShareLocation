
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      myPosition: {
        latitude: "",
        longitude: "",
        timestamp: ""
      },
      friends:{}
    };
    
    // this.onSend = this.onSend.bind(this);
    // this.onReceivedUserLocationData = this.onReceivedUserLocationData.bind(this);
    
    this.ws = new WebSocket('ws://localhost:3000');

    this.ws.onopen = () => {
      // connection opened
      this.ws.send('A socket connection to the server has been made');
    };
    
    // this.ws.onmessage = (e) => {
    //   // a message was received
    //   console.log(e.data);
    // };
    
    // this.ws.onerror = (e) => {
    //   // an error occurred
    //   console.log('websocket error:', e.message);
    // };
    
    // this.ws.onclose = (e) => {
    //   // connection closed
    //   console.log(e.code, e.reason);
    // };
    
    // this.socket.on('userLocationData', this.onReceivedUserLocationData)
  }


  componentDidMount() {
    // socket listeners go here!!!!!!!!!!!!!!!!!!

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log('myPosition', position)
        this.ws.send('Sending Current Position 2 Server ====>', position);

        this.setState({
          isLoading: false,
          myPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
          },
          friends: {},
          error: null,
        });

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

    );
  }


  // when location is sent, send location to server & store in this component's state
  // onSend(userLocationData = {}) {
  //   console.log('Sending===========================>')
  //   this.socket.emit('userLocationData', userLocationData);
  // }


  // when server sends user location data to this
  // onReceivedUserLocationData(userLocationData) {
  //   console.log('Receiving <========================')
  //   this.setState({
  //     markers: [...userLocationData]
  //   })
  // }


  // socket emit to server!!!!!!!!!!!!!!!!!

  render() {

    // let locationArr = 
    let myLat = +this.state.myPosition.latitude
    let myLong = +this.state.myPosition.longitude
    const coords = {
      latitude: myLat,
      longitude: myLong
    };

    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: myLat,
          longitude: myLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.isLoading
          ? null
          : 
          // this.state.markers.map((marker, index) => {
              // const coords = {
              //   latitude: marker.latitude,
              //   longitude: marker.longitude
              // };

              // const metadata = `Status: ${marker.statusValue}`;

              // return (
                <MapView.Marker
                  // key={index}
                  coordinate={
                    coords
                  }
                  timestamp={this.state.myPosition.timestamp}
                  // description={metadata}
                />
              // );
            // }
            // )
            }
      </MapView>

    );
  }
}