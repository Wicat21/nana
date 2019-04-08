import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = (props) => {
  const {textStyle, container} = styles;

  return (
    <View style={container}>
      <Text stlye={textStyle}>{props.headerText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {fontSize: 20},
});

export {Header};