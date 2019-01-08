/**
 * 日历页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import TopNavBar from '../component/top-nav-bar';
import { Calendar as Calendars, CalendarList, Agenda } from 'react-native-calendars';

const iconUri = '../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    },
    containerTop:{
        flex:1,
    },
    containerBottom:{
        flex:12
    },
    topNavBarCenterText:{
        textAlign:'center',
        fontSize:18
    },
    topNavBarLeftIcon:{
        left:5,
        bottom:10,
    }, 
    selectType:{
        flex:1,
        backgroundColor:'#FFF',
        alignItems:'center',
        justifyContent:'center'
    },
    calendar:{
        flex:5,
    },
    calendarCenter:{
        marginTop:10,
        marginBottom:10,
    },
    activity:{
        flex:5
    },
    selectTypeButton:{
        width:180,
        height:30,
        borderWidth:1,
        borderColor:'#3B7CEC',
        borderRadius:15,
        flexDirection:'row'
    },
    monthTypeTouch:{
        flex:1,
        borderTopLeftRadius:13,
        borderBottomLeftRadius:13,
        backgroundColor:'#3B7CEC',
        alignItems:'center',
        justifyContent:'center'
    },
    monthTypeTouchText:{
        color:'#FFF'
    },
    listTypeTouch:{
        flex:1,
        borderTopRightRadius:13,
        borderBottomRightRadius:13,
        alignItems:'center',
        justifyContent:'center'
    },
    listTypeTouchText:{
        color:'#3B7CEC'
    } 
});



export default class Calendar extends Component{

    constructor(){
        super();
    }

    // 点击日期
    _clickDay(date){
        
    }



    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={()=>this.props.navigation.goBack()}>
                                <Image style={{width:40,height:40}} source={require(iconUri+'back.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Calendar</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.selectType}>
                        <View style={styles.selectTypeButton}>
                            <TouchableOpacity style={styles.monthTypeTouch}>
                                <Text style={styles.monthTypeTouchText}>Month</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.listTypeTouch}>
                                <Text style={styles.listTypeTouchText}>List</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={styles.calendar}>
                        <View style={styles.calendarCenter}>
                            <Calendars
                                onDayPress={(day) => {this._clickDay(day.dateString)}}
                                markedDates={{
                                    '2019-01-01': {selected: true, marked: true, selectedColor: '#4A98F7'},
                                    '2019-01-02': {marked: true},
                                    '2019-01-05': {marked: true, dotColor: 'red', activeOpacity: 0},
                                    '2019-01-06': {disabled: true, disableTouchEvent: true}
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.activity}></View>
                </View>
            </View>
        );
    }
}