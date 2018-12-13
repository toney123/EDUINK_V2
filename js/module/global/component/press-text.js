/**
 * 可按压文本组件
 * 
 * 需要传入以下属性：
 * 
 * onPress(可选)
 * 类型:function
 * 说明：按压事件
 * 
 * name(可选)
 * 类型:string
 * 说明：文本名
 * 
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    forgetPassword:{
        marginTop:30,
    },
    forgetPasswordText:{
        textAlign:'center',
        color:'#78AEF9'
    }
});

export default class PressText extends Component{

    // 属性默认值
    static defaultProps = {
        onPress:()=>{},
        name:'press Text'
    }

    // 属性验证
    static propTypes = {
        onPress:PropTypes.func,
        name:PropTypes.string
    }


    render(){

        return(
            <TouchableOpacity style={styles.forgetPassword} onPress={this.props.onPress}>
                <Text style={styles.forgetPasswordText}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}