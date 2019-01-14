/**
 * 更多页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,FlatList} from 'react-native';
import TopNavBar from '../component/top-nav-bar';
import ListItem from '../component/list-item';
import {host} from '../util/constant';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerTop:{
        flex:1,
    },
    containerBottom:{
        flex:12,
    },
    topNavBarCenterText:{
        textAlign:'center',
        fontSize:18
    },
    user:{
        flex:1,
    },
    userTop:{
        flex:1,
    },
    userCenter:{
        flex:5,
        backgroundColor:'#FFF',
        flexDirection:'row'
    },
    userAvatar:{
        flex:1,
        justifyContent:'center'
    },
    userImage:{
        alignSelf:'center',
        width:80,
        height:80,
        borderRadius:80,
    },
    userName:{
        flex:2,
        
    },
    userNameTop:{
        flex:1,
    },
    userNameCenter:{
        flex:3,
        justifyContent:'center'
    },
    userNameText:{
        color:'#78AEF9'
    },
    userEmailText:{
        marginTop:5,
        color:'#8F9FB3'
    },
    userNameBottom:{
        flex:1,
    },  
    userBottom:{
        flex:1,
    },
    business:{
        flex:1,
    },
    systemItems:{
        flex:1,
    },
    systemItemsTop:{
        flex:1,
    },
    systemItemsCenter:{
        flex:5,
    },
    systemItemsBottom:{
        flex:1,
    }
});

const businessItemData = [
    {name:'Absentee note',routeName:'CreateAbsenteeNote'},
    {name:'Billing record',routeName:'BillingRecord'},
    {name:'Calendar',routeName:'Calendar'},
    {name:'Attendance',routeName:'Attendance'},
];

const systemItemData = [
    {name:'Settings',routeName:'settings'}
];


export default class My extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName:'',
            email:''
        }
    }

    // 获取当前帐号信息
    _getAccountInfo(){
        fetch(host+"/auth/me", {
            method: "GET",
            headers: {
                'X-App-Id':global.appId,
                'X-Session-Token':global.token
            },
            }).then(response => {
                const responseJson = JSON.parse(response._bodyText);
                const responseStatus = response.status;
    
                if(responseStatus == 200){
                    this.setState({
                        userName:responseJson.firstName+' '+responseJson.lastName,
                        email:responseJson.email
                    })
                }else{
                    alert(responseJson.message);
                    // session token 过期
                    if(responseJson.appCode == 'ERR_INVALID_SESSION_TOKEN'){
                        // 跳转至登录页
                        this.props.navigation.navigate(routeName);
                    }
                }
                
            }).catch(error => {
                alert(error);
            });
    }

    componentWillMount(){
       this._getAccountInfo();
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>More</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.user}>
                        <View style={styles.userTop}></View>
                        <View style={styles.userCenter}>
                            <View style={styles.userAvatar}>
                                <Image style={styles.userImage} source={require('../image/avatar-default.jpg')} />
                            </View>
                            <View style={styles.userName}>
                                <View style={styles.userNameTop}></View>
                                <View style={styles.userNameCenter}>
                                    <Text style={styles.userNameText}>{this.state.userName}</Text>
                                    <Text style={styles.userEmailText}>{this.state.email}</Text>
                                </View>
                                <View style={styles.userNameBottom}></View>
                            </View>
                        </View>
                        <View style={styles.userBottom}></View>
                    </View>
                    <View style={styles.businessItems}>
                        <ListItem
                            navigation = {this.props.navigation} 
                            items={businessItemData}
                        />
                    </View>
                    <View style={styles.systemItems}>
                        <View style={styles.systemItemsTop}></View>
                        <View style={styles.systemItemsCenter}>
                            <ListItem 
                                navigation = {this.props.navigation} 
                                items={systemItemData}
                            />
                        </View>
                        <View style={styles.systemItemsBottom}></View>
                    </View>
                </View>
            </View>
        );
    }
}

