/**
 * 更多页里的列表项
 * 
 * 需要传入以下属性：
 * 
 * items(必须)
 * 类型:array
 * 格式：[{name:''}]
 * 说明：列表选项数据
 * 
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,FlatList} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    item:{
        flex:1,
        flexDirection:'row',
        height:40,
        backgroundColor:'#FFF',
    },
    itemicon:{
        
    },
    itemNameText:{
        marginLeft:50,
        marginTop:10,
        color:'#42436A'
    },
    itemMarkerText:{
        marginTop:10,
        color:'#8F9FB3'
    },
    itemLeft:{
        flex:1,
    },
    // 有下划线
    itemCenter:{
        flex:12,
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#ECECEC',
    },
    // 无下划线
    itemCenterWithOutBorder:{
        flex:12,
        flexDirection:'row',
    },
    itemCenterLeft:{
        flex:24,
    },
    itemCenterRight:{
        flex:1,
    },
    itemRight:{
        flex:1,
    },
});


export default class ListItem extends Component{

    // 属性默认值
    static defaultProps = {

    }

    // 属性验证
    static propTypes = {
        items:PropTypes.arrayOf(PropTypes.object)
    }

    _clickItem(name){
        alert('open:'+name);
    }


    render(){
        const items = this.props.items;

        return(
            <FlatList
                data={items}
                // 设置自定义key，消除警告
                keyExtractor = {(item)=>item.name}
                renderItem={({item,index}) => {
                    let itemCenter = styles.itemCenter;
                    // 如果是最后一项，则不显示下划线
                    if(items.length == index+1){
                        itemCenter = styles.itemCenterWithOutBorder;
                    }
    
                    return(
                        <TouchableOpacity style={styles.item} onPress={()=>this._clickItem(item.name)}>
                            <View style={styles.itemLeft}></View>
                            <View style={itemCenter}>
                                <View style={styles.itemCenterLeft}>
                                    <Image style={styles.itemicon} />
                                    <Text style={styles.itemNameText}>{item.name}</Text>
                                </View>
                                <View style={styles.itemCenterRight}>
                                    <Text style={styles.itemMarkerText}>></Text>
                                </View> 
                            </View>   
                            <View style={styles.itemRight}></View>   
                        </TouchableOpacity>
                    );
                }}
            /> 
        );
    }
}