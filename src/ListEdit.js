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
       <View>
        <View style={styles.headerStyle}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() =>  Actions.List()}>
              <Text style={styles.buttonText}> Vissza </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.containerStyle}>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              value={this.state.title}
              onChangeText={title=>this.setState({title})}
            />
        </View>
        <View style={styles.containerTextStyle}>
          <TextInput 
            style={{flex:1}}
            multiline={true}
            value={this.state.text}
            onChangeText={text=>this.setState({text})}
          />
        </View>
        <View style={styles.savebuttonStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.storeData()}>
            <Text style={styles.buttonText}> Save </Text>
          </TouchableOpacity>
        </View>  
        <View style={styles.savebuttonStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.delete()}>
            <Text style={styles.buttonText}> Delete </Text>
          </TouchableOpacity>
        </View>       
      </View>
    )
  }
};

const styles = {
  headerStyle:{
    backgroundColor: '#001c4f',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 60,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  containerTextStyle: {
    height: 300,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  buttonStyle: {
    marginLeft: 15,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: '#003ba8',
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    left: -10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  savebuttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};


export default ListEdit;