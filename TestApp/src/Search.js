import React, { Component } from 'react'
import {View ,FlatList,Alert, Dimensions,Image,StyleSheet, ImageBackground, StatusBar , Text ,TouchableOpacity, TextInput}  from 'react-native'
import testAsyncStorage from './TestAsyncStorage'
import {connect} from 'react-redux'
import commonStyles from './common/CommonStyles'
import action from './redux/action'
import {Card} from 'native-base'
const _width = Dimensions.get('window').width
let noOfSearch = 0
class Search extends Component {

    constructor(props){
        super(props)
        this.state = {
           searchString:'',
           userName:'',
           freezeUser:false,

        }
    }

    componentDidMount(){
      testAsyncStorage.getData('userName').then((value)=>{
        this.setState({userName:value})
      })
    }

    convertPopulation(value) {
      if (value != undefined) {
        var num = value.toString()
        var numLength = num.length
        var displayNum = ""
        var suffix = ""
        if (numLength > 2 && numLength <= 5) {
          displayNum = num / 1000
          suffix = displayNum > 1 ? "K" : "K"
        } else if (numLength === 6 || numLength === 7) {
          displayNum = num / 100000
          suffix = displayNum > 1 ? "Lac" : "Lac"
        } else if (numLength >= 8) {
          displayNum = num / 10000000
          suffix = displayNum > 1 ? "Cr" : "Cr"
        }
        displayNum = Math.floor(100 * displayNum) / 100
        return displayNum + " " + suffix
      }
      return value
    }


    callTime(){
      setTimeout(()=>{
          noOfSearch=0
          this.setState({freezeUser:false})
          alert('Now you can start again')
      },20000)
    }

    componentWillMount(){
      this.setState({freezeUser:false})
      noOfSearch=0
      clearTimeout()
    }

   
    _renderItem(item){
        const _item = item.item
        const {maxPopulation} = this.props
        const __pop = _item.population != "unknown" ? parseInt(_item.population) : 0
        const _pop = __pop!==0 ? (__pop/maxPopulation)*100 : 1
        return(
            <Card style={[styles.cardOuterView,{minWidth:_width/2+_pop ,width:`${_pop}%`}]}>
              <View style={styles.populationTxt}>
                  <Text style={{color:'white'}} >{'Population: '+this.convertPopulation(_item.population)}</Text>
              </View>
              <Text  numberOfLines={1}  style={styles.title}>{'Planet : '+_item.name}</Text>
              <Text numberOfLines={1} style={styles.title}>{'Diamter : '+_item.diameter}</Text>
              <Text  numberOfLines={1}  style={styles.title}>{'Climate : '+_item.climate}</Text>
          </Card>
        )
    }

    performLogout=()=>{
      Alert.alert("", "Are you sure  you want to logout ?", [
        { text: "CANCEL", onPress: () => {} },
        { text: "PROCEED", onPress: () => this.doLogout() }
      ])
    }

    doLogout(){
      testAsyncStorage.clear()
      this.props.navigation.navigate('Login')
    }
   
    render() {
        const {searchData,fetchSearchData,maxPopulation}= this.props
        const {searchString,userName}= this.state  
        return (
          <ImageBackground
           style={{flex:1}}
           resizeMode="cover"
           source={require("../res/Image/planet.png")}>

                <StatusBar
                    backgroundColor={'black'}
                />
                <View style={styles.welcomeView}>
                
                <Text style={styles.welcomeText}>{'Welcome '}
                <Text style={styles.txtName}>
                {userName}</Text> </Text>

                <TouchableOpacity onPress={()=>this.performLogout()} >
                    <Image style={styles.logoutImg} source={require('../res/Image/log_out.png')}/>
                </TouchableOpacity>
                </View>
                <TextInput style = {commonStyles.primarySearch}
                    label="Registered mobile number"
                    underlineColorAndroid='transparent'
                    fontSize={17}
                    placeholder = 'Search Here'
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    value = {this.state.searchString}
                    onChangeText = {(text)=> {
                      if(this.state.freezeUser){
                        alert('Wait')
                      }else{
                       if(this.state.searchString.length<text.length)
                            noOfSearch++
                        if(noOfSearch>14 && userName!="\"Luke Skywalker\""){
                            this.callTime()
                            this.setState({freezeUser:true})
                            alert("You can't search now for 1 min")
                        }else{
                           this.setState({searchString:text})
                           fetchSearchData(text)
                        }
                      }  
                    }}
                    />  
                
        <FlatList
            style={{marginTop:12}}
            data={searchData}
            extraData={this.state}
            style={{padding:16}}
            renderItem={(item)=>this._renderItem(item)}
            keyExtractor={(item, index) => item.toString()}
            />
        </ImageBackground>
        ) 
    }
}

const mapStateToProps = (state) => {
    const {searchData , maxPopulation}= state
    return { searchData , maxPopulation}
}

const styles = StyleSheet.create({
  welcomeView:{flexDirection:'row',justifyContent:'space-between'},
  welcomeText:{marginLeft:32, fontSize:20,color:'#FFFFFF',marginTop:32,alignSelf:'center'},
  txtName:{fontSize:18,color:'#FFFFFF',marginTop:12,alignSelf:'center'},
  logoutImg:{marginTop:32,marginRight:16, height:28,width:28,backgroundColor:'white'},
  title:{marginTop:8, color:'black',fontSize:16},
  populationTxt:{height:32,width:160,justifyContent:'center',alignItems:'center', backgroundColor:'#3481f7',alignSelf:'flex-end', right:-16,borderTopLeftRadius:16,borderBottomLeftRadius:16,marginBottom:4},
  cardOuterView:{height:140,borderRadius:8,backgroundColor:'rgba(255,255,255,0.5)',paddingVertical:8,paddingHorizontal:12,alignSelf:'flex-start'}
})


export default connect(mapStateToProps,{...action})(Search)