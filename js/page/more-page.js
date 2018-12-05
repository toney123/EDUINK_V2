/**
 * 更多页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,FlatList} from 'react-native';
import TopNavBar from '../common/global/page/top-nav-bar';
import Net from '../common/global/function/net';
import FlatListItem from '../common/more/page/flatlist-item';

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
    },
    userImage:{
        marginTop:'15%',
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
    },
    userNameText:{
        marginTop:'5%',
        color:'#78AEF9'
    },
    userEmailText:{
        marginTop:'2%',
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
    {name:'Absentee note'},
    {name:'Billing record'},
    {name:'Calendar'},
    {name:'Attendance'},
];

const systemItemData = [
    {name:'Settings'}
];


export default class MorePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName:'',
            email:''
        }
        
    }

    componentWillMount(){
        fetch("https://devapi.edu.ink/auth/me", {
        method: "GET",
        headers: {
            'X-App-Id':global.appId,
            'X-Session-Token':global.token
        },
        }).then(response => {
            let responseJson = JSON.parse(response._bodyText);
            let responseStatus = response.status;

            let message;
            let routeName;
            switch(responseStatus){
                case 200:
                    this.setState({
                        userName:responseJson.firstName+' '+responseJson.lastName,
                        email:responseJson.email
                    })
                    break;
                case 401:
                    message = Net.codeMessage(responseJson.appCode);
                    routeName = 'Login';
                    break;
                case 403:
                    message = Net.codeMessage(responseJson.appCode);
                    break;
            }

            if(message != undefined){
                alert(message);
            }
            
            if(routeName != undefined){
                this.props.navigation.navigate(routeName);
            }   
            
        })
        .catch(error => {
          alert(error);
        });
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        topNavBarCenter={
                            <Text style={styles.topNavBarCenterText}>More</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.user}>
                        <View style={styles.userTop}></View>
                        <View style={styles.userCenter}>
                            <View style={styles.userAvatar}>
                                <Image style={styles.userImage} source={require('../../res/image/avatar-default.jpg')} />
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
                        <FlatListItem 
                            flatListItemData={businessItemData}
                        />
                    </View>
                    <View style={styles.systemItems}>
                        <View style={styles.systemItemsTop}></View>
                        <View style={styles.systemItemsCenter}>
                            <FlatListItem 
                                flatListItemData={systemItemData}
                            />
                        </View>
                        <View style={styles.systemItemsBottom}></View>
                    </View>
                </View>
            </View>
        );
    }
}

