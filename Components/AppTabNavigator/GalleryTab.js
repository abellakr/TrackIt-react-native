import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header, Left,Right, Body} from 'native-base';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class GalleryTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'image' size ={30} color = {tintColor} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style ={{backgroundColor: '#262730'}}>
          <Left>
          </Left>
          <Body>
            <Text style ={{color: '#D7C0D0'}}>GALLERY</Text>
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
          </Right>
        </Header>
        <View style = {{flex: 4, backgroundColor: 'green'}}>
          <Text>chosen photo</Text>
        </View> 
        <View style = {{flex: 1, backgroundColor: 'blue'}}>
          <Text>list of progress photos</Text>
        </View>
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
