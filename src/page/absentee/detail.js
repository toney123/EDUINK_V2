/**
 * 请假详情页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import {host} from '../../util/constant';
import TopNavBar from '../../component/top-nav-bar';
import Leave from './common/leave';
import Button from '../../component/button';

const iconUri = '../../image/icon/';
const imageUri = '../../image/';

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
    leaveBorder:{
        marginTop:20,
        marginLeft:15,
        marginRight:15,
    },
    approvalProcess:{
        marginTop:30,
        height:100,
        backgroundColor:'#FFF'
    },
    approvalProcessTitle:{
        flex:1,
        justifyContent:'center'
    },
    approvalProcessTitleText:{
        color:'#42436A',
        marginLeft:15,
    },
    approvalProcessContent:{
        flex:2,
        justifyContent:'center',
    },
    processItem:{
        height:30,
        marginLeft:15,
        marginRight:15,
        flexDirection:'row',
    },
    processItemLeft:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    processItemCenter:{
        flex:6,
        flexDirection:'row',
        alignItems:'center',
    },
    processItemImage:{
        width:20,
        height:20,
        marginLeft:10,
    },
    processItemChildName:{
        flexWrap:'wrap',
        flex:4,
        marginLeft:10
    },
    processItemText:{
        
    },
    processItemTimeText:{
        color:'#8F9FB3'
    },
    processItemRight:{
        flex:2,
        justifyContent:'center'
    },
    withdraw:{
        flex:1,
        marginTop:10,
        alignItems:'center'
    }
});


export default class Detail extends Component{

    constructor(){
        super();
        this.state = {
            
        }
    }

    // 发送撤回申请
    async _sendDeleteExcuse(){

        const childrenId = this.props.navigation.getParam('childrenId');
        const absenteeId = this.props.navigation.getParam('absenteeId');

        try {
            const response = await fetch(host+'/grd/children/'+childrenId+'/absentee-notes/'+absenteeId, {
                method: "DELETE",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            // 删除成功
            if(response.status == 204){
                this.props.navigation.popToTop();
            }else{

            }
            
        } catch (error) {
            alert(error);
        }
    }


    componentWillMount(){
        
    }



    render(){

        let process;
        if(this.props.navigation.getParam('isPass')){

        }else{
            process = (
                <View style={styles.processItem}>
                    <View style={styles.processItemLeft}>
                        <Image style={{width:15,height:15}} source={require(iconUri+'process.png')} />
                    </View>
                    <View style={styles.processItemCenter}>
                        <Image style={styles.processItemImage} source={require(imageUri+'avatar-default.jpg')} />
                        <View style={styles.processItemChildName}>
                            <Text style={styles.processItemText}>{this.props.navigation.getParam('childrenName')+"'s leave awaits review"}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.processItemRight}>
                        <Text style={styles.processItemTimeText}>{this.props.navigation.getParam('startDate')}</Text>
                    </View>
                </View>
            );
        }


        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TopNavBar 
                        leftSection={
                            <TouchableOpacity style={styles.topNavBarLeftIcon} onPress={()=>this.props.navigation.popToTop()}>
                                <Image style={{width:40,height:40}} source={require(iconUri+'back.png')} />
                            </TouchableOpacity>
                        }
                        centerSection={
                            <Text style={styles.topNavBarCenterText}>Detail</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                     <View style={styles.leaveBorder}>
                        <Leave
                            childrenName={this.props.navigation.getParam('childrenName')}
                            startDate={this.props.navigation.getParam('startDate')}
                            endDate={this.props.navigation.getParam('endDate')}
                            reason={this.props.navigation.getParam('reason')}
                        />   
                     </View>

                     <View style={styles.approvalProcess}>
                        <View style={styles.approvalProcessTitle}>
                            <Text style={styles.approvalProcessTitleText}>Approval Process</Text>
                        </View>
                        <View style={styles.approvalProcessContent}>
                            {process}
                        </View>
                     </View>


                     <View style={styles.withdraw}>
                        <Button
                            name='Withdraw'
                            buttonStyle={{width:'60%',borderRadius:30}}
                            onPress={()=>this._sendDeleteExcuse()}
                        /> 
                     </View>  
                </View>
            </View>
        );
    }
}