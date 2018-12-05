/**
 * 重置密码
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import SelfButton from '../common/global/page/self-button';
import SelfLinkText from '../common/global/page/self-link-text';
import Net from '../common/global/function/net';

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
    containerCenter:{
        flex:2,
    },
    containerBottom:{
        flex:3,
        flexDirection:'row',
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
        backgroundColor:'#FFF',
        flexDirection:'row',
        borderRadius:5,
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
    sendLeft:{
        flex:1,
    },
    sendCenter:{
        flex:3,
    },
    sendRight:{
        flex:1,
    }
});

export default class ForgetPasswordPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            xAppId:'',
            email:''
        }
    }

    _send(){
        if(this.state.xAppId == ''){
            alert('School ID can not be empty');
            return false;
        }
        if(this.state.email == ''){
            alert('Email can not be empty');
            return false;
        }
        

        fetch("https://devapi.edu.ink/auth/request-password-reset", {
        method: "POST",
        headers: {
            'X-App-Id':this.state.xAppId
        },
        body: JSON.stringify({
                email:this.state.email,
            })
        })
        .then(response => {
            let responseStatus = response.status;

            let message;
            let routeName;
            switch(responseStatus){
                case 401:
                    message = Net.codeMessage(JSON.parse(response._bodyText).appCode);
                    break;
                case 409:
                    message = 'Unable to execute instruction';
                    break;
                case 204:
                    message = 'Sending mailbox successfully';
                    routeName = 'Login';
                    break;
            }

            if(message != undefined){
                alert(message);
            }
            
            if(routeName != undefined){
                this.props.navigation.navigate(routeName);
            }
            
        })
        .catch(error => {
          alert(error);
        });
    }

    _switchLoginPage(){
        this.props.navigation.navigate('Login');
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <View style={styles.titleLeft}></View>
                    <View style={styles.titleCenter}>
                        <Text style={styles.titleText}>Forgot Your Password?</Text>
                    </View>
                    <View style={styles.titleRight}></View>
                </View>
                <View style={styles.containerCenter}>
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
                            </View>
                            <View style={styles.formInputRight}></View>
                        </View>
                        <View style={styles.formright}></View>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.sendLeft}></View>
                    <View style={styles.sendCenter}>
                        <SelfButton
                            buttonName='SEND EMAIL'
                            onClickButton={()=>this._send()}
                        /> 
                        <SelfLinkText
                            textName='BACK TO LOGIN'
                            onClickText={()=>this._switchLoginPage()}
                        />
                    </View>
                    <View style={styles.sendRight}></View>
                </View>
            </View>
        );
    }
}