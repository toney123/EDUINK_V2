/**
 * 类似于朋友圈的图片墙
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,Modal,Dimensions} from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

export default class PictureWall extends Component{

    constructor(props){
        super(props);
        this._updatePictureStyle = this._updatePictureStyle.bind(this);
    }

    componentWillMount(){
         
    }

    _updatePictureStyle(pictureData){
        let width = screenWidth / 4;
        let pictureLength = pictureData.length;
        let pictureStyles;

        // 只有一张图片时，最大化显示
        if(pictureLength <= 1){
            pictureStyles = {
                width:'100%',
                height:'100%',
            };
        // 一张以上时，分情况调整
        }else{ 
            // 设置统一的图片尺寸
            pictureStyles={
                width:width,
                height:width,
                borderWidth:2,
                borderColor:'#FFF'
            }
           
            let imageFlex;
            let contentHeight;
            // 第一行3张图，
            if(pictureLength <= 3){
                contentHeight = 210;
                imageFlex = 4;
            // 第二行3张图
            }else if(pictureLength <= 6){
                contentHeight = 350;
                imageFlex = 6;
            // 第三行3张图
            }else if(pictureLength <= 9){
                contentHeight = 440;
                imageFlex = 10;
            }
            // 第一参数：content 卡片最外边的高度，
            // 第二参数：content 中间图片部分的比例,
            // 通过修改父组件state，调整content的一些样式
            this.props.updateParentPreviewContent(contentHeight,imageFlex);
        }
        return pictureStyles;
    }



    render(){
       
        // 父组件的图片数据
        const pictureData = this.props.getParentPictureData;

        // 根据图片数量修改图片排列的样式
        let pictureStyles = this._updatePictureStyle(pictureData);

        let pictureWalls=[];
        
        for(i in pictureData){
                pictureWalls.push(
                <TouchableOpacity key={i} style={pictureStyles}>
                    <Image 
                        style={styles.contentImagePreview} 
                        source={{uri: pictureData[i].url}} 
                    />
                </TouchableOpacity>
            )
        }



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
                    {pictureWalls.map((currentValue,index,arr)=>currentValue)}
                </View>
            </View>
        );
    }
}