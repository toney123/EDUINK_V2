/**
 * 确认请假信息页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,TextInput} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import Button from '../../component/button';
import {host} from '../../util/constant';

const iconUri = '../../image/icon/';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F9FF'
    },
    containerTop:{
        flex:1
    },
    containerBottom:{
        flex:12
    },
    topNavBarCenterText:{
        textAlign:'center',
        fontSize:18
    },
    topNavBarLeftIcon:{
        left:5,
        bottom:10,
    }, 
    leave:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#FFF',
        height:280,
        borderRadius:8
    },
    leaveTop:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    excuseText:{
        fontSize:20,
        color:'#42436A'
    },
    leaveBottom:{
        flex:3
    },
    cutLine:{
        borderBottomWidth:1,
        borderColor:'#ededed',
        marginLeft:15,
        marginRight:15
    },
    leaveInfoMargin:{
        marginTop:30
    },
    leaveInfo:{
        marginLeft:30,
        flexDirection:'row',
        marginTop:5,
        marginBottom:5
    },
    leaveInfoSign:{
        color:'#8F9FB3'
    },
    leaveInfoContent:{
        color:'#42436A',
        marginLeft:10
    },
    confirmButton:{
        width:'50%',
        alignSelf:'center',
        borderRadius:30,
        marginTop:30
    }
});

// 孩子id和孩子的group id 对应关系组
let childrenGroupMap = new Map();
export default class Confirm extends Component{

    constructor(){
        super();
        this.state = {
            childrenNames:[],
        }
    }

    // 显示请假信息
    _showExcuseInfo(){
        let childrenNames = [];
        const childrenIds = this.props.navigation.getParam('childrenIds');
        
        for (const child of global.children) {
            // 找出选中的孩子
            if(childrenIds.indexOf(child._id) != -1){
                childrenGroupMap.set(child._id,child._class._id);
                childrenNames.push(child.firstName+' '+child.lastName);
            }
        }
        this.setState({
            childrenNames:childrenNames
        });
    }

    // 提交请假信息
    _submitExcuse(){
       const childrenIds = this.props.navigation.getParam('childrenIds');

       for(const childId of childrenIds){
           // 找到孩子id对应的group id
           if(childrenGroupMap.get(childId) != undefined){
                this._sendExcuse(childId,childrenGroupMap.get(childId));
           }
       }

    }


    // 发送请假信息
    async _sendExcuse(childId,groupId){

        try {
            let response = await fetch(host+'/grd/children/'+childId+'/absentee-notes', {
                method: "POST",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
                body: JSON.stringify({
                    user: childId,
                    group: groupId,
                    absentFrom:this.props.navigation.getParam('startDate').toString(),
                    absentTo:this.props.navigation.getParam('endDate').toString(),
                    note:this.props.navigation.getParam('reasonText')
                })
            });

            console.log(response);

            // let data = JSON.parse(response._bodyInit);

            // if(response.status == 200){
               
                
            // }
        } catch (error) {
            console.error(error);
        }
    }


    componentWillMount(){
        this._showExcuseInfo();
    }





    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={()=>this.props.navigation.goBack()}>
                                <Image style={{width:40,height:40}} source={require(iconUri+'back.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Preview Information</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.leave}>
                        <View style={styles.leaveTop}>
                            <Text style={styles.excuseText}>Excuse</Text>
                        </View>
                        <View style={styles.cutLine}></View>    
                        <View style={styles.leaveBottom}>
                            <View style={styles.leaveInfoMargin}>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveInfoSign}>Student:</Text>
                                    <Text style={styles.leaveInfoContent}>{this.state.childrenNames.toString()}</Text>
                                </View>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveInfoSign}>Start Date:</Text>
                                    <Text style={styles.leaveInfoContent}>{this.props.navigation.getParam('startDate').toString()}</Text>
                                </View>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveInfoSign}>End Date:</Text>
                                    <Text style={styles.leaveInfoContent}>{this.props.navigation.getParam('endDate').toString()}</Text>
                                </View>
                                <View style={styles.leaveInfo}>
                                    <Text style={styles.leaveInfoSign}>Reason:</Text>
                                    <Text style={styles.leaveInfoContent}>{this.props.navigation.getParam('reasonText')}</Text>
                                </View>
                            </View>
                        </View>

                    </View> 

                    
                    <Button
                        name='Confirm'
                        buttonStyle={styles.confirmButton}
                        onPress={()=>this._submitExcuse()}
                    />       
                </View>
            </View>
        );
    };
}