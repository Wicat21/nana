import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Scene, Router, Actions} from 'react-native-router-flux';

class List extends Component {
  constructor(props) {
      super(props);
      this.state ={title:'', text: '', valueJSON: []};
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
        <View style={styles.nextStyle}>
          <TouchableOpacity onPress={() =>  Actions.listCreate({valueJSON: this.state.valueJSON})}>
            <Text> ÚJ </Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.valueJSON &&
            this.state.valueJSON.map((item, i) => {
              console.log(item)
            return (
              <View style={styles.listStyle}>
                  <View style={styles.boxStyle}>
                    <View style={{height: 90, width: 50, backgroundColor: 'powderblue'}}/>
                  </View>
                   <TouchableOpacity onPress={() => { Actions.listEdit({editedTitle: item.title, editedText: item.text, valueJSON: this.state.valueJSON, i:i})}}>
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
        </View>
        <View style={styles.listStyle}>
          <View style={styles.boxStyle}>
            <View style={{height: 90, width: 50, backgroundColor: 'powderblue'}} />
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.titleStyle}>Na</Text>
            <Text style={styles.textStyle}>Najhsdlfnskldfsdf</Text>
          </View>
        </View>
      </View>
    )
  }
};


const styles = {
  listStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 50},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    paddingBottom: 10,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'stretch',
    height: 100
  },
  boxStyle: {
    flex:1
  },
  itemStyle: {
    flex: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    marginLeft: 60,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  titleStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: {width: 1,height: 1},
    textShadowColor: '#000',
    textShadowRadius: 5,
  },
  textStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
  nextStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: 'flex-end'
  },
};


export default List;