/**
 * 全局顶部导航
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList} from 'react-native';
import SideMenu from 'react-native-side-menu';
import LeftDrawer from './left-drawer';
import TopNavBar from '../../component/top-nav-bar';
import {host} from '../../util/constant';
import News from '../news/index';
import Notice from '../notice/index';
import Calendars from '../calendar/index';
import Absentee from '../absentee/index';
import My from '../my';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    TopNavBar:{
        flex:1,
    },
    labelBar:{
        flex:12,
        backgroundColor:'#F6F9FF'
    },
    topNavBarCenterText:{
        textAlign:'center',
        fontSize:18
    },
    topNavBarLeftIcon:{
        left:5,
        bottom:10,
    }, 
});


export default class TopNav extends Component{

    constructor(props){
        super(props);
        this.state = {
            sideMenuStatus:false,
            currentChildId:0,
            currentChildName:'All Children',
            children:[]
        }
        this._updateLeftBarStatus = this._updateLeftBarStatus.bind(this);
        this.updateState = this.updateState.bind(this);
       
    }

    // 更新侧栏
    _updateLeftBarStatus(){
        this.setState({
            sideMenuStatus:!this.state.sideMenuStatus,
        });
    }
    // 提供给子组件来更新父组件的state
    updateState(id,name){
        // 更新全局
        global.childrenId = id;

        this.setState({
            sideMenuStatus:!this.state.sideMenuStatus,
            currentChildId:id,
            currentChildName:name
        });
    }

    // 修正侧栏开关状态(若SideMenu关闭时与state不一致，则修正)
    _reviseSideMenuStatus(isOpen){
        if(isOpen != this.state.sideMenuStatus){
            this.setState({
                sideMenuStatus:isOpen
            });
        }
    }

    // 获取家长的所有孩子
    async _getChildren(){
        try {
            const response = await fetch(host+'/grd/children?populate=_class', {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            const responseJson = JSON.parse(response._bodyText);

            if(response.status == 200){

                global.children = responseJson;

                this.setState({
                    children:responseJson
                });

            }else{
                alert(responseJson.message);
            }
            
        } catch (error) {
            alert(error);
        }


    }


    componentWillMount(){
        this._getChildren();
    }
    

    componentWillUpdate(){
       
    }


    render(){

        let content;

        switch (this.props.contentType) {
            case 'News':
                content = (
                    <News
                        navigation = {this.props.navigation}
                    />
                );
                break;
            case 'Notices':
                content = (
                    <Notice
                        navigation = {this.props.navigation}
                    />
                );
                break;    
            case 'Calendars':
                content = (
                    <Calendars/>
                );
                break;  
            case 'Absence notes':
                content = (
                    <Absentee
                        navigation = {this.props.navigation}
                    />
                );
                break;  
            case 'My':
                content = (
                    <My
                        navigation = {this.props.navigation}
                    />
                );
        }


        return(
            <View style={styles.container}>
                {/* 侧栏 */}
                <SideMenu
                    // 侧栏主体内容
                    menu={<LeftDrawer 
                            updateState={this.updateState} 
                            children={this.state.children}
                        />}
                    openMenuOffset={Dimensions.get('window').width / 1.5}
                    isOpen={this.state.sideMenuStatus}
                    onChange={(isOpen)=>{this._reviseSideMenuStatus(isOpen)}}
                >    
                    {/* 导航栏(内含状态栏) */}
                    <TopNavBar
                        sytle={styles.TopNavBar} 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={this._updateLeftBarStatus}>
                                <Image style={{width:40,height:40}} source={require('../../image/icon/list.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>{this.props.contentType}</Text>
                        }
                    />
                    <View style={styles.labelBar}> 
                        {content}
                    </View>
                </SideMenu>  
            </View>
        );
    }
}



