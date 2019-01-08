import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    navigationBar:{
        flex:1,
        backgroundColor:"#FFF",     
    },
    navigationBarIn:{
        flex:1,
        flexDirection:'row',
        top:10,
    },
    navigationLeft:{
        flex:1,
        top:3,
    },
    navigationCenter:{
        flex:2,
    },
    navigationRight:{
        flex:1,
    },
});

/**
 * @param {element} [leftSection] - 自定义导航栏左边的部分
 * @param {element} [centerSection] - 自定义导航栏中间的部分
 * @param {element} [centerSection] - 自定义导航栏右边的部分
 * 
 * 导航栏
 */
export default class TopNavBar extends Component{

    // 属性默认值
    static defaultProps = {

    }


    // 属性验证
    static propTypes = {
        leftSection:PropTypes.element,
        centerSection:PropTypes.element,
        rightSection:PropTypes.element
    }


    constructor(props){
        super(props);
    }


    render(){

        return(
            <View style={styles.navigationBar}>
                {/* 状态栏 */}
                <StatusBar
                    barStyle='dark-content' 
                    backgroundColor='#FFF'
                    animated={true}
                />
                
                <View style={styles.navigationBarIn}>
                    <View style={styles.navigationLeft}>
                        {this.props.leftSection}
                    </View>
                    <View style={styles.navigationCenter}>
                        {this.props.centerSection}
                    </View>
                    <View style={styles.navigationRight}>
                        {this.props.rightSection}
                    </View>
                </View>
            </View>
        );
    }
}