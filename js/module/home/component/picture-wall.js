/**
 * 类似于朋友圈的图片墙
 * 
 * 需要传入以下属性：
 * 
 * updateParentPreviewContent(必须)
 * 类型:function
 * 
 * items(必须)
 * 类型：array
 * 格式：[{url:''}]
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,Modal,Dimensions} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

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

// 获取当前设备的实际宽度
const screenWidth = Dimensions.get('window').width;
// 用于获取父组件传来的图片数据
let pictureData;
// 用于存放已调整好的样式代码
let pictureWalls = [];
// 用于获得根据图片数量修改图片排列的样式
let pictureStyles;

export default class PictureWall extends Component{

    static propTypes = {
        items:PropTypes.arrayOf(PropTypes.object),
        updateParentPreviewContent:PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            pictureIndex:0,
            pictureStatus:false,
        }
        this._updatePictureStyle = this._updatePictureStyle.bind(this);
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

    // 修改图片显示的序号
    _updatePictureIndex(index){
        // 如果图片预览没打开，则开启
        if(this.state.pictureStatus == false){
            this.setState({
                pictureStatus:true,
            });
        }
        // 如果图片序号跟传入的序号不一致，则更新
        if(this.state.pictureIndex != index){
            this.setState({
                pictureIndex:index,
            });
        }
    }

    // 修改图片的显示状态
    _updatePictureState(bool){
        this.setState({
            pictureStatus:bool
        });
    }

    componentWillMount(){
        // 清空
        pictureWalls = [];
        // 父组件的图片数据
        pictureData = this.props.items;

        // 获得根据图片数量修改图片排列的样式
        pictureStyles = this._updatePictureStyle(pictureData);
        
        
        for(i in pictureData){
            // 存放已调整好的样式代码
            pictureWalls.push(
                <Image 
                    style={styles.contentImagePreview} 
                    source={{uri: pictureData[i].url}} 
                />
            )
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <View style={styles.container}>
                 {/* 置顶图层 */}
                 <Modal 
                    // 可见性
                    visible={this.state.pictureStatus}
                    // 后退键事件
                    onRequestClose={()=>this._updatePictureState(false)}
                    // 动画类型
                    animationType='slide'
                    >
                    {/* 图片预览 */}
                    <ImageViewer 
                        // 显示第几张图
                        index = {this.state.pictureIndex}
                        // 图片数据
                        imageUrls={pictureData}
                        // 设置点击图片之后，退出图片预览
                        onClick={()=>this._updatePictureState(false)}
                    />
                </Modal>
                <View style={styles.picture}>
                    {/* 遍历样式代码，并加入点击事件，如果某张图片被点击，则打开图片预览 */}
                    {pictureWalls.map((currentValue,index,arr)=>{
                        return(
                            <TouchableOpacity style={pictureStyles} key={index} onPress={()=>this._updatePictureIndex(index)}>
                                {currentValue}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }
}