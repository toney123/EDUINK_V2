/**
 * 全局底栏
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../../page/home-page';
import ChatPage from '../../page/chat-page';
import NoticePage from '../../page/notice-page';
import MorePage from '../../page/more-page';


export default class BottomTabBar extends Component{

    constructor(props){
        super(props);
        // 默认tab
        this.state = {
            selectedTab:'Home',
        };
        this.onClickDrawer = this.onClickDrawer.bind(this);
    }

    onChangeTab(tabName){
        // 切换tab时保存当前选择的状态
        this.setState({
            selectedTab:tabName
        });
    }

    // 点击中间的抽屉按钮
    onClickDrawer(){
        
    }

    render(){
        return(
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{
                        backgroundColor:'#FFF',
                        borderWidth:1,
                        borderColor:'#FFF'
                    }}
                >
                    {/* 主页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        renderIcon={() => <Icon name="home" size={25} />}
                        renderSelectedIcon={() => <Icon name="home" size={25} color='#597EF7' />}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <HomePage />
                    </TabNavigator.Item>
                    {/* 聊天页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Chat'}
                        // title="Chat"
                        renderIcon={() => <Icon name="comments" size={25} />}
                        renderSelectedIcon={() => <Icon name="comments" size={25} color='#597EF7' />}
                        onPress={() => this.setState({ selectedTab: 'Chat' })}>
                        <ChatPage/>
                    </TabNavigator.Item>
                    {/* 抽屉 */}
                    <TabNavigator.Item
                        // title="drawer"
                        renderIcon={() => <Icon name="plus-square" size={25} color='#597EF7' />}
                        renderSelectedIcon={() => <Icon name="plus-square" size={25} color='#597EF7' />}
                        onPress={this.onClickDrawer}>
                    </TabNavigator.Item>
                    {/* 通告页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Notice'}
                        // title="Notice"
                        renderIcon={() => <Icon name="bell" size={25} />}
                        renderSelectedIcon={() => <Icon name="bell" size={25} color='#597EF7' />}
                        onPress={() => this.setState({ selectedTab: 'Notice' })}>
                        <NoticePage/>
                    </TabNavigator.Item>
                    {/* 更多功能页 */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'More'}
                        // title="more"
                        renderIcon={() => <Icon name="ellipsis-h" size={25} />}
                        renderSelectedIcon={() => <Icon name="ellipsis-h" size={25} color='#597EF7' />}
                        onPress={() => this.setState({ selectedTab: 'More' })}>
                        <MorePage/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    }
});