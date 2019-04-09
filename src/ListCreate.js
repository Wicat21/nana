import React, {Component} from 'react';
import {Alert, Keyboard, Platform, StyleSheet, Text, FlatList, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Scene, Router, Actions} from 'react-native-router-flux';


class ListCreate extends Component {
  constructor(props) {
      super(props);
      console.log(props)
      this.state ={title:'', text: '', selectedColor:'skyblue',valueJSON:this.props.valueJSON, bgColor: [
        'maroon',
        'skyblue',
        'orange',
        'lightseagreen',
        'palegreen',
        'palevioletred',
        'rebeccapurple',
        'teal',
      ]};
  }

  async storeData () {
    try {
      const {title, text, selectedColor} = this.state;
      const myArray = {title: title, text: text, selectedColor:selectedColor}
      var valueJSON = this.state.valueJSON
      console.log(valueJSON)
      if (!valueJSON){
        alert("valuejson undefined volt")
        var valueJSON = [];
      }
      var save = valueJSON.concat(myArray)
      const set = await AsyncStorage.setItem('myArray', JSON.stringify(save))
      Keyboard.dismiss();
    } catch (error) {
      console.log(error)
    }
  }


  async getData () {
      try {
        const get = await AsyncStorage.getItem('myArray')
        if(get !== null) {
          const valueJSON = JSON.parse(get)
          this.setState({valueJSON:valueJSON})
          console.log(valueJSON)
          console.log(this.state.valueJSON)
        }
      } catch (error) {
        console.log(error)
      }
  }

  getRandomColor(){
    var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];
    this.setState({
      selectedColor: item,
    })
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
          <View>
            <TouchableOpacity onPress={()=>this.getRandomColor()}>
              <View style={{height: 50, width: 40, backgroundColor: this.state.selectedColor}}/>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Cím'
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
            <Text style={styles.buttonText}> Create </Text>
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
    flexDirection: 'row'
  },
  containerTextStyle: {
    height: 300,
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
  savebuttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
};


export default ListCreate;