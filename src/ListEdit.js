import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ListView, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Card, CardItem, Button} from './common/';
import AsyncStorage from '@react-native-community/async-storage';
import {Scene, Router, Actions} from 'react-native-router-flux';

class ListEdit extends Component {
  constructor(props) {
      super(props);
      this.state ={title:this.props.editedTitle, text: this.props.editedText, i:this.props.i, valueJSON: this.props.valueJSON};

  }

  async storeData () {
    try {
      var valueJSON = this.state.valueJSON
      this.state.valueJSON[this.state.i].title = this.state.title, 
      this.state.valueJSON[this.state.i].text = this.state.text
      const set = await AsyncStorage.setItem('myArray', JSON.stringify(valueJSON))
      Alert.alert('You tapped the button!');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error)
    }
  }

  async delete(){
    this.state.valueJSON.splice(this.state.i, 1);
    console.log("lefutott");
    try {
      var valueJSON = this.state.valueJSON
      const set = await AsyncStorage.setItem('myArray', JSON.stringify(valueJSON))
      Actions.List();
    } catch (error) {
      console.log(error)
    }
  }

  render(){
    return (
      <Card>
      <TouchableOpacity onPress={() =>  Actions.List()}>
      <Text> Vissza </Text>
      </TouchableOpacity>
        <CardItem>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              value={this.state.title}
              onChangeText={title=>this.setState({title})}
            />
          </View>
        </CardItem>
        <CardItem>
          <TextInput 
            style={{flex:1}}
            multiline={true}
            value={this.state.text}
            onChangeText={text=>this.setState({text})}
          />
        </CardItem>
        <CardItem>
          <Button
            onPress={()=>this.storeData()}
          >Save</Button>
        </CardItem>  
        <CardItem>
          <Button
            onPress={()=>this.delete()}
          >Delete</Button>
        </CardItem>       
      </Card>
    )
  }
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 8,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 2,
  },
  containerStyle: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
};


export default ListEdit;