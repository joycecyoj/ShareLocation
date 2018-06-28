import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  StatusBar,
  TouchableOpacity
 } from "react-native";

 import Logo from '../components/Logo';
 import LoginForm from '../components/LoginForm';

  export default class Login extends Component {

  static navigationOptions = {
    header:null
  }

  render() {
    return (
      <View style={styles.container}>
      {/* <StatusBar barstyle="dark-content"/> */}
        <Logo/>
        <LoginForm type="Login"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Text style={styles.signupButton} onPress={() => this.props.navigation.navigate('Map')}>MAP</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#80cbc4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  
  signupText: {
    color: 'rgba(255,255, 255,0.6)',
    fontSize:16
  },

  signupButton: {
    color: '#ffffff',
    fontSize:16,
    fontWeight:'500'
  }
});