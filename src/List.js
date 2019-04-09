import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Scene, Router, Actions} from 'react-native-router-flux';

class List extends Component {
  constructor(props) {
      super(props);
      this.state ={title:'', text: '', selectedColor:'', valueJSON: []};
  }
  
  componentWillMount (){
    this.getData()
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

  render(){
    return(
      <View>
        <View style={styles.headerStyle}>
          <View>
            <Text style={styles.headerText}>Lista</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText} onPress={() =>  Actions.listCreate({valueJSON: this.state.valueJSON})}> + </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.valueJSON &&
            this.state.valueJSON.map((item, i) => {
              console.log(item)
            return (
              <View style={styles.listContainerStyle}>
                <View>
                  <View style={{height: 50, width: 40, backgroundColor: item.selectedColor}}/>
                </View>
                <TouchableOpacity onPress={() => {Actions.listEdit({
                  editedTitle: item.title, 
                  editedText: item.text, 
                  valueJSON: this.state.valueJSON, 
                  i:i,
                  selectedColor: item.selectedColor})}}>
                  <View style={styles.itemStyle}>
                    <Text style={styles.titleStyle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.textStyle} numberOfLines={1}>
                      {item.text}
                    </Text>
                  </View>  
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
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
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    padding: 25,
    color: 'white'
  },
    buttonStyle: {
    position: 'relative',
    backgroundColor: '#003ba8',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    left: -10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  listContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 50},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingBottom: 10,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'flex-start',
    alignContent:'flex-start',
    justifyContent: 'flex-start',
    height: 60
  },
  itemStyle: {
    flex: 7,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: {width: 0.5 ,height: 0.5},
    textShadowColor: '#000',
    textShadowRadius: 1,
  },
  textStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
};


export default List;