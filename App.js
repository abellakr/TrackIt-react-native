import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import {Icon} from 'native-base';

import MainScreen from './Components/MainScreen';

export default class App extends React.Component {
  static navigationOptions = {
    headerLeft: <Icon name= 'ios-person' style = {{
    paddingLeft: 10}} />,
    title: "TrackIt",
    headerRight: <Icon name= 'ios-add' style = {{
      paddingRight: 10}}/>
  }
  render() {
    return (
      <StackContainer/>  
    );
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: MainScreen
  }
},
{
  animationEnabled: true,
    swipeEnabled: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StackContainer = createAppContainer(RootStack);
