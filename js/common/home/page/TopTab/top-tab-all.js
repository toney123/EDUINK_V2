/**
 * 主页里的选项栏all
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList} from 'react-native';
import PictureWall from '../../../global/page/picture-wall';

const pictureData = [
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
];

const contents = [
    {
        id:1,
        type:'News',
        title:'Help and inspire fellow designers by...',
        icon:require('../../../../../res/icon/list-news.png'),
        pictures:pictureData
    },
    {   
        id:2,
        type:'Notice',
        title:'Help and inspire fellow designers by...',
        icon:require('../../../../../res/icon/list-notice.png'),
        pictures:pictureData
    },
    {
        id:3,
        type:'News',
        title:'Help and inspire fellow designers by...',
        icon:require('../../../../../res/icon/list-news.png'),
        pictures:pictureData
    },
];

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row'
    },
    containerLeft:{
        flex:1,
    },
    containerCenter:{
        flex:19,
    },
    containerRight:{
        flex:1,
    },
    previewContent:{
        top:10,
        borderWidth:1,
        height:280,
        borderRadius:5,
        backgroundColor:'#FFF',
        borderColor:'#FFF',
        flexDirection:'row',
        marginBottom:25,
        // ...Platform.select({
        //     android:{
        //         elevation:1,
        //     }
        // }),
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
        flex:2,
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
        width:20,
        height:20,
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
        flex:2,
    },
    contentTextTitle:{
        top:8,
    },
    contentImage:{
        flex:7,
    },
    // contentImagePreview:{
    //     width:'100%',
    //     height:'100%',
    //     borderRadius:3,
    // },
    contentTime:{
        flex:2,
    },
    contentTimeText:{
        top:15,
        fontSize:10,
        color:'#CCCCCC'
    }
});



export default class TopTabALL extends Component{

    constructor(props){
        super(props);
        this.state = {
            previewPictureStatus:false,
        }
        this.updatePictureState = this.updatePictureState.bind(this);
    }

    _onScroll(e){
        let y = e.nativeEvent.contentOffset.y;
        if(y == 0){
            this.props.updateParentTopTabItemColor(false);
        }else{
            this.props.updateParentTopTabItemColor(true,y/10);
        }
    }

    _showPictures(url){
        console.warn(url);
    }

    // 供子组件使用
    updatePictureState(bool){
        this.setState({
            previewPictureStatus:bool
        });
    }


    render(){
        return (
            <FlatList 
                data={contents}
                // 设置自定义key，消除警告
                keyExtractor={(item)=>item.title}
                onScroll={(e)=>this._onScroll(e)}
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
                                                    <Image style={styles.contentTypeLeftIcon} source={item.icon} />
                                                    <Text style={styles.contentTypeLeftText}>{item.type}</Text>
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
                                            <PictureWall
                                                getParentPictureData = {pictureData}
                                                updateParentPictureState = {this.updatePictureState}
                                                getParentPictureState = {this.state.previewPictureStatus}
                                            />
                                            
                                            
                                           
                                            {/* <TouchableOpacity style={{flex:1}}>
                                                <Image 
                                                    style={styles.contentImagePreview} 
                                                    source={{uri: "https://facebook.github.io/react-native/img/favicon.png"}} 
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{flex:1}}>
                                                <Image 
                                                    style={styles.contentImagePreview} 
                                                    source={{uri: "https://facebook.github.io/react-native/img/favicon.png"}} 
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{flex:1}}>
                                                <Image 
                                                    style={styles.contentImagePreview} 
                                                    source={{uri: "https://facebook.github.io/react-native/img/favicon.png"}} 
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{flex:1}}>
                                                <Image 
                                                    style={styles.contentImagePreview} 
                                                    source={{uri: "https://facebook.github.io/react-native/img/favicon.png"}} 
                                                />
                                            </TouchableOpacity> */}
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

