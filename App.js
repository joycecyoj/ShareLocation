import React, { Component } from "react";
import { 
  StyleSheet, 
  View,
  StatusBar
 } from 'react-native';

 import { createStackNavigator } from 'react-navigation';

// import Routes from './client/Routes';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Map from './client/pages/Map';


export default class App extends Component {
  render() {
    return (
      <AppStackNavigator/>
      // <View style={styles.container}>
      //   <StatusBar 
      //     backgroundColor='#4f9b94'
      //     barStyle="default"
      //   />
      //   {/* <Routes/> */}
      //   <Login/>
      //   {/* <Map/> */}
      // </View>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: Login,
  Signup: Signup,
  Map: Map
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80cbc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});