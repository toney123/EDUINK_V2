/**
 * 类似于朋友圈的图片墙
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    picture:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    contentImagePreview:{
        width:'100%',
        height:'100%',
        borderRadius:3,
        margin:1,
    },
});

export default class PictureWall extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
       
    }



    render(){
        // 父组件的图片数据
        const pictureData = this.props.getParentPictureData;
        
        // let pictureWalls=[];
        // for(i in pictureData){
        //     let url = pictureData[i].url;
        //     // 每一行3张图，若整除3，则换行
        //     if(Number.isInteger((parseInt(i) + 1) / 3)){
        //         pictureWallView += (
        //             <View style={{flex:1,flexDirection:'row'}}>pictureWallView</View>
        //         );
        //     }else{
        //         pictureWalls.push(<TouchableOpacity style={{flex:1,backgroundColor:'green'}}>
        //         <Image 
        //             style={styles.contentImagePreview} 
        //             source={{uri: url}} 
        //         />
        //     </TouchableOpacity>)
        //     }
        // }
        
        // const PictureWallView = '';
 


        // 父组件的图片显示状态
        const pictureState = this.props.getParentPictureState;
        // 父组件的修改图片状态的方法
        const updatePictureState = this.props.updateParentPictureState;

        return(
            <View style={styles.container}>
                 {/* 置顶图层 */}
                 <Modal 
                    // 可见性
                    visible={pictureState}
                    // 后退键事件
                    onRequestClose={()=>updatePictureState(false)}
                    // 动画类型
                    animationType='slide'
                    >
                    {/* 图片预览 */}
                    <ImageViewer 
                        imageUrls={pictureData}
                        onClick={()=>updatePictureState(false)}
                    />
                </Modal>
                <View style={styles.picture}>
                    {/* {pictureWalls.map((currentValue,index,arr)=>currentValue)} */}
                        <TouchableOpacity style={{alignContent:'center',width:130,height:40}}>
                            <Image 
                                style={styles.contentImagePreview} 
                                source={{uri: 'https://facebook.github.io/react-native/img/favicon.png'}} 
                            />
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}