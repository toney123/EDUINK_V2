import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const contents = [
    {id:1,title:'12345645646'},
    {id:2,title:'12345645646'},
    {id:3,title:'12345645646'},
];

export default class TopTabALL extends Component{
    render(){
        return (
            <FlatList 
                data={contents}
                // 设置自定义key，消除警告
                keyExtractor={(item)=>item.title}
                renderItem={({item})=>{
                    return (
                        <View style={styles.container}>
                            <View style={styles.containerLeft}></View>
                            <View style={styles.containerCenter}>
                                <View style={styles.previewContent}>
                                    <View style={styles.previewContentLeft}></View>
                                    <TouchableOpacity style={styles.previewContentCenter}>
                                        <View style={styles.contentType}>
                                            <View style={styles.contentTypeLeft}>
                                                <View style={styles.contentTypeLeftMain}>
                                                    <Icon style={styles.contentTypeLeftIcon} name='envelope-open' />
                                                    <Text style={styles.contentTypeLeftText}>News</Text>
                                                </View>
                                            </View>
                                            <View style={styles.contentTypeRight}>
                                                <View style={styles.contentTypeRightName}>
                                                    <Text style={styles.contentTypeRightNameText}>TY</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.contentText}>
                                            <Text style={styles.contentTextTitle}>{item.title}</Text>
                                        </View>
                                        <View style={styles.contentImage}>
                                            <Image style={styles.contentImagePreview}>

                                            </Image>
                                        </View>
                                        <View style={styles.contentTime}>
                                            <Text style={styles.contentTimeText}>11-27 17:00</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.previewContentRight}></View>
                                </View>
                            </View>
                            <View style={styles.containerRight}></View>
                        </View>
                        );
                    }}
            />
                
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row'
    },
    containerLeft:{
        flex:1,
    },
    containerCenter:{
        flex:13,
    },
    containerRight:{
        flex:1,
    },
    previewContent:{
        top:10,
        borderWidth:1,
        height:200,
        borderRadius:5,
        backgroundColor:'#FFF',
        borderColor:'#FFF',
        flexDirection:'row',
        marginBottom:25,
    },
    previewContentLeft:{
        flex:1,
    },
    previewContentCenter:{
        flex:12,
    },
    previewContentRight:{
        flex:1,
    },
    contentType:{
        flex:1,
        flexDirection:'row'
    },
    contentTypeLeft:{
        flex:8,
        flexDirection:'row',
    },
    contentTypeLeftMain:{
        flex:1,
        flexDirection:'row',
        top:15,
    },
    contentTypeLeftIcon:{
        top:3,
    },
    contentTypeLeftText:{
        left:15,
        color:'#8D91A2'
    },
    contentTypeRight:{
        flex:1,
    },
    contentTypeRightName:{
        top:10,
        borderWidth:1,
        borderColor:'#597EF7',
        backgroundColor:'#597EF7',
        borderRadius:25,
        width:25,
        height:25,
    },
    contentTypeRightNameText:{
        color:'#FFF',
        textAlign:'center',
        top:4,
        fontSize:10,
    },
    contentText:{
        flex:1,
    },
    contentTextTitle:{
        top:10,
    },
    contentImage:{
        flex:4,
    },
    contentTime:{
        flex:1,
    },
    contentTimeText:{
        fontSize:10,
        color:'#CCCCCC'
    }
});
