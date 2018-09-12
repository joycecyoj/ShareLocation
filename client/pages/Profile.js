import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import Map from './Map';
import Login from './Login';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Profile',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow },
  };

  render() {
    // const { user } = this.props;

    return (
      <ScrollView style={{ backgroundColor: colorTheme.blue.medium }}>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.personalityImgSmall}
              source={{ uri: personalityType.imageUrl }}
              resizeMode="stretch"
            />
          </View>

          <Text style={styles.reminderIntervalSmallText}>
            Email: {user.email}
          </Text>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Map`}
              onPress={() => {
                this.props.navigation.navigate('Map', { title: 'Map' });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Account Settings`}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Logout`}
              onPress={() => {
                this.props.navigation.navigate('Login', { title: 'Login' });
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export const ProfileStack = createStackNavigator({
  Map: { screen: Map },
  Login: { screen: Login },
});
