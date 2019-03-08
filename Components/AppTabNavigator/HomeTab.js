import React from 'react';
import { Image, Alert, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View, AsyncStorage, Dimensions, ListView, FlatList, } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left,Right, Body, Card, CardItem} from 'native-base';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';

import { Button, Icon } from 'react-native-elements'


export default class HomeTab extends React.Component {
  static navigationOptions = {
  title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'home' size ={32} color = {tintColor} />
    )
  }
  constructor() {
    super()
    this.state = {
      startWeight: 0,
      currentWeight: 0,
      goalWeight: 160,
      weightChange: 0,
      calorieAverage: 0,
      isMetric: false,
      data: [],
      isLoaded: false,
    }
  }

  componentWillReceiveProps(nextProps){ 
    try{
      AsyncStorage.getItem('startWeight').then((weight) => {
        if(weight != null) {
          let parsed = JSON.parse(weight)
          parsed = parseFloat(parsed,10).toFixed(1);
          this.setState({ startWeight : parsed })
        }
      }).done();
    }catch(error){
      console.log(error)
    }
    this.updateData(nextProps); 
  }

  updateData(props){
    try{
      AsyncStorage.getItem('@MySuperStore:key').then((progress) => {
        if(progress != null) {
          let parsed = JSON.parse(progress)

          let newDs = this.state.data.slice()

          // if(isNaN(parsed.calories)){
          //   parsed.calories = 'no calories provided'
          // }


          newDs.unshift(parsed)

          this.setState({ data: newDs,
                          isLoaded: true
                        }, ()=>{
                          this.calculateCurrentWeight(),
                          this.calculateCalorieAverage()
                        })
        }
      }).done();
    }catch(error){
      console.log(error);
    }
  }
  
  calculateCalorieAverage(){
    let sumCals = 0
    let avgCals = 0
    let numData = 0
    let checkData = this.state.data.slice();

    if(checkData.length < 7){
      //if size is >= 8
      for(let i = 0; i < checkData.length; i++){
          sumCals += parseInt(checkData[i].calories,10)
          numData++
      }
      avgCals = (sumCals / numData);
      // Alert.alert(avgWeight+'');
    }else{
      //if size >= 8 but < 14, only average last 7 days worth of weight
      for(let i = 0; i < 7; i++){
        sumCals += parseInt(checkData[i].calories,10)
        numData++
      }
      avgCals = sumCals / numData;
    }
    this.setState({ calorieAverage : avgCals.toFixed(1) })
  }

  calculateCurrentWeight(){
    let sumWeight = 0
    let avgWeight = 0
    let checkData = this.state.data.slice();

    if(checkData.length < 7){
      //if size is < 7
      for(let i = 0; i < checkData.length; i++){
        sumWeight += parseFloat(checkData[i].weight,10);
      }
      avgWeight = (sumWeight / checkData.length);
      // Alert.alert(avgWeight+'');
    }else{
      //if size >= 7 only average last 7 days worth of weight
      for(let i = 0; i < 7; i++){
        sumWeight += parseFloat(checkData[i].weight,10);
      }
      avgWeight = sumWeight / 7;
    }
    this.setState({ currentWeight : avgWeight.toFixed(1) }, () => {
      this.calculateWeightChange()
      })
    }

  calculateWeightChange(){
    let weightDiff = this.state.currentWeight - this.state.startWeight
    this.setState({weightChange : Math.abs(weightDiff.toFixed(1)) });
  }

  renderImage(index){
    return (
      <View>
      <Image style = {{width: 25, height: 25,borderRadius: 12.5}} 
          resizeMethod= 'auto' 
          source={this.state.data[index].image}/>
      </View>
    );
  }
  renderLoadingScreen() {
  return (
    <View>
      <Text style={styles.cancel}>Loading</Text>
    </View>
  );
  }


  render() {
    return (
      <View style={styles.container}>
      {/* frame header */}
        <Header style ={{backgroundColor: '#262730', paddingBottom: 0}}>
          <Left>
          </Left>
          <Body>
            <Text style ={{color: '#D7C0D0', fontSize: 18}}>HOME</Text>
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

        {/* statistics overview */}
        <View style = {{backgroundColor: "#D33F49"}}>
        <Card transparent>
          <CardItem style = {{backgroundColor: "#D33F49", paddingRight: 8, paddingLeft: 0, paddingBottom: 0,
                              paddingTop: 0}} >
            <Left>
              <Body>
                <Text style={{marginBottom: 10, color: '#262730', textAlign: "left"}}>
                Starting weight: </Text>
                <Text style={{marginBottom: 10, color: '#EFF0D1', textAlign: "left"}}>
                {this.state.startWeight} lbs</Text>
              </Body>

              <Body>
                <Text style={{marginBottom: 10, color: '#262730', textAlign: "center"}}>
                Current weight: </Text>
                <Text style={{marginBottom: 10, color: 'gold', textAlign: "center"}}>
                {this.state.currentWeight} lbs </Text>
              </Body>

              <Body>
                <Text style={{marginBottom: 10, color: '#262730', textAlign: "right"}}>
                Goal weight: </Text>
                <Text style={{marginBottom: 10, color: '#EFF0D1', textAlign: "right"}}>
                {this.state.goalWeight} lbs </Text>
              </Body>
            </Left>
            </CardItem>
            {/* progress bar */}
        <Progress.Bar color={'gold'} borderColor= {'#262730'} unfilledColor= {'#EFF0D1'} style={{marginTop: 3, marginBottom: 0}} 
                        progress={ (this.state.startWeight-this.state.currentWeight)/(this.state.startWeight-this.state.goalWeight)} width={null} />

            <CardItem style = {{backgroundColor: "#D33F49", padding: 1}} >
             <Left>
              <Body>
                <Text style={{marginBottom: 10, color: '#262730', textAlign: "center"}}>
                  Weight change: </Text>
                <Text style={{marginBottom: 10, color: '#EFF0D1', textAlign: "center"}}>
                  {this.state.startWeight <= this.state.currentWeight ? '+' : '-'}{this.state.weightChange} lbs </Text>
              </Body>
          
              <Body>
                <Text style={{marginBottom: 10, color: '#262730', textAlign: "center"}}>
                  average calories: </Text>
                <Text style={{marginBottom: 10, color: '#EFF0D1', textAlign: "center"}}>
                {this.state.calorieAverage} </Text>
              </Body>
             </Left>
          </CardItem>
        </Card>

        </View>

        {/* progress history list view */}
        <View>
          <Text style = {styles.header}>Progress History</Text>
          {/* <Button title = "click here" onPress ={this.updateData}/> */}
          <View>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data= {this.state.data }
              renderItem={({item, index}) => 
                <View>
                    <Card style = {{margin: 0, padding: 0}}>
                      <TouchableOpacity>
                        <CardItem style = {{ margin: 0, backgroundColor: 'lightgrey', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                          <Body>
                            <Text style={{}}>{item.date}</Text>
                              {this.state.isLoaded ? this.renderImage(index) : this.renderLoadingScreen()}
                          </Body> 
                          <Right>  
                            <Body>
                              <Text style={{textAlign: 'right', alignSelf: 'stretch',fontWeight: 'bold'}}>{parseFloat(item.weight,10).toFixed(1)} {this.state.isMetric ? 'kg' : 'lbs'}</Text>
                              <Text style={{textAlign: 'right', alignSelf: 'stretch'}}>{parseFloat(item.calories,10).toFixed(2)} calories</Text>
                            </Body>
                          </Right> 

                          <Icon name="chevron-right" size={30} color = 'grey'/>
                        </CardItem>
                      </TouchableOpacity>
                    </Card>
                </View>
              }
              keyExtractor={(item, index) => '${item}'}
            />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }, text: {
    fontSize: 24,
    justifyContent: "center"
  }, cardContainer: {
    flexDirection: 'row', 
    // justifyContent: 'space-between',
    borderRadius: 0, 
    margin: 0, 
    padding: 15, 
    backgroundColor: '#D33F49'
  }, line: {
    flexDirection: 'column',
    backgroundColor: "#000"
  }, header: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#262730',
    color: '#D7C0D0',
    padding: 5,
  }, listData: {
    fontSize: 20,
    borderTopWidth: 1,
    marginBottom: 5,
  }, contentWrapper: {
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  }, listItem: {
    textAlign: 'right',
  }
});



        {/* <Card containerStyle={{flexDirection: 'row', 
        // justifyContent: 'space-between',
        borderRadius: 0, 
        margin: 0, 
        padding: 15, 
        backgroundColor: '#D33F49'}}>
        
        <View style = {styles.line}>
          <Text style={{marginBottom: 10, color: '#EFF0D1',textAlign: 'right'}}>
            Starting weight: </Text>
          <Text style={{marginBottom: 10, color: '#EFF0D1',textAlign: 'right'}}>
            Current weight: </Text>
          <Text style={{marginBottom: 10, color: '#EFF0D1', textAlign: 'right'}}>
            Goal weight: </Text>
        </View>

        <View style = {styles.line}>
          <Text style={{marginBottom: 10, color: '#EFF0D1',textAlign: 'right'}}>
            Weight change: </Text>
          <Text style={{marginBottom: 10, color: '#EFF0D1',textAlign: 'right'}}>
            52 lbs </Text>
        </View>

        </Card> */}

        {/* <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' /> */}
      
        {/* <Image style={styles.image} source={require('../../assets/yeet.jpg')} /> */}
