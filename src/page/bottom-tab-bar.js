/**
 * 全局底栏
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './home/index';
import Calendar from './calendar/index';
import Notice from './notice';
import More from './more';

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
                        renderIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/home.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/home-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home />
                    </TabNavigator.Item>
                    {/* 通告页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Notice'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/notice.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/notice-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Notice' })}>
                        <Notice/>
                    </TabNavigator.Item>
                    {/* 日历页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Calendar'}
                        renderIcon={() => <Image style={{width:24,height:25}} source={require('../image/icon/calendar.png')} />}
                        renderSelectedIcon={() => <Image style={{width:24,height:25}} source={require('../image/icon/calendar-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Calendar' })}>
                        <Calendar/>
                    </TabNavigator.Item>
                    {/* 更多功能页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'More'}
                        // title="more"
                        renderIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/more.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require('../image/icon/more-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'More' })}>
                        <More
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

