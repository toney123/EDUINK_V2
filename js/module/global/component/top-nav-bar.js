import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    navigationBar:{
        flex:1,
        backgroundColor:"#FFF",
        // ...Platform.select({
        //     android:{
        //         elevation:10,
        //     }
        // }),
        
    },
    navigationBarIn:{
        flex:1,
        flexDirection:'row',
        top:10,
    },
    navigationLeft:{
        flex:1,
        top:3,
    },
    navigationCenter:{
        flex:2,
    },
    navigationRight:{
        flex:1,
    },
});



export default class TopNavBar extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const topNavBarLeft = this.props.topNavBarLeft;
        const topNavBarCenter = this.props.topNavBarCenter;
        const topNavBarBottom = this.props.topNavBarBottom;

        return(
            <View style={styles.navigationBar}>
                <StatusBar
                    barStyle='dark-content' 
                    backgroundColor='#FFF'
                    animated={true}
                />
                
                <View style={styles.navigationBarIn}>
                    <View style={styles.navigationLeft}>
                        {topNavBarLeft}
                    </View>
                    <View style={styles.navigationCenter}>
                        {topNavBarCenter}
                    </View>
                    <View style={styles.navigationRight}>
                        {topNavBarBottom}
                    </View>
                </View>
            </View>
        );
    }
}