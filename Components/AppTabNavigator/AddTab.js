import React from 'react';
import {Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, Image, AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
import {Header, Left,Right, Body} from 'native-base';
import { Button,Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-view';
import Moment from 'moment';

export default class AddTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: Moment(new Date()).format('MMMM Do YYYY'),
      weight: 200+"",
      weightPlaceholder: 'enter weight',
      calories: 2500+"",
      caloriePlaceholder: 'enter calories',
      avatarSource: "",
      isImageViewVisible: false,
      imageIndex: 0,
    }
    this._onImageAdd = this._onImageAdd.bind(this);
    // this._onImagePress = this._onImagePress.bind(this);
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'add-circle' size ={50} color = 'gold' />
    )
  }

  _onImageAdd() {
    let imageOptions = {
    title: 'Select Photo',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(imageOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({avatarSource: source});
      }
    });
  }
  
  saveData = async() => {
    // clear text inputs; set placehodler to previous input

    let startWeight = this.state.weight
    if(this.state.weightPlaceholder === 'enter weight'){
      AsyncStorage.setItem('startWeight', JSON.stringify(startWeight))
    }

    this.setState({weightPlaceholder : this.state.weight, 
                  caloriePlaceholder : this.state.calories})

    let weightInput = this.refs["weightInput"];
    let calorieInput = this.refs["calorieInput"];
    this.weightInput.clear()
    this.calorieInput.clear()  

    let progress =  {
        weight: this.state.weight,
        calories: this.state.calories,
        date: this.state.date,
        image: this.state.avatarSource,
      }
    this.setState({avatarSource : '' })
    try{

      AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(progress))
    }catch(error){
      console.log(error)
    }
    // navigate back to home tab
    this.props.navigation.navigate('Home', {
      data: progress,
    });    
  }

  confirmSubmission = () => {
    try{
      Alert.alert(
        "Confirm Submission",
        'Are you sure you want to save?',
        [    
          {text: 'Cancel', onPress: () => console.log('Cancelled')},
          {text: 'Confirm', onPress: this.saveData}
        ]
      )
    }catch(error){
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style ={{backgroundColor: '#262730'}}>
          <Left>
          <Button
              title = ""
              icon={
                <Icon name = 'close' size ={30} color = '#D33F49' />
              }
              buttonStyle={{
                backgroundColor: "#262730",
              }}
              onPress={() => this.props.navigation.goBack()}
            />
            {/* <Icon style ={{color: '#D33F49'}} name='ios-arrow-round-back'></Icon> */}
          </Left>
          <Body>
            <Text style ={{color: '#D7C0D0'}}>NEW PROGRESS</Text>
          </Body>
          <Right>
          <Button
              title = ""
              icon={
                <Icon name = 'check' size ={30} color = '#D33F49' />
              }
              buttonStyle={{
                backgroundColor: "#262730",
              }}
              onPress={this.confirmSubmission}
              />
            {/* <Icon style ={{color: '#D33F49'}} name='ios-checkmark'></Icon> */}
          </Right>
        </Header>

        {/* weight input */}
        <View style = {styles.line}>        
          <Text style = {styles.label} >Weight</Text>
          <TextInput
            ref={input => {this.weightInput = input}}
            keyboardType="numeric"
            style={styles.input}
            placeholder={this.state.weightPlaceholder}  
            onChangeText={(newWeight) => this.setState({ weight: newWeight })}
            onBlur={() =>
              // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
              isNaN(this.state.weight) && Alert.alert(this.state.weight+" is not a valid input")}
            />
          <Text style = {styles.label} >lbs</Text>
        </View>

        {/* calories input */}
        <View style = {styles.line}>        
          <Text style = {styles.label}>Calories</Text>
          <TextInput 
            ref={input => {this.calorieInput = input}}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(newCals) => this.setState({ calories: newCals })}
            placeholder={this.state.caloriePlaceholder} 
            onBlur={() =>
            // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
            isNaN(this.state.calories) && Alert.alert(this.state.calories+" is not a valid input")}
            />
          <Text style = {styles.label} >cals</Text>
        </View>

        {/* Date */}
        <View style = {styles.line}>        
          <Text style = {styles.label} >Date</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder='this.state.date'
            format="MMMM Do YYYY"
            minDate="2000-05-01"
            maxDate="2030-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                color: 'red',
                borderWidth: 0,
                paddingBottom: 1
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>

        {/* progress picture input */}
        <View style = {styles.line}>        
          <Text style = {styles.label}>Photo</Text>
          
          <View style = {{flexDirection: 'row'}}>
            <TouchableOpacity style={{paddingRight:40}}>
              <Image style = {{width: 25, height: 25,borderRadius: 12.5}} 
              resizeMethod= 'auto' 
              source={this.state.avatarSource}/>
            </TouchableOpacity>

            <Button
              title = ""
              icon={
                <Icon name = 'camera-alt'color = '#D33F49' />
              }
              buttonStyle={{
                backgroundColor: "lightgrey",
              }}
              onPress={this._onImageAdd}
            />
          </View>
        </View>
      </View>
    ); //return
  }//render
}//addTab class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    color: '#D33F49',
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
  },input: {
    fontSize: 16,
    height: 24, //comment this out and TextInput wont work (some cases the grey background wont be there)
    width: 200,
    textAlign: 'right',
  },label: {
    color: '#D33F49',
    fontSize: 18, 
    textAlign: 'left'
  }
});


// _onImagePress(){
//     this.setState({isImageViewVisible: true})  
//     const images = [
//       {
//           source: {
//               uri: this.state.avatarSource,
//           },
//           title: 'Progress Photo',
//           width: 806,
//           height: 720,
//       },
//     ];

//     <ImageView
//     source={() => images}
//     imageIndex={this.state.imageIndex}
//     isVisible={this.state.isImageViewVisible}
//     renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
//     onClose={() => this.setState({isImageViewVisible: false})}
//     />
//   }

