import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList,ActivityIndicator,Modal} from 'react-native';
import PropTypes from 'prop-types';
import {host} from '../../util/constant';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    contentMargin:{
        flexDirection:'row'
    },
    contentMarginLeft:{
        flex:1,
    },
    contentMarginCenter:{
        flex:19,
    },
    contentMarginRight:{
        flex:1,
    },
    contentPadding:{
        top:10,
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#FFF',
        borderColor:'#FFF',
        flexDirection:'row',
        marginBottom:5,
    },
    contentPaddingLeft:{
        flex:1,
    },
    contentPaddingCenter:{
        flex:12,
    },
    contentPaddingRight:{
        flex:1,
    },
    contentText:{
        
    },
    contentTextTitle:{
        top:8,
    },
    contentImage:{
        
    },
    contentTime:{
        justifyContent:'center',
    },
    contentTimeText:{
        fontSize:10,
        color:'#CCCCCC'
    },
});

/**
 * 信息流
 * @param {String} type - 信息的类型
 */
export default class InfoFlow extends Component{

    // 属性验证
    static propTypes = {
        type:PropTypes.string.isRequired
    }

    constructor(){
        super();
        this.state = {
            refreshing:false,
            data:[],
            pageIndex:0
        }
    }


    async _getData(saveData = false){
        this.setState({
            refreshing:true
        });

        console.log(saveData,this.state.data);

        try {
            const response = await fetch(host+'/grd/children/'+global.childrenId+'/'+this.props.type+'?p='+this.state.pageIndex, {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            const responseJson = JSON.parse(response._bodyInit);

            if(response.status == 200){
                this.setState({
                    data:saveData ? this.state.data.concat(responseJson) : responseJson
                });
                
            }else{

            }
            
        } catch (error) {
            alert(error);
        }

        this.setState({
            refreshing:false
        });
    }


    _getMoreData(){
        this.setState({
            pageIndex:this.state.pageIndex + 1
        });
        this._getData(true);
    }

    _showContent(item){
        let routeName;

        if(this.props.type == 'news'){
            routeName = 'NewsDetail';
        }else if(this.props.type == 'notices'){
            routeName = 'NoticeDetail';
        }

        this.props.navigation.navigate(routeName,{
            data:item
        });
    }

    componentWillMount(){
        this._getData();
    }


    render(){

       

        return(
            <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#597EF7" animating={true} />
                </View>
            </Modal>
            
            <FlatList 
                data={this.state.data}
                onRefresh={()=>this._getData()}
                refreshing={this.state.refreshing}
                // 设置自定义key，消除警告
                keyExtractor={(item,index)=>index.toString()}
                onEndReachedThreshold={0.9}
                onEndReached={()=>this._getMoreData()}
                renderItem={({item})=>{

                    let typeData;
                    if(item.image != undefined){
                        typeData = {
                            height:250,
                            contentTextFlex:1,
                            contentImageFlex:2,
                            contentTimeFlex:1
                        };
                    }else{
                        typeData = {
                            height:100,
                            contentTextFlex:1,
                            contentImageFlex:0,
                            contentTimeFlex:1
                        };
                    }

                    return (
                        <View style={styles.container}>
                            <View style={styles.contentMargin}>
                                <View style={styles.contentMarginLeft}></View>
                                <View style={styles.contentMarginCenter}>
                                    <View style={[styles.contentPadding,{height:typeData.height}]}>
                                        <View style={styles.contentPaddingLeft}></View>
                                        <TouchableOpacity key={item._id} style={styles.contentPaddingCenter} onPress={()=>this._showContent(item)}>
                                            
                                            <View style={[styles.contentText,{flex:typeData.contentTextFlex}]}>
                                                <Text style={styles.contentTextTitle}>{item.title.en}</Text>
                                            </View>
                                            <View style={[styles.contentImage,{flex:typeData.contentImageFlex}]}>
                                                
                                            </View>
                                            <View style={[styles.contentTime,{flex:typeData.contentTimeFlex}]}>
                                                <Text style={styles.contentTimeText}>{item.approvedAt.split('T')[0]}</Text>
                                            </View>

                                        </TouchableOpacity>
                                        
                                        <View style={styles.contentPaddingRight}></View>
                                    </View>
                                </View>
                                <View style={styles.contentMarginRight}></View>
                            </View>
                        </View>
                        );
                    }}
            />
            </>
        );
    }
}
