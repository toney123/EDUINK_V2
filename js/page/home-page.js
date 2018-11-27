/**
 * 主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenu from 'react-native-side-menu';
import LeftDrawer from '../common/home/left-drawer';
import TopTabView from '../common/home/TopTab/top-tab-view';

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
                <SideMenu
                    menu={<LeftDrawer updateState={this.updateState} />}
                    openMenuOffset={Dimensions.get('window').width / 1.5}
                    isOpen={this.state.sideMenuStatus}
                    menuPosition='left'
                >    
                    <StatusBar
                        barStyle='dark-content' 
                        backgroundColor='#FFF'
                        animated={true}
                    />
                    <View style={styles.navigationBar}>
                        <View style={styles.navigationBarIn}>
                            <View style={styles.navigationLeft}>
                                <TouchableOpacity style={styles.navigationLeftBar} onPress={this.showLeftBar}>
                                    <Icon name='bars' size={20} color='#4A98F7'></Icon>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.navigationCenter}>
                                <Text style={styles.navigationCenterText}>{chilName}</Text>
                            </View>
                            <View style={styles.navigationRight}>
                            </View>
                        </View>
                    </View>
                    <View style={styles.labelBar}> 
                        <TopTabView />    
                    </View>
                
                </SideMenu> 
        
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    navigationBar:{
        flex:1,
        backgroundColor:"#FFF",
        
    },
    navigationBarIn:{
        flex:1,
        flexDirection:'row',
        top:10,
    },
    navigationLeft:{
        flex:1,
        top:3,
    },
    navigationLeftBar:{
        left:20,
    },  
    navigationCenter:{
        flex:2,
    },
    navigationCenterText:{
        textAlign:'center',
        fontSize:18
    },
    navigationRight:{
        flex:1,
    },
    labelBar:{
        flex:10,
        backgroundColor:'#F6F9FF'
    },
});

