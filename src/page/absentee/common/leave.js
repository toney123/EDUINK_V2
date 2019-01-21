import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,TextInput} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    leave:{
        backgroundColor:'#FFF',
        height:280,
        borderRadius:8
    },
    leaveTop:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    excuseText:{
        fontSize:20,
        color:'#42436A'
    },
    leaveBottom:{
        flex:3
    },
    cutLine:{
        borderBottomWidth:1,
        borderColor:'#ededed',
        marginLeft:15,
        marginRight:15
    },
    leaveInfoMargin:{
        marginTop:30
    },
    leaveInfo:{
        marginLeft:30,
        flexDirection:'row',
        marginTop:5,
        marginBottom:5
    },
    leaveInfoSign:{
        color:'#8F9FB3'
    },
    leaveInfoContent:{
        color:'#42436A',
        marginLeft:10
    },
});

/**
 * 请假条样式
 * @param {String} childrenName - 孩子的名字
 * @param {String} startDate - 开始日期
 * @param {String} endDate - 结束日期
 * @param {String} reason - 请假理由
 */
export default class Leave extends Component{

    // 属性验证
    static propTypes = {
        childrenName:PropTypes.string.isRequired,
        startDate:PropTypes.string.isRequired,
        endDate:PropTypes.string.isRequired,
        reason:PropTypes.string.isRequired
    }


    render(){
        return(
            <View style={styles.leave}>
                <View style={styles.leaveTop}>
                    <Text style={styles.excuseText}>Absenteee notes</Text>
                </View>
                <View style={styles.cutLine}></View>    
                <View style={styles.leaveBottom}>
                    <View style={styles.leaveInfoMargin}>
                        <View style={styles.leaveInfo}>
                            <Text style={styles.leaveInfoSign}>Student:</Text>
                            <Text style={styles.leaveInfoContent}>{this.props.childrenName}</Text>
                        </View>
                        <View style={styles.leaveInfo}>
                            <Text style={styles.leaveInfoSign}>Start Date:</Text>
                            <Text style={styles.leaveInfoContent}>{this.props.startDate}</Text>
                        </View>
                        <View style={styles.leaveInfo}>
                            <Text style={styles.leaveInfoSign}>End Date:</Text>
                            <Text style={styles.leaveInfoContent}>{this.props.endDate}</Text>
                        </View>
                        <View style={styles.leaveInfo}>
                            <Text style={styles.leaveInfoSign}>Reason:</Text>
                            <Text style={styles.leaveInfoContent}>{this.props.reason}</Text>
                        </View>
                    </View>
                </View>
            </View> 
        );
    }
}




