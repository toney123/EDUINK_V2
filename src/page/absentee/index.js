/**
 * 请假页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import ActionButton from 'react-native-action-button';
import {host} from '../../util/constant';

const iconUri = '../../image/icon/';
const imageUri = '../../image/';

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    scrollAbsentee:{
        flex:1
    },
    absenteeSpace:{
        marginTop:20
    },  
    absentee:{
        height:120,
        marginBottom:10,
        backgroundColor:'#FFF',
    },
    absenteeTop:{
        flex:3,
        justifyContent:'center'
    },
    absenteeTitle:{
        flexDirection:'row'
    },
    absenteeTitleLeft:{
        flex:5,
        flexDirection:'row',
        alignItems:'center',
    },
    absenteeTitleRight:{
        flex:1,
        justifyContent:'center'
    },
    absenteeBottom:{
        flex:2,
        marginBottom:10
    },
    absenteeBottomText:{
        marginLeft:20,
        color:'#8F9FB3'
    },
    verifyTag:{
        borderWidth:1,
        borderRadius:10,
        width:50,
        height:20,
        alignItems:'center',
        justifyContent:'center'
    },
    absenteeTitleLeftText:{
        marginLeft:20,
        marginRight:10,
        fontSize:20
    }
});


export default class Index extends Component{

    constructor(){
        super();
        this.state = {
            absentees:[],
            refreshing:false
        }
    }


    async _getAbsentee(){
        this.setState({
            refreshing:true
        });

        try {
            const response = await fetch(host+'/grd/children/all/absentee-notes?populate=user', {
                method: "GET",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            let data = JSON.parse(response._bodyInit);

            if(response.status == 200){
                this.setState({
                    absentees:data
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

    // async _getAbsentee(){

    // }

    
    componentWillMount(){
        this._getAbsentee();
    }

    componentWillUpdate(){
        
    }


    render(){

        let absentees=[];
        if(this.state.absentees.length){
            // 遍历所有的请假信息
            for (const absentee of this.state.absentees) {
                let sign;
                let isPass;
                // 待审核
                if(absentee.status == 'Requested'){
                    isPass = false;
                    sign = (
                        <View style={[styles.verifyTag,{backgroundColor:'#FFF',borderColor:'#4A90E2'}]}>
                            <Text style={[styles.verifyTagText,{color:'#4A90E2'}]}>Verify</Text>
                        </View>
                    );
                // 审核完成
                }else if(absentee.status == 'Processed'){
                    isPass = true;
                    sign = (
                        <View style={[styles.verifyTag,{backgroundColor:'#FFF',borderColor:'#389E0D'}]}>
                            <Text style={[styles.verifyTagText,{color:'#389E0D'}]}>Pass</Text>
                        </View>
                    );
                }

                // new Date(absentee.absentFrom).toTimeString();

                // console.log(absentee.absentFrom,new Date(absentee.absentFrom).toDateString());


                absentees.push(
                    <TouchableOpacity key={absentee._id} style={styles.absentee} onPress={()=>this.props.navigation.navigate('AbsenteeNoteDetail',{
                        childrenId:absentee.user._id,
                        absenteeId:absentee._id,
                        childrenName:absentee.user.firstName+' '+absentee.user.lastName,
                        startDate:absentee.absentFrom.split('T')[0],
                        endDate:absentee.absentTo.split('T')[0],
                        reason:absentee.note,
                        isPass:isPass
                        })}>
                        <View style={styles.absenteeTop}>
                            <View style={styles.absenteeTitle}>
                                <View style={styles.absenteeTitleLeft}>
                                    <Text style={styles.absenteeTitleLeftText}>{absentee.user.firstName+' '+absentee.user.lastName}</Text>
                                </View>
                                <View style={styles.absenteeTitleRight}>
                                    {sign}
                                </View>
                            </View>
                        </View>
                        <View style={styles.absenteeBottom}>
                            <Text style={styles.absenteeBottomText}>Start Date: {absentee.absentFrom.split('T')[0]}</Text>
                            <Text style={styles.absenteeBottomText}>End Date: {absentee.absentTo.split('T')[0]}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
        }



        return(
            <View style={styles.container}>
                <ScrollView 
                        style={styles.scrollAbsentee}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this._getAbsentee()}
                            />
                        }
                    >
                <View style={styles.absenteeSpace}>
                    {absentees.map((value,index)=>value)}
                </View>
                            
                </ScrollView>    

                <ActionButton 
                    buttonColor='#597EF7'
                    onPress={()=>this.props.navigation.navigate('CreateAbsenteeNote')} 
                />
            </View>
        );
    }
}