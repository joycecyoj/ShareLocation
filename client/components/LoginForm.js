import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity
 } from "react-native";

  export default class LoginForm extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType='email-address'
          onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input)=>this.password = input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    height:50,
    backgroundColor:'rgba(255,255,255,0.2)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical:10,
    textAlign:'center'
  },

  button: {
    backgroundColor:'#4f9b94',
    borderRadius:25,
    width:300,
    marginVertical:10,
    paddingVertical:13
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign: 'center'
  }
});
