import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createAppContainer,createDrawerNavigator  } from 'react-navigation';
import StartPage from './js/page/start-page';
import BottomTabBar from './js/common/global/bottom-tab-bar';
import HomePage from './js/page/home-page';


const AppNavigator = createStackNavigator({
  BottomTabBar: {
    screen: BottomTabBar,
    navigationOptions:()=>({
      header:null
    })
  },
  Start: {
    screen: StartPage,
    navigationOptions:()=>({
      header:null
    })
  },
},{
  initialRouteName:'BottomTabBar',
});

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <AppContainer />
    );
  }
}


