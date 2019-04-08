import React, {Component} from 'react';
import { View, Text, Modal } from 'react-native';
import {CardItem} from './CardItem';
import {Button} from './Button';

const Confirm = ({children, visible, onAccept, onDecline}) => {
	const {textStyle, cardItemStyle, containerStyle} = styles;

	return (
		<Modal
			animationType={"slide"}
          	transparent
          	visible={visible}
          	onRequestClose={() => {}}
          	stlye={{flex:1}}
		>
			<View stlye={containerStyle}>
				<CardItem style={cardItemStyle}>
					<Text style={textStyle}>{children}</Text>
				</CardItem>
				<CardItem>
					<Button onPress={onAccept}>"Yes"</Button>
					<Button onPress={onDecline}>"No"</Button>
				</CardItem>
			</View>
		</Modal>
	);
};

const styles = {
	cardItemStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		fontSize: 18,
		flex: 1,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0,0,0,0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export {Confirm};