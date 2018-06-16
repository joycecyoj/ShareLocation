
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";   // expo???
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3000') // describes the URL of page we're on

    this.state = {
      isLoading: true,
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0
      },
      friends:{}
    };

    // this.onReceivedUserLocationData = this.onReceivedUserLocationData.bind(this);
    // this.socket.on('userLocationData', this.onReceivedUserLocationData)
  }

  componentDidMount() {
    // socket listeners go here!!!!!!!!!!!!!!!!!!
    navigator.geolocation.watchPosition(
      (position) => {
        console.log('new position', position.coords)
        this.socket.send(JSON.stringify({
          position: position
        }))
        let temp = this.state.myPosition;
        temp.latitude = position.coords.latitude
        temp.longitude = position.coords.longitude
        this.setState({
          myPosition: temp,
          isLoading: false
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }



  // when server sends user location data to this
  // onReceivedUserLocationData(userLocationData) {
  //   console.log('Receiving <========================')
  //   this.setState({
  //     markers: [...userLocationData]
  //   })
  // }


  // socket emit to server!!!!!!!!!!!!!!!!!

  render() {

    // this.socket.on('welcome', () => {
    //   console.log('I have made a persistent two-way connection to the server!')
    // })
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        message: 'I have made a persistent two-way connection to the server!'
      }))
    }

    this.socket.onmessage = (incomingServerData) => {
      // a message was received
      let userLocationData = [];
      console.log('incoming server data <========', incomingServerData);
    };

    this.socket.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    this.socket.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    let myLat = this.state.myPosition.latitude
    let myLong = this.state.myPosition.longitude

    // let locationArr = 

    const coords = {
      latitude: myLat,
      longitude: myLong
    };


    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.isLoading        
        ? <Text>loading...</Text>
        : <MapView
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
             }}
            region={{
              latitude: myLat, //40.76727216, // 
              longitude: myLong, //-73.99392888, // 
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
                <MapView.Marker
                  // key={index}
                  coordinate={
                    coords
                  }
                  timestamp={this.state.myPosition.timestamp}
                  // description={metadata}
                />

          </MapView>        
       }
      </View>
      


    );
  }
}


        {/* {this.state.isLoading
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
            } */}




   // usign ws
    // this.ws = new WebSocket('ws://localhost:3000');

    // this.ws.onopen = () => {
    //   // connection opened
    //   console.log('connection opened on client side ========================')
    //   this.ws.send('A socket connection to the server has been made');
    // };
    
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