/**
 * 路由
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
import {createStackNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation';
import Index from './src/page/index';
import BottomTabBar from './src/page/common/bottom-tab-bar';
import Login from './src/page/login';
import ForgetPassword from './src/page/forget-password';
import OneSignal from 'react-native-onesignal';
import Calendar from './src/page/calendar/index';
import CalendarDetail from './src/page/calendar/detail';
import CreateAbsenteeNote from './src/page/absentee/create';
import ConfirmAbsenteeNote from './src/page/absentee/confirm';
import AbsenteeNoteDetail from './src/page/absentee/detail';
import NewsDetail from './src/page/news/detail';
import NoticeDetail from './src/page/notice/detail';


// StackNavigator，允许返回
const MainStack = createStackNavigator({
  Main: {screen: BottomTabBar},
  Calendar:{screen:Calendar},
  CalendarDetail:{screen:CalendarDetail},
  CreateAbsenteeNote:{screen:CreateAbsenteeNote},
  ConfirmAbsenteeNote:{screen:ConfirmAbsenteeNote},
  AbsenteeNoteDetail:{screen:AbsenteeNoteDetail},
  NewsDetail:{screen:NewsDetail},
  NoticeDetail:{screen:NoticeDetail}
},{
  initialRouteName:'Main',
  defaultNavigationOptions:{
    header:null
  }
});

// SwitchNavigator单页，忽略返回
const AppContainer = createAppContainer(createSwitchNavigator({
  Login:{screen:Login},
  Index:{screen:Index},
  ForgetPassword:{screen:ForgetPassword},
  Main:{screen:MainStack},
},
  {
  initialRouteName:'Index'
}));


export default class Route extends Component{
  constructor(properties) {
    super(properties);
    OneSignal.init("6ec02f76-2d4f-4fb3-9ae4-866b7e2e89ad");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    // console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  onIds(device) {
    // console.log('Device info: ', device);
  }

  render(){
    return(
      <AppContainer/>
    );
  }
}



