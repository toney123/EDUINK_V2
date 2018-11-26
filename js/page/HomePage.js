import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

const AllTabView = ()=>{
    return (
        <View>
            <Text>all</Text>
        </View>
    );
};

const NoticeTabView = ()=>{
    return (
        <View>
            <Text>notice</Text>
        </View>
    );
};

const NewsTabView = ()=>{
    return (
        <View>
            <Text>news</Text>
        </View>
    );
};

const PhotoTabView = ()=>{
    return (
        <View>
            <Text>photo</Text>
        </View>
    );
};


export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);

        this.childName = this.props.navigation.getParam('childName')==undefined ? 'All Childen': this.props.navigation.getParam('childName');
    }

    showLeftBar(){
        this.props.navigation.openDrawer();
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-content' 
                    backgroundColor='#FFF'
                    animated={true}
                />
                <View style={styles.navigationBar}>
                    <View style={styles.navigationBarIn}>
                        <View style={styles.navigationLeft}>
                            <TouchableOpacity style={styles.navigationLeftBar} onPress={this.showLeftBar}>
                                <Icon name='bars' size={20} color='#4A98F7'></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navigationCenter}>
                            <Text style={styles.navigationCenterText}>{this.childName}</Text>
                        </View>
                        <View style={styles.navigationRight}>
                        </View>
                    </View>
                </View>
                <View style={styles.labelBar}>
                    <ScrollableTabView 
                        tabBarActiveTextColor='#42436A'
                        tabBarUnderlineStyle = {{
                            backgroundColor:'#42436A',
                            height:2,
                            
                        }}
                        tabBarBackgroundColor = '#F6F9FF'
                        tabBarInactiveTextColor='#8F9FB3'
                        style = {{
                            
                        }}
                    >
                        <AllTabView tabLabel='ALL' />
                        <NoticeTabView tabLabel='NOTICE' />
                        <NewsTabView tabLabel='NEWS' />
                        <PhotoTabView tabLabel='PHOTO' />
                    </ScrollableTabView>
                </View>
                <View style={styles.content}>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    navigationBar:{
        flex:1,
        backgroundColor:"#FFF",
        
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
    navigationLeftBar:{
        left:20,
    },  
    navigationCenter:{
        flex:2,
    },
    navigationCenterText:{
        textAlign:'center',
        fontSize:18
    },
    navigationRight:{
        flex:1,
    },
    labelBar:{
        flex:5,
    },
    content:{
        flex:6,
    }
});

