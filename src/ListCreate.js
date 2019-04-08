import React, {Component} from 'react';
import {Alert, Keyboard, Platform, StyleSheet, Text, FlatList, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardItem, Button} from './common/';
import {Scene, Router, Actions} from 'react-native-router-flux';


class ListCreate extends Component {
  constructor(props) {
      super(props);
      console.log(props)
      this.state ={title:'', text: '', valueJSON:this.props.valueJSON};
  }

  async storeData () {
    try {
      const {title, text} = this.state;
      const myArray = {title: title, text: text}
     
      var valueJSON = this.state.valueJSON
      if (!valueJSON){
        var valueJSON = [];
      }
      var save = valueJSON.concat(myArray)
      const set = await AsyncStorage.setItem('myArray', JSON.stringify(save))
      Alert.alert('You tapped the button!');
      Keyboard.dismiss();
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
          >Create</Button>
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


export default ListCreate;