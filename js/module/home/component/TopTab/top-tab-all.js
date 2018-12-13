/**
 * 主页里的选项栏all
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList} from 'react-native';
import PictureWall from '../../../global/component/picture-wall';

const pictureData = [
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
    {url:'https://facebook.github.io/react-native/img/favicon.png'},
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
    // previewContent:{
    //     top:10,
    //     borderWidth:1,
    //     height:280,
    //     borderRadius:5,
    //     backgroundColor:'#FFF',
    //     borderColor:'#FFF',
    //     flexDirection:'row',
    //     marginBottom:25,
    // },
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
    // contentImage:{
    //     flex:6,
    // },
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
            previewContentStyle:{
                top:10,
                borderWidth:1,
                height:280,
                borderRadius:5,
                backgroundColor:'#FFF',
                borderColor:'#FFF',
                flexDirection:'row',
                marginBottom:25,
            },
            contentImageStyle:{
                flex:6,
            }
        }
        this.updatePreviewContent = this.updatePreviewContent.bind(this);
    }

    // flatlist鼠标滚动事件
    _onScroll(e){
        // 获取纵向距离
        let y = e.nativeEvent.contentOffset.y;

        if(y == 0){
            // 恢复默认样式
            this.props.updateParentTopTabItemColor(false);
        }else{
            // 根据纵向滚动距离，调整透明度
            this.props.updateParentTopTabItemColor(true,y/10);
        }
    }

    // 供子组件修改父组件里的内容卡片
    updatePreviewContent(height,flex){
        this.setState({
            previewContentStyle:{
                top:10,
                borderWidth:1,
                height:height,
                borderRadius:5,
                backgroundColor:'#FFF',
                borderColor:'#FFF',
                flexDirection:'row',
                marginBottom:25,
            },
            contentImageStyle:{
                flex:flex,
            }
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
                                {/* 此处content卡片最外边的样式根据图片的数量而变化 */}
                                <View style={this.state.previewContentStyle}>
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
                                        {/* 此处content卡片图片部分的比例样式根据图片的数量而变化 */}
                                        <View style={this.state.contentImageStyle}>
                                            <PictureWall
                                                // 提供修改父组件样式的方法
                                                updateParentPreviewContent = {this.updatePreviewContent}
                                                // 提供图片数据
                                                getParentPictureData = {pictureData}
                                            />
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

