/**
 * 确认请假信息页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,TextInput} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import Button from '../../component/button';
import {host} from '../../util/constant';
import Leave from './common/leave';

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
    confirmButton:{
        width:'50%',
        alignSelf:'center',
        borderRadius:30,
        marginTop:30
    },
    leaveBorder:{
        marginTop:20,
        marginLeft:15,
        marginRight:15,
    },
});

export default class Confirm extends Component{

    constructor(){
        super();
        this.state = {
            childrenName:'',
            childrenGroupId:null
        }
    }

    // 显示请假信息
    _showExcuseInfo(){
        for (const child of global.children) {
            
            if(this.props.navigation.getParam('childrenId') == child._id){
                this.setState({
                    childrenName:child.firstName+' '+child.lastName,
                    childrenGroupId:child._class._id
                });
                break;
            }
        }
    }

    // 发送请假信息
    async _sendExcuse(){

        const childrenId = this.props.navigation.getParam('childrenId');

        try {
            const response = await fetch(host+'/grd/children/'+childrenId+'/absentee-notes?fetchWhenSave=true', {
                method: "POST",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
                body: JSON.stringify({
                    group: this.state.childrenGroupId,
                    absentFrom:this.props.navigation.getParam('startDate').toString(),
                    absentTo:this.props.navigation.getParam('endDate').toString(),
                    note:this.props.navigation.getParam('reasonText')
                })
            });  

            let data = JSON.parse(response._bodyInit);

            if(response.status == 200){
                this.props.navigation.navigate('AbsenteeNoteDetail',{
                    childrenId:childrenId,
                    absenteeId:data._id,
                    childrenName:this.state.childrenName,
                    startDate:this.props.navigation.getParam('startDate').toString(),
                    endDate:this.props.navigation.getParam('endDate').toString(),
                    reason:this.props.navigation.getParam('reasonText'),
                    isPass:false
                });
            }else{

            }
            
        } catch (error) {
            alert(error);
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
                            <Text style={styles.topNavBarCenterText}>Preview</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.leaveBorder}>
                        <Leave
                            childrenName={this.state.childrenName}
                            startDate={this.props.navigation.getParam('startDate').toString()}
                            endDate={this.props.navigation.getParam('endDate').toString()}
                            reason={this.props.navigation.getParam('reasonText')}
                        />
                    </View>    
                   
                    
                    <Button
                        name='Confirm'
                        buttonStyle={styles.confirmButton}
                        onPress={()=>this._sendExcuse()}
                    />       
                </View>
            </View>
        );
    };
}