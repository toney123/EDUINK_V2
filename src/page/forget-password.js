/**
 * 重置密码
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import Button from '../component/button';
import PressText from '../component/press-text';
import {host} from '../util/constant';

const styles = StyleSheet.create({
    container:{
        flex:1,
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
            email:''
        }
    }

    // 发送重置密码的邮件
   async  _sendResetPasswordEmail(){
        if(this.state.xAppId == ''){
            alert('School ID can not be empty');
            return false;
        }
        if(this.state.email == ''){
            alert('Email can not be empty');
            return false;
        }


        try {
            const response = await fetch(host+"/auth/request-password-reset", {
                method: "POST",
                headers: {
                    'X-App-Id':this.state.xAppId
                },
                body: JSON.stringify({
                        email:this.state.email,
                    })
                });

            if(response.status == 204){
                alert('Sending mailbox successfully');
                // 跳转至登录页
                this.props.navigation.navigate('Login');
            }else{
                if(response._bodyText != ''){
                    alert(JSON.parse(response._bodyText).message);
                }
                
            }

        } catch (error) {
            alert(error);
        }
        
    }

    _switchLoginPage(){
        // 跳转至登录页
        this.props.navigation.navigate('Login');
    }


    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
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
                                    onPress={()=>this._sendResetPasswordEmail()}
                                /> 
                                <PressText
                                    name='BACK TO LOGIN'
                                    onPress={()=>this._switchLoginPage()}
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