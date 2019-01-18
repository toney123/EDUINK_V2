/**
 * news主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList,ActivityIndicator,Modal,RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {host} from '../../util/constant';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerMain:{
        flex:1,
        flexDirection:'row'
    },
    containerMainLeft:{
        flex:1,
    },
    containerMainCenter:{
        flex:19
    },
    containerMainRight:{
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
    flatListfooter:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
        flexDirection:'row'
    }
});


let pageIndex = 0;
let pageTotalNum;

export default class Index extends Component{


    constructor(){
        super();
        this.state = {
            loading:false,
            news:[],
            showFooter:0
        }
    }


    async _getNews(isNextPage = false){
        
        try {
            const response = await fetch(host+'/grd/children/'+global.childrenId+'/news'+'?p='+pageIndex, {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            console.log(response);

            const responseJson = JSON.parse(response._bodyInit);

            if(response.status == 200){

                pageTotalNum = response.headers.map['x-total-count'];

                this.setState({
                    news:isNextPage ? this.state.news.concat(responseJson) : responseJson
                });
                
            }else{

            }
            
        } catch (error) {
            alert(error);
        }

        console.log(this.state.news);
    }


    async _onRefresh(){
        this.setState({
            loading:true
        });

        // 默认第一页
        pageIndex = 0;

        await this._getNews();

        this.setState({
            loading:false
        });
    }


    onEndReached = ()=>{
        // 存在总页数
        if(pageTotalNum != undefined){
            console.log(pageIndex,pageTotalNum);
            // 还有页数
            if(pageIndex <= pageTotalNum){
                ++pageIndex;

                this.setState({
                    showFooter:1
                });

                this._getNews(true);

            // 所有数据加载完毕    
            }else{
                this.setState({
                    showFooter:2
                });
            }
        }else{// 首次获取，默认第一页
            this._getNews();
        }
    }

    componentWillMount(){
        this._onRefresh();
    }


    render(){


        return(
            <FlatList 
            data={this.state.news}
            onRefresh={()=>this._onRefresh()}
            refreshing={this.state.loading}
            style={{height:1}}
            // 设置自定义key，消除警告
            keyExtractor={(item,index)=>index.toString()}
            ListEmptyComponent={()=>{
                return(
                    <View style={{flex:1,alignItems:'center',marginTop:10}}>
                        <Text style={{color:'#8F9FB3'}}>No data yet.</Text>
                    </View>
                );
            }}
            ListFooterComponent={()=>{
                // 初始空
                if(this.state.showFooter == 0){
                    return(
                        <View style={styles.flatListfooter}></View>
                    );
                // 数据正在加载    
                }else if(this.state.showFooter == 1){
                    return(
                        <View style={styles.flatListfooter}>
                            <ActivityIndicator size='small' color="#597EF7" animating={true} />
                            <Text>Loading...</Text>
                        </View>
                    );
                // 所有数据加载完毕    
                }else{
                    return(
                        <View style={styles.flatListfooter}>
                            <Text>—— Data has been loaded ——</Text>
                        </View>
                    );
                }

            }}
            onEndReachedThreshold={0.01}
            onEndReached={this.onEndReached}
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
                        <View style={styles.containerMain}>
                            <View style={styles.containerMainLeft}></View>
                            <View style={styles.containerMainCenter}>
                                <View style={[styles.contentPadding,{height:typeData.height}]}>
                                    <View style={styles.contentPaddingLeft}></View>
                                    
                                    <TouchableOpacity key={item._id} style={styles.contentPaddingCenter} onPress={()=>this.props.navigation.navigate('NewsDetail',{news:item})}>
                                        
                                        <View style={[styles.contentText,{flex:typeData.contentTextFlex}]}>
                                            <Text style={styles.contentTextTitle}>{item.title.en}</Text>
                                        </View>
                                        <View style={[styles.contentImage,{flex:typeData.contentImageFlex}]}>
                                            
                                        </View>
                                        <View style={[styles.contentTime,{flex:typeData.contentTimeFlex}]}>
                                            <Text style={styles.contentTimeText}>{item.approvedAt.split('T')[0]}</Text>
                                        </View>

                                    </TouchableOpacity>
                                    
                                    <View style={styles.contentMarginBottom}></View>
                                </View>                          
                            </View>
                            <View style={styles.containerMainRight}></View>
                        </View>
                    </View>
                    );
                }}
            />
        );
    }
}
