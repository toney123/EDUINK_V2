import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,TextInput,Button} from 'react-native';

const styles = StyleSheet.create({
    login:{
        top:10,
        backgroundColor:'#597EF7',
        height:35,
        borderRadius:3,
    },
    loginText:{
        top:8,
        color:'#FFF',
        textAlign:'center'
    },
});


export default class SelfButton extends Component{
    render(){
        const onClickButton = this.props.onClickButton;
        const buttonName = this.props.buttonName;

        return(
            <TouchableOpacity style={styles.login} onPress={onClickButton}>
                <Text style={styles.loginText}>{buttonName}</Text>
            </TouchableOpacity>
        );
    }
}