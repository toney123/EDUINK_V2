import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native';
import TopTabALL from './top-tab-all';
import TopTabNotice from './top-tab-notice';
import TopTabNews from './top-tab-news';
import TopTabPhoto from './top-tab-photo';

const tabs = [
    {id:1,name:'ALL',view:TopTabALL},
    {id:2,name:'NOTICE',view:TopTabNotice},
    {id:3,name:'NEWS',view:TopTabNews},
    {id:4,name:'PHOTO',view:TopTabPhoto},
];


export default class TopTabView extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectTabId:1,
        }
    }


    render(){

        // 切换tab view
        let TabContentView;
        for(i in tabs){
            if(tabs[i].id == this.state.selectTabId){
                TabContentView = tabs[i].view;
                break;
            }
        }

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
                        selectTabId = {this.state.selectTabId}
                        // 设置自定义key，消除警告
                        keyExtractor = {(item)=>item.name}
                        renderItem = {({item})=> {

                            let selectTabUnderLine = '';
                            let selectTabText = styles.tabItemText;
                            // 当前选中的tab
                            if(this.state.selectTabId == item.id){
                                selectTabUnderLine = styles.underLine;
                                selectTabText = styles.tabItemTextSelected;
                            }

                            return (
                                <View style={styles.tabItem}>
                                    <TouchableOpacity onPress={()=>{this.setState({selectTabId:item.id})}}>
                                        <Text style={selectTabText}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <View style={selectTabUnderLine}></View>
                                </View>
                            );
                        } }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <TabContentView />
                </View>
            </View>
        );
    }
}

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