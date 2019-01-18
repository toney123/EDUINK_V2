/**
 * notice主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions,Image,FlatList} from 'react-native';
import {host} from '../../util/constant';

const styles = StyleSheet.create({
    contentMargin:{
        flex:1,
        flexDirection:'row'
    },
    contentMarginLeft:{
        flex:1
    },
    contentMarginCenter:{
        flex:18,
        marginTop:10,
    },
    contentMarginRight:{
        flex:1
    },
    contentPadding:{
        backgroundColor:'#FFF',
        borderRadius:5,
        height:80,
        flexDirection:'row',
    },
    contentPaddingLeft:{
        flex:1
    },
    contentPaddingCenter:{
        flex:14,
    },
    contentPaddingRight:{
        flex:1
    },
    contentTitle:{
        flex:1,
        justifyContent:'center'
    },
    contentPublishTime:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    contentPublishTimeText:{
        flex:3,
        color:'#8F9FB3',
        fontSize:10,
    },
    contentReadSign:{
        flex:1
    },
    contentTitleText:{
        color:'#42436A',
        fontWeight:'bold',
        fontSize:20
    },
    contentReadSign:{
        borderWidth:1,
        borderColor:'#389E0D',
        borderRadius:10,
        width:43,
        height:18,
        justifyContent:'center',
        alignItems:'center'
    },
    contentReadSignText:{
        color:'#389E0D',
        fontSize:10
    }
});

export default class Notice extends Component{

    constructor(){
        super();
        this.state = {
            notices:[],
            loading:false
        }
    }

    async _getNotices(){
        try {
            const response = await fetch(host+'/grd/children/'+global.childrenId+'/notices', {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            console.log(response);

            const responseJson = JSON.parse(response._bodyInit);

            if(response.status == 200){

        
                
            }else{

            }
            
        } catch (error) {
            alert(error);
        }

    }

    async _onRefresh(){
        this.setState({
            loading:true
        });

        await this._getNotices();

        this.setState({
            loading:false
        });
    }

    componentWillMount(){
        this._onRefresh();
    }



    render(){
        return(
            <FlatList
                data={this.state.notices}
                refreshing={this.state.loading}
                onRefresh={()=>this._onRefresh()}
                ListEmptyComponent={()=>{
                    return(
                        <View style={{flex:1,alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#8F9FB3'}}>No data yet.</Text>
                        </View>
                    );
                }}
                keyExtractor={(index)=>index.toString()}
                renderItem={({item,index}) =>{
                    return(
                        <View style={styles.contentMargin}>
                            <View style={styles.contentMarginLeft}></View>
                            <View style={styles.contentMarginCenter}>
                                <TouchableOpacity key={index} style={styles.contentPadding}>
                                    <View style={styles.contentPaddingLeft}></View>
                                    <View style={styles.contentPaddingCenter}>
                                        <View style={styles.contentTitle}>
                                            <Text style={styles.contentTitleText}>123</Text>
                                        </View>
                                        <View style={styles.contentPublishTime}>
                                            <Text style={styles.contentPublishTimeText}>2018-01-30</Text>
                                            <View style={styles.contentReadSign}>
                                                <Text style={styles.contentReadSignText}>Reply</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.contentPaddingRight}></View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentMarginRight}></View>
                        </View>
                    );
                }}
            />
        );
    }
}