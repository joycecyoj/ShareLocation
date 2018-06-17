import React, { Component } from "react";
import { 
  StyleSheet, 
  View,
  StatusBar
 } from 'react-native';

// import Routes from './client/Routes';
import Login from './client/pages/Login';
import Signup from './client/pages/Signup';

 export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor='#4f9b94'
          barStyle="default"
        />
        {/* <Routes/> */}
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80cbc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});