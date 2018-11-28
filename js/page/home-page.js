/**
 * 主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        left:20,
    },  
});

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            sideMenuStatus:false,
            currentChildId:0,
            childName:''
        }

        this.showLeftBar = this.showLeftBar.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    showLeftBar(){
        this.setState({
            sideMenuStatus:!this.state.sideMenuStatus,
        });
    }

    updateState(id){
        this.setState({
            sideMenuStatus:!this.state.sideMenuStatus,
            currentChildId:id
        });
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
                    menu={<LeftDrawer updateState={this.updateState} />}
                    openMenuOffset={Dimensions.get('window').width / 1.5}
                    isOpen={this.state.sideMenuStatus}
                    menuPosition='left'
                >    
                    {/* 导航栏(内含状态栏) */}
                    <TopNavBar
                        sytle={styles.TopNavBar} 
                        topNavBarLeft={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={this.showLeftBar}>
                                <Icon name='bars' size={20} color='#4A98F7'></Icon>
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



