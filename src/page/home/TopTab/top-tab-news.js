/**
 * 主页里的选项栏news
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native';

export default class TopTabNews extends Component{


    componentWillMount(){
        
    }

    componentWillUpdate(){
        console.log(this.props.currentChildId);
    }



    render(){
        return (
            <View>
                <Text>news</Text>
            </View>
        );
    }
}