/**
 * 日历页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import { Calendar as Calendars, CalendarList, Agenda } from 'react-native-calendars';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    },
    selectType:{
        flex:1,
        backgroundColor:'#FFF',
        alignItems:'center',
        justifyContent:'center'
    },
    calendarMonth:{
        flex:1,
    },
    calendar:{
        marginTop:10,
        marginBottom:10,
    },
    calendarActivity:{
        flex:1,
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
        alignItems:'center',
        justifyContent:'center'
    },
    monthTypeTouchText:{
        color:'#3B7CEC'
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
    },
    typeContent:{
        flex:12
    },
    activityCard:{
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        marginBottom:10,
        height:60,
        backgroundColor:'#FFF',
        borderRadius:5,
        flexDirection:'row'
    },
    activityCardLeft:{
        flex:6,
        justifyContent:'center'
    },
    activityText:{
        marginLeft:20,
        color:'#42436A'
    },
    activityTime:{
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center'
    },
    activitySign:{
        width:7,
        height:7,
        borderRadius:5,
        backgroundColor:'#FFC53D',
        marginRight:5,
    },  
    activityTimeText:{
        color:'#8F9FB3'
    },
    activityCardRight:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    user:{
        borderRadius:30,
        width:30,
        height:30,
        backgroundColor:'#597EF7',
        justifyContent:'center',
        alignItems:'center',
    },
    userText:{
        color:'#F6F9FF',
        fontSize:10
    } 
});



export default class Index extends Component{

    constructor(){
        super();
        this.state = {
            selectType:'Month'
        }
    }

    componentWillMount(){
        
    }

    // 点击日期
    _clickDay(date){
        
    }

    // 切换选择的类型
    _switchSelectType(typeName){
        this.setState({
            selectType:typeName
        });
    }


    render(){

        let typeContent;
        let monthTypeTouchStyle;
        let monthTypeTouchTextStyle;
        let listTypeTouchStyle;
        let listTypeTouchTextStyle;

        if(this.state.selectType == 'Month'){
            monthTypeTouchStyle = {backgroundColor:'#3B7CEC'};
            monthTypeTouchTextStyle = {color:'#FFF'};
            typeContent=(
                <ScrollView style={styles.calendarMonth}>
                    <Calendars
                        style={styles.calendar}
                        onDayPress={(day) => {this._clickDay(day.dateString)}}
                        markedDates={{
                            '2019-01-01': {selected: true, marked: true, selectedColor: '#4A98F7'},
                            '2019-01-02': {marked: true},
                            '2019-01-05': {marked: true, dotColor: 'red', activeOpacity: 0},
                            '2019-01-06': {disabled: true, disableTouchEvent: true}
                        }}
                    />
                    <View style={styles.calendarActivity}>
                        <TouchableOpacity style={styles.activityCard} onPress={()=>this.props.navigation.navigate('CalendarDetail')}>
                            <View style={styles.activityCardLeft}>
                                <Text style={styles.activityText}>123213213</Text>
                                <View style={styles.activityTime}>
                                    <View style={styles.activitySign}></View>
                                    <Text style={styles.activityTimeText}>14:53-15:00</Text>
                                </View>
                            </View>
                            <View style={styles.activityCardRight}>
                                <View style={styles.user}>
                                    <Text style={styles.userText}>HC</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }else{
            listTypeTouchStyle = {backgroundColor:'#3B7CEC'};
            listTypeTouchTextStyle = {color:'#FFF'};
            typeContent=(
                <View style={styles.calendarList}></View>
            );
        }


        return(
            <View style={styles.container}>
                <View style={styles.selectType}>
                    <View style={styles.selectTypeButton}>
                        <TouchableOpacity style={[styles.monthTypeTouch,monthTypeTouchStyle]} onPress={()=>this._switchSelectType('Month')}>
                            <Text style={[styles.monthTypeTouchText,monthTypeTouchTextStyle]}>Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.listTypeTouch,listTypeTouchStyle]} onPress={()=>this._switchSelectType('List')}>
                            <Text style={[styles.listTypeTouchText,listTypeTouchTextStyle]}>List</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.typeContent}>
                    {typeContent}
                </View>
            </View>
        );
    }
}