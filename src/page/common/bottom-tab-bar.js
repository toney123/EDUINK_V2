/**
 * 全局底栏
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import TopNav from './top-nav';

const iconUri = '../../image/icon/';

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
                        <TopNav 
                            contentType='News'
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                    {/* 通告页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Notice'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'notice.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'notice-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Notice' })}>
                        <TopNav 
                            contentType='Notices'
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                    {/* 日历页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Calendar'}
                        renderIcon={() => <Image style={{width:24,height:25}} source={require(iconUri+'calendar.png')} />}
                        renderSelectedIcon={() => <Image style={{width:24,height:25}} source={require(iconUri+'calendar-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Calendar' })}>
                         <TopNav 
                            contentType='Calendars'
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                     {/* 请假页 */}
                     <TabNavigator.Item
                        selected={this.state.selectedTab === 'Absentee'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'absentee.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'absentee-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Absentee' })}>
                        <TopNav
                            contentType='Absence notes'
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                    {/* 我的页面 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'My'}
                        renderIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'my.png')} />}
                        renderSelectedIcon={() => <Image style={{width:25,height:25}} source={require(iconUri+'my-selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'My' })}>
                        <TopNav
                            contentType='My account'
                            navigation = {this.props.navigation}
                        />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

