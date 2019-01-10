/**
 * 发起请假页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,FlatList,TextInput} from 'react-native';
import TopNavBar from '../../component/top-nav-bar';
import Button from '../../component/button';
import { DatePickerDialog } from 'react-native-datepicker-dialog'


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
    textSign:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:25,
        height:35,
    },
    necessarySign:{
        color:'#F84F4F',
    },
    textSignText:{
        color:'#8F9FB3',
    },
    absenteeStudent:{
        backgroundColor:'#FFF'
    },
    absenteeStudentTouch:{
        height:35,
        flexDirection:'row'
    },
    absenteeStudentTouchLeft:{
        flex:1
    },
    absenteeStudentTouchCenter:{
        flex:10,
        flexDirection:'row',
        alignItems:'center'
    },
    absenteeStudentTouchRight:{
        flex:1
    },
    absenteeStudentTouchText:{
        flex:9    
    },
    absenteeDate:{
        height:70,
        backgroundColor:'#FFF',
        flexDirection:'row'
    },
    absenteeDateLeft:{
        flex:1,
    },
    absenteeDateCenter:{
        flex:10,
    },
    absenteeDateRight:{
        flex:1
    },  
    absenteeBetweenDate:{
        height:35,
        flexDirection:'row',
        alignItems:'center'
    },
    splitLine:{
        alignSelf:'center',
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#F6F9FF',
        marginLeft:25,
        marginRight:25,
    },
    absenteeBetweenDateSign:{
        flex:3
    },
    absenteeBetweenDateDate:{
        flex:4,
        alignItems:'flex-end'
    },
    absenteeBetweenDateArrow:{
        flex:1,
        alignItems:'flex-end'
    },
    absenteeBetweenDateArrowImage:{
        width:10,
        height:10,
    },
    absenteeReason:{
        backgroundColor:'#FFF'
    },
    previewButton:{
        width:'50%',
        alignSelf:'center',
        borderRadius:30,
        marginTop:30
    }
});

let childrenIds=[];
export default class Create extends Component{

    constructor(){
        super();
        this.state = {
            childrenIds:childrenIds,
            startDate:'',
            endDate:'',
            reasonText:''
        }
        this._startDatePicker = this._startDatePicker.bind(this);
        this._endDatePicker = this._endDatePicker.bind(this);
    }

    _previewInfo(){
        // 验证是否有选中孩子
        if(childrenIds.length == 0){
            alert('Please choose at least one child');
            return false;
        }
        if(this.state.startDate == ''){
            alert('Please choose the start Date');
            return false;
        }

        if(this.state.endDate == ''){
            alert('Please choose the end Date');
            return false;
        }

        if(this.state.reasonText == ''){
            alert('Please enter the reasons for your leave');
            return false;
        }

        this.props.navigation.navigate('ConfirmAbsenteeNote',{
            childrenIds:childrenIds,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            reasonText:this.state.reasonText
        });
    }

    _selectChild(id){
        // 不存在相同的值，则存入
        if(childrenIds.indexOf(id) == -1){
            childrenIds.push(id);
        }else{
            childrenIds.splice(childrenIds.indexOf(id),1);
        }
        this.setState({
            childrenIds:childrenIds
        });
    }

    _startDatePicker(){
        this.refs.startDatePicker.open({
            date: new Date(),
      });
    }

    _endDatePicker(){
        this.refs.endDatePicker.open({
            date: new Date(),
      });
    }

    _setDate(typeName,date){
        let formatDate = date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate();
        let object = {};
        object[typeName] = formatDate;
        this.setState(object);
    }


    componentWillMount(){
       
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
                            <Text style={styles.topNavBarCenterText}>Absentee Note</Text>
                        }
                    />
                </View>
                <View style={styles.containerBottom}>
                    <DatePickerDialog ref="startDatePicker" onDatePicked={(date)=>this._setDate('startDate',date)} />
                    <DatePickerDialog ref="endDatePicker" onDatePicked={(date)=>this._setDate('endDate',date)} />
                    <View style={styles.textSign}>
                        <Text style={styles.necessarySign}>*</Text>
                        <Text style={styles.textSignText}>Student</Text>
                    </View> 

                    <View style={styles.absenteeStudent}>
                        <FlatList
                            data={global.children}
                            extraData={this.state}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item}) =>{
                                let selected = (
                                    <Image style={{width:20,height:20}} source={require(iconUri+'no-selected.png')} />
                                );

                                // 选中
                                if(childrenIds.indexOf(item._id) != -1){
                                    selected = (
                                        <Image style={{width:20,height:20}} source={require(iconUri+'selected.png')} />
                                    );
                                }

                                return(
                                    <TouchableOpacity style={styles.absenteeStudentTouch} onPress={()=>this._selectChild(item._id)}>
                                        <View style={styles.absenteeStudentTouchLeft}></View>
                                        <View style={styles.absenteeStudentTouchCenter}>
                                            <Text style={styles.absenteeStudentTouchText}>{item.firstName+' '+item.lastName}</Text>
                                            {selected}
                                        </View>
                                        <View style={styles.absenteeStudentTouchRight}></View>
                                    </TouchableOpacity>
                                );
                            }}
                        />       
                    </View> 

                    <View style={styles.textSign}>
                        <Text style={styles.necessarySign}>*</Text>
                        <Text style={styles.textSignText}>Date</Text>
                    </View>

                    <View style={styles.absenteeDate}>
                        <View style={styles.absenteeDateLeft}></View>
                        <View style={styles.absenteeDateCenter}>
                            <TouchableOpacity style={styles.absenteeBetweenDate} onPress={()=>this._startDatePicker()}>
                                <View style={styles.absenteeBetweenDateSign}>
                                    <Text style={styles.absenteeBetweenDateText}>Start Date</Text>
                                </View>
                                
                                <View style={styles.absenteeBetweenDateDate}>
                                    <Text style={styles.absenteeBetweenDateDateText}>{this.state.startDate}</Text>
                                </View>

                                <View style={styles.absenteeBetweenDateArrow}>
                                    <Image style={styles.absenteeBetweenDateArrowImage} source={require(iconUri+'next.png')}/>
                                </View>

                            </TouchableOpacity>

                            <View style={styles.splitLine}></View>

                            <TouchableOpacity style={styles.absenteeBetweenDate} onPress={()=>this._endDatePicker()}>
                                <View style={styles.absenteeBetweenDateSign}>
                                    <Text style={styles.absenteeBetweenDateText}>End Date</Text>
                                </View>
                                
                                <View style={styles.absenteeBetweenDateDate}>
                                    <Text style={styles.absenteeBetweenDateDateText}>{this.state.endDate}</Text>
                                </View>

                                <View style={styles.absenteeBetweenDateArrow}>
                                    <Image style={styles.absenteeBetweenDateArrowImage} source={require(iconUri+'next.png')}/>
                                </View>

                            </TouchableOpacity>
                    

                        </View>
                        <View style={styles.absenteeDateRight}></View>   
                    </View>        



                    <View style={styles.textSign}>
                        <Text style={styles.necessarySign}>*</Text>    
                        <Text style={styles.textSignText}>Reason</Text>
                    </View>

                    <View style={styles.absenteeReason}>
                        <TextInput
                            onChangeText={(text)=>this.setState({reasonText:text})}
                            numberOfLines={5}
                            maxLength={50}
                            multiline={true}
                            textAlignVertical='top'
                            placeholder='Please give a brief explanation of the reasons for your leave'
                        />
                    </View>

                    <Button
                        name='Preview'
                        buttonStyle={styles.previewButton}
                        onPress={()=>this._previewInfo()}
                    />


                </View>
            </View>
        );
    }
}

