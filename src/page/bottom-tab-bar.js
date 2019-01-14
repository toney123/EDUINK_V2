/**
 * 全局底栏
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './home/index';
import Calendar from './calendar/index';
import Absentee from './absentee/index';
import Notice from './notice';
import More from './my';

const iconUri = '../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    }
});


export default class BottomTabBar extends Component{

    constructor(props){
        super(props);
        // 默认tab
        this.state = {
            selectedTab:'Home',
        };
    }

    onChangeTab(tabName){
        // 切换tab时保存当前选择的状态
        this.setState({
            selectedTab:tabName
        });
    }


    componentWillMount(){
        
    }


    render(){
        return(
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{
                        backgroundColor:'#FFF',
                    }}
                >
                    {/* 主页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'home.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'home-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home />
                    </TabNavigator.Item>
                    {/* 通告页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Notice'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'notice.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'notice-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Notice' })}>
                        <Notice/>
                    </TabNavigator.Item>
                    {/* 日历页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Calendar'}
                        renderIcon={() => <Image style={{width:24,height:25}} source={require(iconUri+'calendar.png')} />}
                        renderSelectedIcon={() => <Image style={{width:24,height:25}} source={require(iconUri+'calendar-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Calendar' })}>
                        <Calendar/>
                    </TabNavigator.Item>
                     {/* 请假页 */}
                     <TabNavigator.Item
                        selected={this.state.selectedTab === 'Absentee'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'absentee.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'absentee-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Absentee' })}>
                        <Absentee
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                    {/* 我的页面 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'My'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'my.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'my-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'My' })}>
                        <More
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

