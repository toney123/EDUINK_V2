import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    login:{
        top:10,
        backgroundColor:'#597EF7',
        height:35,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center'
    },
    loginText:{
        color:'#FFF',
    },
});

/**
 * @param {String} [name] - 按钮文字
 * @param {function} [onPress] - 点击按钮触发的事件
 * @param {Object} [buttonStyle] - 按钮样式
 * @param {Object} [textStyle] - 按钮的文字样式
 * 
 * 按钮组件
 */
export default class Button extends Component{

    // 属性默认值
    static defaultProps = {
        name:'button'
    }

    // 属性验证
    static propTypes = {
        onPress:PropTypes.func,
        name:PropTypes.string
    }

    render(){

        return(
            <TouchableOpacity style={[styles.login,this.props.buttonStyle]} onPress={this.props.onPress}>
                <Text style={[styles.loginText,this.props.textStyle]}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}