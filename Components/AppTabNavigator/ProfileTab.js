import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header, Left,Right, Body} from 'native-base';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class ProfileTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'person' size ={32} color = {tintColor} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style ={{backgroundColor: '#262730'}}>
          <Left>
          </Left>
          <Body>
            <Text style ={{color: '#D7C0D0'}}>PROFILE</Text>
          </Body>
          <Right>
            {/* <Icon style ={{color: '#D33F49'}} name='ios-add-circle'></Icon> */}
          </Right>
        </Header>
        <Text>Profile Tab</Text> 
        <Text>Here, Users can see an overview of their Account</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
});
