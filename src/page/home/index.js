/**
 * 主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image} from 'react-native';
import SideMenu from 'react-native-side-menu';
import LeftDrawer from './left-drawer';
import TopTabView from '../home/TopTab/top-tab-view';
import TopNavBar from '../../component/top-nav-bar';
import {host} from '../../util/constant';

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

export default class Index extends Component{

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
    _getChildren(){
        fetch(host+"/grd/children?populate=_class", {
            method: "GET",
            headers: {
                'X-Session-Token':global.token,
                'X-App-Id':global.appId
            },
        }).then(response => {
            const data = JSON.parse(response._bodyText);
            const responseStatus = response.status;

            if(responseStatus == 200){

                global.children = data;

                this.setState({
                    children:data
                });

            }else{
                alert(data.message);
            }
        })
        .catch(error => {
          alert(error);
        });
    }


    componentWillMount(){
        this._getChildren();
    }
    

    componentWillUpdate(){
       
    }


    render(){


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
                            <Text style={styles.topNavBarCenterText}>{this.state.currentChildName}</Text>
                        }
                    />
                    <View style={styles.labelBar}> 
                        {/* 选项栏 */}
                        <TopTabView 
                            currentChildId = {this.state.currentChildId}
                        />    
                    </View>
                </SideMenu>  
            </View>
        );
    }
}



