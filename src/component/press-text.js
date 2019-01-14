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

/**
 * 可按压文本组件
 * @param {String} [name] - 文字名
 * @param {function} [onPress] - 点击文本触发的事件
 */
export default class PressText extends Component{

    // 属性默认值
    static defaultProps = {
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