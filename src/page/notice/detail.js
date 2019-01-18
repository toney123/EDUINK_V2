/**
 * notice详情页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList,ScrollView} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import {host} from '../../util/constant';
import Button from '../../component/button';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1
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
    contentTitle:{
        marginTop:10,
        marginBottom:10,
        justifyContent:'center'
    },
    contentPublishTime:{
        marginTop:10,
        marginBottom:10,
        justifyContent:'center',
    },
    contentMain:{
        marginTop:10,
        marginBottom:10,
        flex:11,
    },
    contentMargin:{
        flex:1,
        flexDirection:'row'
    },
    contentMarginLeft:{
        flex:1
    },
    contentMarginCenter:{
        flex:18,
    },
    contentMarginRight:{
        flex:1
    },
    contentTitleText:{
        color:'#2E3C4D',
        fontWeight:'bold'
    },
    contentPublishTimeText:{
        color:'#9B9B9B',
        fontSize:10
    },
    confirmButton:{
        backgroundColor:'#1F000000',
        borderTopWidth:0.5,
        borderColor:'#D3D7E0FF',
        height:60,
        alignItems:'center',
    }
});

export default class Detail extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={()=>this.props.navigation.popToTop()}>
                                <Image style={{width:40,height:40}} source={require(iconUri+'back.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Details</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                   <ScrollView>
                        <View style={styles.contentMargin}>
                            <View style={styles.contentMarginLeft}></View>
                            <View style={styles.contentMarginCenter}>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.contentTitleText}>Title Title Title Title Title Title</Text>
                                </View>
                                <View style={styles.contentPublishTime}>
                                    <Text style={styles.contentPublishTimeText}>2019-01-30</Text>
                                </View>
                                <View style={styles.contentMain}>
                                    <Text>
                                    Be amazed by Disney magic in 2019 as Hong Kong Disneyland Resort brings you more magical experiences than ever. Amazing events will surprise your senses all-year-round, including all-new immersive attractions, exciting festival celebrations, memorable hotel accommodations and dining services, as well as all-new merchandise items. Enjoy a magical Disney holiday and be immersed in the “Play, Shop, Dine Stay” experience with celebrations throughout the year
                                    Be amazed by Disney magic in 2019 as Hong Kong Disneyland Resort brings you more magical experiences than ever. Amazing events will surprise your senses all-year-round, including all-new immersive attractions, exciting festival celebrations, memorable hotel accommodations and dining services, as well as all-new merchandise items. Enjoy a magical Disney holiday and be immersed in the “Play, Shop, Dine Stay” experience with celebrations throughout the year
                                    Be amazed by Disney magic in 2019 as Hong Kong Disneyland Resort brings you more magical experiences than ever. Amazing events will surprise your senses all-year-round, including all-new immersive attractions, exciting festival celebrations, memorable hotel accommodations and dining services, as well as all-new merchandise items. Enjoy a magical Disney holiday and be immersed in the “Play, Shop, Dine Stay” experience with celebrations throughout the year
                                    Be amazed by Disney magic in 2019 as Hong Kong Disneyland Resort brings you more magical experiences than ever. Amazing events will surprise your senses all-year-round, including all-new immersive attractions, exciting festival celebrations, memorable hotel accommodations and dining services, as well as all-new merchandise items. Enjoy a magical Disney holiday and be immersed in the “Play, Shop, Dine Stay” experience with celebrations throughout the year
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.contentMarginRight}></View>
                        </View>
                   </ScrollView>
                   <View style={styles.confirmButton}>
                        <Button
                            name='CONFIRM'
                            buttonStyle={{width:'60%',borderRadius:20}}
                            onPress={()=>{}}
                        />
                    </View>
                </View>
            </View>
        );
    }
}