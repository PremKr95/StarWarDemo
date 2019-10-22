import React, { Component } from 'react'
import {View , StatusBar ,ActivityIndicator, ImageBackground,StyleSheet, Text , TextInput , TouchableOpacity}  from 'react-native'
import  utils from './Utils'
import {connect} from 'react-redux'
import action from './redux/action'
import commonStyles from './common/CommonStyles'
import color from './common/color'

class Login extends Component {

constructor(props){
    super(props)
    this.state = {
        name : "",
        password : "",
        showLoader:false
    }
}


validateCharacter(){
    this.setState({showLoader:true})
    const {name,password}= this.state
    const {fetchUserData} =this.props
    fetchUserData(name,password)
}

  render() {
    const {status}= this.props

    if(status===1)
        utils.finishActivity(this,'Search',null)
    return (
      <ImageBackground source={require('../res/Image/star_war.png')} style={commonStyles.container}>
            <StatusBar backgroundColor = {color.black}/>
            
            <View style={{alignItems:'center',justifyContent:'center',alignContent:'center',flex:1}}>

                <View style={styles.loginView}>
                {this.state.showLoader &&
                <ActivityIndicator
                    color={'black'}
                    animating={true}
                    size={'large'}
                />}
                <TextInput style = {commonStyles.primaryTextInput}
                   label="Registered mobile number"
                   underlineColorAndroid= 'black'
                   fontSize={17}
                   placeholder = 'Please enter your user name'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   onChangeText = {(text)=> this.setState({name:text})}
                   />


                {status === -1 && 
                <Text style={styles.errorMsg}>
                    {'Not a valid Star War Character'}
                </Text>}

                <TextInput style = {commonStyles.primaryTextInput}
                   label="Registered mobile number"
                   underlineColorAndroid='black'
                   fontSize={17}
                   placeholder = 'Please enter your password'
                   placeholderTextColor = "#808080"
                   autoCapitalize = "none"
                   onChangeText = {(text)=> this.setState({password:text})}
                />

                {status === -2 &&
                <Text style={[styles.errorMsg,{marginTop:130}]}>
                    {'Password Incorrect'}
                </Text>}
                
                <TouchableOpacity style={commonStyles.primaryButton}onPress={()=>this.validateCharacter()} >
                    <Text style={commonStyles.buttonText}>Login</Text>
                </TouchableOpacity>  
                </View>
 
                </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
    const {userName,status}= state
    return { userName,status }; 
}

const styles = StyleSheet.create({
    loginView:{backgroundColor:'white',width:'90%',borderRadius:8,paddingHorizontal:12, height:260,justifyContent:'space-evenly'},
    errorMsg:{position:'absolute',width:'80%',alignSelf:'center',marginTop : 50,color:'red',paddingLeft:4}
})


export default connect(mapStateToProps,{ ...action })(Login)