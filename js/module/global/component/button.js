/**
 * 按钮组件
 * 
 * 需要传入以下属性：
 * 
 * onPress(可选)
 * 类型:function
 * 说明：按压事件
 * 
 * name(可选)
 * 类型:string
 * 说明：按钮名
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


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


export default class Button extends Component{

    // 属性默认值
    static defaultProps = {
        onPress:()=>{},
        name:'button'
    }

    // 属性验证
    static propTypes = {
        onPress:PropTypes.func,
        name:PropTypes.string
    }

    render(){

        return(
            <TouchableOpacity style={styles.login} onPress={this.props.onPress}>
                <Text style={styles.loginText}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}