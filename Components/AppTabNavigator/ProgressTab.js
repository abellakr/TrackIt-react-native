import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Header, Left,Right, Body} from 'native-base';

import { Button } from 'react-native-elements';

import { Icon } from 'react-native-elements'

export default class ProgressTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'trending-up' size ={32} color = {tintColor} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Header style ={{backgroundColor: '#262730'}}>
          <Left>
          </Left>
          <Body>
            <Text style ={{color: '#D7C0D0'}}>TRENDS</Text>
          </Body>
          <Right>
            <Button
              title = ""
              icon={
                <Icon name = 'add' size ={28} color = 'gold' />
              }
              buttonStyle={{
                backgroundColor: "#262730",
              }}
              onPress={() => this.props.navigation.navigate('Add')}
            />
          {/* <Icon style ={{color: '#D33F49', paddingLeft: 10}} name='ios-add'></Icon> */}
          </Right>
        </Header>
        <Text>Progress</Text>
        {/* <Button
              title=""
              icon ={
              <Icon name = 'trending-up' style={{ color: '#D7C0D0'}} />
              }
        /> */}
        <Text>Here, Users can view their Progress thrugh weigh trends, graphs, etc.</Text>
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
