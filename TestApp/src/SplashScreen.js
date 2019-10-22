import React, { Component } from 'react'
import {View , StatusBar ,Text} from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import utils from './Utils'
import commonStyles from './common/CommonStyles'
import color from './common/color'
export default class SplashScreen extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    setTimeout(()=>{
      testAsyncStorage.getData('login').then((isLoginDone)=>{
        if(isLoginDone && isLoginDone!==undefined && isLoginDone!==null){
          utils.finishActivity(this, 'Search' , null)
        }else{
          utils.finishActivity(this, 'Login' , null , null)
        }
    })
    },3000)     
  }

  render() {
    return (
      <View style={[commonStyles.container,{justifyContent:'center'}]}>
            <StatusBar backgroundColor= {color.primaryColor}/>
            <View style={{alignSelf:'center'}}>
               <Text style = {{fontSize:40,color:'white',alignSelf:'center'}}>{'Xebia Demo'}</Text>
            </View>
      </View>
    )
  }
}
