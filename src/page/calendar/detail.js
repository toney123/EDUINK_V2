/**
 * 日历活动详情页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    },
    containerTop:{
        flex:1
    },
    containerBottom:{
        flex:12
    },
    topNavBarCenterText:{
        textAlign:'center',
        fontSize:18
    },
    topNavBarLeftIcon:{
        left:5,
        bottom:10,
    }, 
    activity:{
        backgroundColor:'#FFF',
        marginTop:15,
        height:260,
        flexDirection:'row'
    },
    activityLeft:{
        flex:1
    },
    activityCenter:{
        flex:14,
    },
    activityRight:{
        flex:1
    },
    contentTop:{
        flex:2,
    },
    contentCenter:{
        flex:1
    },
    contentBottom:{
        flex:3
    }
});


export default class Detail extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={()=>this.props.navigation.goBack()}>
                                <Image style={{width:40,height:40}} source={require(iconUri+'back.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Details</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.activity}>
                        <View style={styles.activityLeft}></View>
                        <View style={styles.activityCenter}>
                            <View style={styles.contentTop}>

                            </View>
                            <View style={styles.contentBottom}>
                            
                            </View>
                        </View>
                        <View style={styles.activityRight}></View>
                    </View>        
                </View>
            </View>
        );
    }
}