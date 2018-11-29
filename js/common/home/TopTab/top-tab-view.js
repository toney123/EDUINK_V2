/**
 * 主页里的选项栏主入口
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native';
import TopTabALL from './top-tab-all';
import TopTabNotice from './top-tab-notice';
import TopTabNews from './top-tab-news';
import TopTabPhoto from './top-tab-photo';

const screenWidth = Dimensions.get('window').width;

const tabs = [
    {id:1,name:'ALL',view:TopTabALL},
    {id:2,name:'NOTICE',view:TopTabNotice},
    {id:3,name:'NEWS',view:TopTabNews},
    {id:4,name:'PHOTO',view:TopTabPhoto},
];

const styles = StyleSheet.create({
    container:{
        flex:1,
        top:12,
    },
    containerTop:{
        flex:1,
    },
    containerBottom:{
        flex:14,
    },
    tabItem:{
        width:100,
    },
    tabItemText:{
        textAlign:'center',
        color:'#8F9FB3'
    },
    tabItemTextSelected:{
        textAlign:'center',
        color:'#42436A'
    },
    underLine:{
        width:15,
        borderBottomWidth:2,
        alignSelf:'center',
        borderColor:'#42436A'
    },
});


export default class TopTabView extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectTabIndex:0,
        }
    }

    // 切换tab
    _clickTab(index){
        // 更新当前选择的tab
        this.setState({
            selectTabIndex:index
        });
        this.refs.scrollTabView.scrollToOffset({
            offset:index*screenWidth,
            // 动画
            animated: true,
        });
    }


    _scrollEnd(e){
        console.warn(e.nativeEvent.contentOffset.x)
    }




    render(){

        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <FlatList
                        data={tabs}
                        // 水平排列
                        horizontal={true}
                        // 滚动条
                        showsHorizontalScrollIndicator = {false} 
                        // 增加state，引起刷新
                        selectTabIndex = {this.state.selectTabIndex}
                        // 设置自定义key，消除警告
                        keyExtractor = {(item)=>item.name}
                        ref = 'scrollTab'
                        renderItem = {({item,index})=> {
        
                            let selectTabUnderLine = '';        
                            let selectTabText = styles.tabItemText;

                            // 当前选中的tab
                            if(this.state.selectTabIndex == index){
                                // tab 选中下划线
                                selectTabUnderLine = styles.underLine;
                                // tab 选中字体颜色
                                selectTabText = styles.tabItemTextSelected;
                            }

                            return (
                                <View style={styles.tabItem}>
                                    <TouchableOpacity key={item.id} onPress={()=>this._clickTab(index)}>
                                        <Text style={selectTabText}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <View style={selectTabUnderLine}></View>
                                </View>
                            );
                        } }
                    />
                </View>
                <View style={styles.containerBottom}>

                    <FlatList
                        data={tabs}
                        // 水平排列
                        horizontal={true}
                        // 滚动条
                        showsHorizontalScrollIndicator = {false} 
                        // 增加state，引起刷新
                        selectTabIndex = {this.state.selectTabIndex}
                        ref = 'scrollTabView'
                        // 滚动结束时
                        onMomentumScrollEnd = {(e)=>this._scrollEnd(e)}
                        // 设置自定义key，消除警告
                        keyExtractor = {(item)=>item.name}
                        renderItem = {({item,index})=> {
                            const TabView = item.view;
                            return (
                                <View style={{width:screenWidth}}>
                                    <TabView />
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

