/**
 * 我的主页
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,FlatList} from 'react-native';
import {host} from '../../util/constant';
import Button from '../../component/button';
import Loading from '../../component/loading';

const iconUri = '../../image/icon/';
const imageUri = '../../image/';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    user:{
        marginTop:15,
        height:100,
        backgroundColor:'#FFF',
        flexDirection:'row'
    },
    userAvatar:{
        flex:1,
        justifyContent:'center'
    },
    userImage:{
        alignSelf:'center',
        width:70,
        height:70,
        borderRadius:70,
    },
    userName:{
        flex:2,
    },
    userNameTop:{
        flex:1,
    },
    userNameCenter:{
        flex:3,
        justifyContent:'center'
    },
    userNameText:{
        color:'#78AEF9'
    },
    userEmailText:{
        marginTop:5,
        color:'#8F9FB3'
    },
    userNameBottom:{
        flex:1,
    },  
    translate:{
        marginTop:15,
        height:80,
        backgroundColor:'#FFF',
        justifyContent:'center'
    },
    languageMargin:{
        marginLeft:20,
        flex:10,
    },
    selectIconMargin:{
        flex:1,
    },
    language:{
        flex:1,
        alignItems:'center',
        flexDirection:'row'
    },
    cutLine:{
        marginLeft:20,
        marginRight:20,
        borderWidth:0.3,
        borderColor:'#ECECECFF'
    },
    languageText:{
        color:'#42436AFF',
    },
    selectIcon:{
        width:15,
        height:15,
    },
    version:{
        marginTop:10,
        height:40,
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'center'
    },
    logout:{
        marginTop:50,
        height:20,
        alignItems:'center'
    },
    versionTitle:{
        marginLeft:20,
        flex:5,
        justifyContent:'center'
    },
    versionNumber:{
        flex:1,
        justifyContent:'center'
    },
    versionTitleText:{
        color:'#42436AFF'
    },
    versionNumberText:{
        color:'#9B9B9BFF'
    },
    logoutButton:{
        width:'80%',
        borderRadius:30,
        backgroundColor:'#85A5FFFF'
    }
});

export default class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName:'',
            email:'',
            loading:false
        }
    }

    // 获取当前帐号信息
    async _getAccountInfo(){

        try {
            const response = await fetch(host+"/auth/me", {
                method: "GET",
                headers: {
                    'X-App-Id':global.appId,
                    'X-Session-Token':global.token
                }
            });

            // 判断是否有返回数据
            const isResponse = response._bodyText !='' ? true : false;

            if(response.status == 200){

                if(isResponse){
                    const responseJson = JSON.parse(response._bodyText);

                    this.setState({
                        userName:responseJson.firstName+' '+responseJson.lastName,
                        email:responseJson.email
                    })
                }
            }else{

                if(isResponse){
                    const responseJson = JSON.parse(response._bodyText);

                    alert(responseJson.message);

                    // session token 过期
                    if(responseJson.appCode == 'ERR_INVALID_SESSION_TOKEN'){
                        // 跳转至登录页
                        this.props.navigation.navigate(routeName);
                    } 
                }
                
            }

        } catch (error) {
            alert(error);
        }
    }

    // 发送退出登录请求
    async _sendLogout(){

        let result = false;

        try {
            const response = await fetch(host+'/auth/session', {
                method: "DELETE",
                headers: {
                    'X-App-Id': global.appId,
                    'X-Session-Token': global.token
                },
            });

            const isResponse = response._bodyInit !='' ? true : false;

            // 退出成功
            if(response.status == 204){
                // 删除本地存储的登录数据
                global.storage.remove({
                    key: 'loginStatus'
                });
                result = true;
            }else{

                if(isResponse){
                    alert(JSON.parse(response._bodyInit).message);
                }
          
            }
            
        } catch (error) {
            alert(error);
        }

        return result;
    }

    // 执行退出
    async _logout(){
        this.setState({
            loading:true
        });

        // 请求成功
        if(await this._sendLogout()){
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

    componentWillMount(){
       this._getAccountInfo();
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.user}>
                    <View style={styles.userAvatar}>
                        <Image style={styles.userImage} source={require(imageUri+'avatar-default.jpg')} />
                    </View>
                    <View style={styles.userName}>
                        <View style={styles.userNameTop}></View>
                        <View style={styles.userNameCenter}>
                            <Text style={styles.userNameText}>{this.state.userName}</Text>
                            <Text style={styles.userEmailText}>{this.state.email}</Text>
                        </View>
                        <View style={styles.userNameBottom}></View>
                    </View>
                </View>
                <View style={styles.translate}>
                    <TouchableOpacity style={styles.language}>
                        <View style={styles.languageMargin}>
                            <Text style={styles.languageText}>中文繁体</Text>
                        </View>
                        <View style={styles.selectIconMargin}>
                            <Image style={styles.selectIcon} source={require(iconUri+'no-selected.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cutLine}></View>
                    <TouchableOpacity style={styles.language}>
                        <View style={styles.languageMargin}>
                            <Text style={styles.languageText}>English</Text>
                        </View>
                        <View style={styles.selectIconMargin}>
                            <Image style={styles.selectIcon} source={require(iconUri+'no-selected.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.version}>
                    <View style={styles.versionTitle}>
                        <Text style={styles.versionTitleText}>当前版本</Text>
                    </View>
                    <View style={styles.versionNumber}>
                        <Text style={styles.versionNumberText}>V1.0.0</Text>
                    </View>
                </View>
                <View style={styles.logout}>
                    <Button
                        name='Logout'
                        buttonStyle={styles.logoutButton}
                        onPress={()=>this._logout()}
                    />
                </View>
                <Loading
                    isLoad={this.state.loading}
                />
            </View>
        );
    }
}

