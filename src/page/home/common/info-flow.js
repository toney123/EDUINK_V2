import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {host} from '../../../util/constant';

const iconUri = '../../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    main:{
        flexDirection:'row'
    },
    mainLeft:{
        flex:1,
    },
    mainCenter:{
        flex:19,
    },
    mainRight:{
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
    contentText:{
        flex:2,
    },
    contentTextTitle:{
        top:8,
    },
    contentImage:{
        flex:6,
    },
    contentTime:{
        flex:2,
    },
    contentTimeText:{
        top:15,
        fontSize:10,
        color:'#CCCCCC'
    },
});

/**
 * 信息流
 * @param {String} type - 信息的类型
 * @param {Array} contents - 数据
 */
export default class InfoFlow extends Component{

    // 属性验证
    static propTypes = {
        contents:PropTypes.array.isRequired,
        type:PropTypes.string.isRequired
    }

    constructor(){
        super();
        this.state = {
            refreshing:false
        }
    }


    async _getNotice(){
        this.setState({
            refreshing:true
        });

        let childrenId = global.childrenId;
        if(global.childrenId == 0){
            childrenId='all'
        }

        console.log('id:'+childrenId+',type:'+this.props.type);

        try {
            let response = await fetch(host+'/grd/children/'+childrenId+'/'+this.props.type, {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            console.log(response);

            let data = JSON.parse(response._bodyInit);
            

            if(response.status == 200){
                
            }else{

            }
            
        } catch (error) {
            alert(error);
        }

        this.setState({
            refreshing:false
        });
    }



    componentWillMount(){
        this._getNotice();
    }


    render(){

       

        return(
            <FlatList 
                data={this.props.contents}
                onRefresh={()=>this._getNotice()}
                refreshing={this.state.refreshing}
                // 设置自定义key，消除警告
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item})=>{

                    let typeIcon;
                    if(this.props.type == 'notices'){
                        typeIcon = (
                            <Image style={styles.contentTypeLeftIcon} source={require(iconUri+'list-notice.png')} />
                        );
                    }else if(this.props.type == 'news'){
                        typeIcon = (
                            <Image style={styles.contentTypeLeftIcon} source={require(iconUri+'list-news.png')} />
                        );
                    }

                    return (
                        <View style={styles.container}>
                            <View style={styles.main}>
                                <View style={styles.mainLeft}></View>
                                <View style={styles.mainCenter}>
                                    <View style={styles.previewContent}>
                                        <View style={styles.previewContentLeft}></View>
                                        <TouchableOpacity key={item.id} style={styles.previewContentCenter}>
                                            <View style={styles.contentType}>
                                                <View style={styles.contentTypeLeft}>
                                                    <View style={styles.contentTypeLeftMain}>
                                                        {typeIcon}
                                                        <Text style={styles.contentTypeLeftText}>{this.props.type}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.contentTypeRight}>
                                                    
                                                </View>
                                            </View>
                                            <View style={styles.contentText}>
                                                <Text style={styles.contentTextTitle}>{item.title}</Text>
                                            </View>
                                            <View style={styles.contentImage}>
                                                {/* 图片数据 */}
                                            </View>
                                            <View style={styles.contentTime}>
                                                <Text style={styles.contentTimeText}>11-27 17:00</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.previewContentRight}></View>
                                    </View>
                                </View>
                                <View style={styles.mainRight}></View>
                            </View>
                        </View>
                        );
                    }}
            />
        );
    }
}
