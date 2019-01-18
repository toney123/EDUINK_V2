/**
 * 重置密码
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity,KeyboardAvoidingView,StatusBar} from 'react-native';
import Button from '../component/button';
import PressText from '../component/press-text';
import {host} from '../util/constant';
import Loading from '../component/loading';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF'
    },
    containerTop:{
        flex:1,
        flexDirection:'row',
    },
    titleLeft:{
        flex:1,
    },
    titleCenter:{
        flex:3,
    },
    titleText:{
        top:'50%',
        textAlign:'center',
        color:'#78AEF9',
        fontWeight:'bold',
        fontSize:20,
    },
    titleRight:{
        flex:1,
    },
    containerBottom:{
        flex:3,
    },
    form:{
        flex:1,
        flexDirection:'row',
    },
    formLeft:{
        flex:1,
    },
    formCenter:{
        flex:8,
        marginTop:'5%',
        flexDirection:'row',
    },
    formInputLeft:{
        flex:1,
    },
    formInputCenter:{
        marginTop:'5%',
        flex:14,
    },
    formInputRight:{
        flex:1,
    },
    formText:{
        color:'#8D959D',
    },
    formInput:{
        marginBottom:'5%'
    },
    formTextInput:{
        marginTop:10,
        backgroundColor:'#F4F6F9',
        borderRadius:5,
        height:36,
    },
    formright:{
        flex:1,
    },
});

export default class ForgetPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            xAppId:'',
            email:'',
            loading:false
        }
    }

    // 发送重置密码的邮件
   async _sendResetPassword(xAppId,email){
        
        let result = false;

        try {
            const response = await fetch(host+"/auth/request-password-reset", {
                method: "POST",
                headers: {
                    'X-App-Id':xAppId
                },
                body: JSON.stringify({
                        email:email,
                    })
            });

            const isResponse = response._bodyText != '' ? true : false;
   
            if(response.status == 204){
                alert('Sending mailbox successfully');
                result = true;
            }else{

                if(isResponse){
                    alert(JSON.parse(response._bodyText).message);
                }
                
            }

        } catch (error) {
            alert(error);
        }
        
        return result;
    }

    // 执行重置密码
   async _resetPassword(){
        this.setState({
            loading:true
        });

        const {xAppId,email} = this.state;

        if(xAppId == ''){
            this.setState({
                loading:false
            });
            alert('School ID can not be empty');
            return;
        }
        if(email == ''){
            this.setState({
                loading:false
            });
            alert('Email can not be empty');
            return;
        }

        if(await this._sendResetPassword(xAppId,email)){
            this.setState({
                loading:false
            });
            // 跳转至登录页
            this.props.navigation.navigate('Login');
        }else{
            this.setState({
                loading:false
            });
        }

   } 



    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                {/* 状态栏 */}
                <StatusBar
                    barStyle='dark-content' 
                    backgroundColor='#FFF'
                    animated={true}
                />
                <View style={styles.containerTop}>
                    <View style={styles.titleLeft}></View>
                    <View style={styles.titleCenter}>
                        <Text style={styles.titleText}>Forgot Your Password?</Text>
                    </View>
                    <View style={styles.titleRight}></View>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.form}>
                        <View style={styles.formLeft}></View>
                        <View style={styles.formCenter}>
                            <View style={styles.formInputLeft}></View>
                            <View style={styles.formInputCenter}>
                                <View style={styles.formInput}>
                                    <Text style={styles.formText}>SCHOOL</Text>
                                    <TextInput style={styles.formTextInput} onChangeText={(text)=>this.setState({xAppId:text})} value={this.state.xAppId} />
                                </View>
                                <View style={styles.formInput}>
                                    <Text style={styles.formText}>EMAIL</Text>
                                    <TextInput style={styles.formTextInput} onChangeText={(text)=>this.setState({email:text})} value={this.state.email} />
                                </View>
                                <Button
                                    name='SEND EMAIL'
                                    onPress={()=>this._resetPassword()}
                                /> 
                                <PressText
                                    name='BACK TO LOGIN'
                                    onPress={()=>this.props.navigation.navigate('Login')}
                                /> 
                                <Loading
                                    isLoad={this.state.loading}
                                />
                            </View>
                            <View style={styles.formInputRight}></View>
                        </View>
                        <View style={styles.formright}></View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}