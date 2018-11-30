/**
 * 主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image} from 'react-native';
import SideMenu from 'react-native-side-menu';
import LeftDrawer from '../common/home/left-drawer';
import TopTabView from '../common/home/TopTab/top-tab-view';
import TopNavBar from '../common/global/top-nav-bar';

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

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            sideMenuStatus:false,
            currentChildId:0,
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
    updateState(id){
        this.setState({
            sideMenuStatus:!this.state.sideMenuStatus,
            currentChildId:id
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
    

    componentWillUpdate(){
       
    }


    render(){

        let id = this.state.currentChildId;
        let chilName = 'All Children';
        if(id == 1){
            chilName = 'Test Yu';
        }else if(id == 2){
            chilName = 'Test Li';
        }


        return(
            <View style={styles.container}>
                {/* 侧栏 */}
                <SideMenu
                    // 侧栏主体内容
                    menu={<LeftDrawer updateState={this.updateState} />}
                    openMenuOffset={Dimensions.get('window').width / 1.5}
                    isOpen={this.state.sideMenuStatus}
                    onChange={(isOpen)=>{this._reviseSideMenuStatus(isOpen)}}
                >    
                    {/* 导航栏(内含状态栏) */}
                    <TopNavBar
                        sytle={styles.TopNavBar} 
                        topNavBarLeft={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={this._updateLeftBarStatus}>
                                <Image style={{width:40,height:40}} source={require('../../res/icon/list.png')} />
                            </TouchableOpacity>
                        }
                        topNavBarCenter={
                            <Text style={styles.topNavBarCenterText}>{chilName}</Text>
                        }
                    />
                    <View style={styles.labelBar}> 
                        {/* 选项栏 */}
                        <TopTabView />    
                    </View>
                </SideMenu>  
            </View>
        );
    }
}



