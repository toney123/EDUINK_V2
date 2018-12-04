/**
 * 可点击的text
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,TextInput,Button} from 'react-native';

const styles = StyleSheet.create({
    forgetPassword:{
        marginTop:30,
    },
    forgetPasswordText:{
        textAlign:'center',
        color:'#78AEF9'
    }
});

export default class SelfLinkText extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.forgetPassword} onPress={this.props.onClickText}>
                <Text style={styles.forgetPasswordText}>{this.props.textName}</Text>
            </TouchableOpacity>
        );
    }
}