import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";   // expo???
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor(props) {
    super(props);  
    this.id = this.makeid()  
    this.state = {
      isLoading: true,
      // socketid: '',
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0
      },
      friends:{}
    };
    this.socket = io.connect('http://36c0fad1.ngrok.io/') // describes the URL of page we're on

  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  componentDidMount() {
    // if (typeof this.socket.id === 'undefined') {
    //   console.log('socket-----------:\n', this.socket)
    // }
    
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        // console.log('position inside watch', position)
        // console.log('this socket id----------------', this.socket.id)
            

        // if(typeof this.socket.id !== 'undefined') {
          this.socket.emit('position', {
            data: position,
            // socketid: this.socket.id
            id: this.id
          })
        // }
 
        let tempPosition = {...this.state.myPosition};
        tempPosition.latitude = position.coords.latitude
        tempPosition.longitude = position.coords.longitude

        this.setState({
          myPosition: tempPosition,
          isLoading: false
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
    );
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  
  render() {
    // this.socket.on('socket', (data) => {
    //   if (this.socket.id === null){
    //     this.socket.id = data.socketid
    //   }
    // })

    this.socket.on('otherPositions', (positionsData) => {
      // console.log('positionsData from server broadcast', positionsData)
      let tempFriends = {...this.state.friends}
      tempFriends[positionsData.id] = positionsData.data

      this.setState({
        friends: tempFriends
      })
    })
    console.log('state friends ----------------', this.state.friends)

    let friendsPositionsArr = Object.values(this.state.friends)
    console.log('friendsPositionsArr', friendsPositionsArr)


    let myLat = this.state.myPosition.latitude
    let myLong = this.state.myPosition.longitude

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
              latitude: myLat, 
              longitude: myLong,
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


            {
            friendsPositionsArr.map(marker => {
              console.log('state friends ----------------', this.state.friends)
              const friendsCoords = {
                latitude: marker.coords.latitude,
                longitude: marker.coords.longitude
              }
              
              return (
                <MapView.Marker
                  // key={index}
                  coordinate={
                    friendsCoords
                  }
                  // timestamp={this.state.myPosition.timestamp}
                  // description={metadata}
                />
              )
            })
          }

          </MapView>        
       }
      </View>

    );
  }
}


        // {/* {this.state.isLoading
        //   ? null
        //   : 
        //   // this.state.markers.map((marker, index) => {
        //       // const coords = {
        //       //   latitude: marker.latitude,
        //       //   longitude: marker.longitude
        //       // };

        //       // const metadata = `Status: ${marker.statusValue}`;

        //       // return (
        //         <MapView.Marker
        //           // key={index}
        //           coordinate={
        //             coords
        //           }
        //           timestamp={this.state.myPosition.timestamp}
        //           // description={metadata}
        //         />
        //       // );
        //     // }
        //     // )
        //         /*}