import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfileStack } from './Profile'
import { MapStack } from './Map'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// const homeIcon = ({ tintColor }) => (
//   <Icon name="home" size={25} color={tintColor} />
// );

const Map = ({ tintColor }) => (
  <Icon name="university" size={25} color={tintColor} />
);
const profileIcon = ({ tintColor }) => (
  <Icon name="user" size={25} color={tintColor} />
);

export default Navbar = createMaterialBottomTabNavigator(
  {
    // Home: {
    //   screen: HomeStack,
    //   navigationOptions: {
    //     tabBarIcon: homeIcon
    //   }
    // },
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarIcon: Map
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: profileIcon
      }
    }
  },
  {
    initialRouteName: 'Map',
    activeTintColor: '#efcdba',
    inactiveTintColor: '#FFFFFF',
    // barStyle: { backgroundColor: colorTheme.blue.dark }
  }
);
