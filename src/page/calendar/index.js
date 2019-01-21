/**
 * 日历页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import { Calendar as Calendars, CalendarList, Agenda } from 'react-native-calendars';
import {host} from '../../util/constant';
import Loading from '../../component/loading';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
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
            events:[],
            loading:false
        }
    }

    // 发送获取日历事件的请求
    async _sendGetEvent(){
        try {
            const response = await fetch(host+'/grd/children/all/calendars/14/events', {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });
            
            const isResponse = response._bodyText !='' ? true:false;

            if(response.status == 200){

                if(isResponse){
                    const responseJson = JSON.parse(response._bodyInit);

                    delete responseJson.calendar['WR-CALDESC'];
                    delete responseJson.calendar['WR-CALNAME'];
          
                    this.setState({
                        events:responseJson.calendar
                    });
                }
                
            }else{
                if(isResponse){
                    alert(JSON.parse(response._bodyText).message);
                }
            }
            
        } catch (error) {
            alert(error);
        }
    }

    // 执行获取日历事件
    async _getEvent(){
        this.setState({
            loading:true
        });

        await this._sendGetEvent();

        this.setState({
            loading:false
        });
    }

    componentWillMount(){
        this._getEvent();
    }

    // 点击日期
    _clickDay(date){
        
    }


    render(){


        // const {events} = this.state;
        // for (const key in events) {

        //     // 不存在重复规则
        //     if(events[key].rrule == undefined){

        //     }else{
        //         // getDate
        //         const startTimeObject = new Date(events[key].rrule.options.dtstart);
        //         const endTimeObject = new Date(events[key].rrule.options.until);

        //         // 每月重复指定几号
        //         const monthday = events[key].rrule.options.bymonthday.length > 0 ? events[key].rrule.options.bymonthday[0] : undefined;

        //         // 间隔月
        //         if(monthday != undefined){
        //             const startMonth = startTimeObject.getMonth() + 1;
        //             const endMonth = endTimeObject.getMonth() + 1;
        //             // 日期可推算的次数
        //             const count = parseInt((endMonth - startMonth) / events[key].rrule.options.interval);
        //             console.log(count);
        //         }

        //         // console.log('start:'+startDate,'end:'+endDate,'count:'+count,'monthday:'+monthday);
        //         console.log(events[key]);
        //     }
            
        // }



        return(
            <View style={styles.container}>
                <ScrollView style={styles.calendarMonth}>
                    <Calendars
                        style={styles.calendar}
                        onDayPress={(day) => {this._clickDay(day.dateString)}}
                        markedDates={
                            {'2019-01-20': {textColor: 'green'},
                             '2019-01-22': {startingDay: true, color: 'green'},
                             '2019-01-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                             '2019-01-04': {startingDay: true, color: 'yellow'},
                             '2019-01-06': {endingDay: true, color: 'yellow'}
                            }}
                        markingType={'period'}
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
                        <Loading
                            isLoad={this.state.loading}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}