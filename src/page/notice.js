/**
 * 通告页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TopNavBar from '../component/top-nav-bar';
import InfoFlow from '../page/home/common/info-flow';
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
    }
});

const contents = [
    {
        id:1,
        type:'News',
        title:'Help and inspire fellow designers by...',
        icon:require('../image/icon/list-news.png'),
        pictures:[]
    },
    {   
        id:2,
        type:'Notice',
        title:'Help and inspire fellow designers by...',
        icon:require('../image/icon/list-notice.png'),
        pictures:[]
    },
    {
        id:3,
        type:'News',
        title:'Help and inspire fellow designers by...',
        icon:require('../image/icon/list-news.png'),
        pictures:[]
    },
];


export default class Notice extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Notice</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                     <InfoFlow
                        contents={contents}
                        type='notices'
                     />   
                </View>
            </View>
        );
    }
}

