import React from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';

import HomeTab from './AppTabNavigator/HomeTab';
import AddTab from './AppTabNavigator/AddTab';
import GalleryTab from './AppTabNavigator/GalleryTab';
import ProgressTab from './AppTabNavigator/ProgressTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

import {
  createBottomTabNavigator,
  createBottomStackNavigator,
  createAppContainer
} from 'react-navigation';

import {Icon} from 'native-base';

export default class MainScreen extends React.Component {
  static navigationOptions = { header:null }
  constructor(props){
    super(props)
      this.state = {
        allProgress: [],
      }
  }
  render() {
    return (
      <App/>
    );
  }
}

const AppTabNavigator = createBottomTabNavigator ({
    Home: {
      screen: HomeTab
    },
    Gallery: {
      screen: GalleryTab
    },
    Add: {
      screen: AddTab
    },
    Progress: {
      screen: ProgressTab
    },
    Profile: {
      screen: ProfileTab
    }
  },{
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      // style: {
      //   ...Platform.select({
      //     android::{
      //       backgroundColor: 'white'
      //     }
      //   })
      // },
      style: {
        backgroundColor: '#262730'
      },
      activeTintColor: '#D33F49', //red
      inactiveTintColor: '#D7C0D0', //lavender
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = createAppContainer(AppTabNavigator);

