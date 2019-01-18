import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ActivityIndicator,Modal} from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});


/**
 * 加载动画
 * @param isLoad 是否显示加载动画
 */
export default class Loading extends Component{

    // 属性验证
    static propTypes = {
        isLoad:PropTypes.bool.isRequired
    }


    componentWillMount(){
        
    }


    render(){
        return(
            <View style={styles.container}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.props.isLoad}
                    onRequestClose = {()=>{}}
                    >
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#597EF7" animating={this.props.isLoad} />
                    </View>
                </Modal>
            </View>
        );
    }
}