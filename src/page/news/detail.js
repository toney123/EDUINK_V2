import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,ScrollView} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import {host} from '../../util/constant';
import HTML from 'react-native-render-html';

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
        marginLeft:15,
        marginRight:15,
        marginBottom:10
    },
    contentPublishTime:{
        marginLeft:15,
        marginRight:15,
        marginBottom:10
    },
    contentDetail:{
        marginLeft:15,
        marginRight:15,
    },
    content:{
        flex:1
    },
    contentTitleText:{
        fontWeight:'bold'
    },
    contentPublishTimeText:{
        color:'#9B9B9B'
    }
});


export default class Detail extends Component{



    componentWillMount(){
        
    }



    render(){


        const news = this.props.navigation.getParam('news');


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
                    <ScrollView style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text style={styles.contentTitleText}>{news.title.en}</Text>
                        </View>
                        <View style={styles.contentPublishTime}>
                            <Text style={styles.contentPublishTimeText}>{news.approvedAt.split('T')[0]}</Text>
                        </View>
                        <View style={styles.contentDetail}>
                            <HTML
                                html={news.content.en}
                                imagesMaxWidth={Dimensions.get('window').width}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}