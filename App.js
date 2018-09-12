import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';

import Login from './client/pages/Login';
import Signup from './client/pages/Signup';
import Map from './client/pages/Map';

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Map: { screen: Map },
  }
);
