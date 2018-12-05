import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
import {createStackNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation';
import StartPage from './js/page/start-page';
import BottomTabBar from './js/common/global/page/bottom-tab-bar';
import LoginPage from './js/page/login-page';
import ForgetPasswordPage from './js/page/forget-password-page';


// StackNavigator，允许返回
const MainStack = createStackNavigator({
  Main: {
    screen: BottomTabBar,
    navigationOptions:()=>({
      header:null
    })
  },
});

// SwitchNavigator单页，忽略返回
export default createAppContainer(createSwitchNavigator({
  Login:{
    screen:LoginPage,
  },
  Start: {
    screen:StartPage,
  },
  ForgetPassword:{
    screen:ForgetPasswordPage
  },
  Main:{
    screen:MainStack
  },
},
  {
  initialRouteName:'Start'
}));



