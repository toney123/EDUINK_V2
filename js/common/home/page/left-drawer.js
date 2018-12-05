/**
 * 主页里的左侧抽屉
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    containerTop:{
        flex:1,
    },
    containerCenter:{
        flex:7,
    },
    containerBottom:{
        flex:9,
    },
    person:{
        flexDirection:'row',
        height:50,
        marginBottom:15,
    },
    personLeft:{
        flex:3,
    },
    personCenter:{
        flex:5,
    },
    personRight:{
        flex:1,
    },
    avatar:{
        borderRadius:40,
        backgroundColor:'#40A9FF',
        height:49,
        width:49,
        left:15
    },
    avatarText:{
        color:'#FFF',
        textAlign:'center',
        top:15,
    },
    studentTop:{
        flex:1,
    },
    studentBottom:{
        flex:1,
    },
    studentName:{
        color:"#42436A",
        top:5,
    },
    studentClassName:{
        color:'#8F9FB3',
        fontSize:11,
        top:5,
    },
    clickPerson:{
        borderRadius:20,
        backgroundColor:'#4A98F7',
        height:5,
        width:5,
        alignSelf:'center',
        top:25,
    }
});


export default class LeftDrawer extends Component{

    constructor(props){
        super(props);
    }


    componentWillUpdate(){
       
    }


    render(){
        return(
            <View style={styles.container}>

                <View style={styles.containerTop}></View>
                <View style={styles.containerCenter}>
                    {/* 所有学生 */}
                    <TouchableOpacity onPress={()=>{this.props.updateState(0)}}>
                        <View style={styles.person}>
                            <View style={styles.personLeft}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>ALL</Text>
                                </View>
                            </View>
                            <View style={styles.personCenter}>
                                <View style={styles.studentTop}>
                                    <Text style={styles.studentName}>All Children</Text>
                                </View>
                                <View style={styles.studentBottom}>
                                    <Text style={styles.studentClassName}>中六班</Text>
                                </View>
                            </View>
                            <View style={styles.personRight}>
                                <View style={styles.clickPerson}></View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.updateState(1)}}>
                        <View style={styles.person}>
                            <View style={styles.personLeft}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>ALL</Text>
                                </View>
                            </View>
                            <View style={styles.personCenter}>
                                <View style={styles.studentTop}>
                                    <Text style={styles.studentName}>Test Yu</Text>
                                </View>
                                <View style={styles.studentBottom}>
                                    <Text style={styles.studentClassName}>中六班</Text>
                                </View>
                            </View>
                            <View style={styles.personRight}>
                                <View style={styles.clickPerson}></View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.updateState(2)}}>
                        <View style={styles.person}>
                            <View style={styles.personLeft}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>ALL</Text>
                                </View>
                            </View>
                            <View style={styles.personCenter}>
                                <View style={styles.studentTop}>
                                    <Text style={styles.studentName}>Test Li</Text>
                                </View>
                                <View style={styles.studentBottom}>
                                    <Text style={styles.studentClassName}>中六班</Text>
                                </View>
                            </View>
                            <View style={styles.personRight}>
                                <View style={styles.clickPerson}></View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}></View>      
            </View>
        );
    };
}

