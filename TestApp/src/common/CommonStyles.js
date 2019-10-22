import {StyleSheet} from 'react-native'
import color from './color'
const commonStyle = StyleSheet.create ({

    container : {
        backgroundColor:'#0065FF', 
        flex:1,
        padding:16,
    } ,

    primaryImageView  : {
        alignSelf:'center',
        margin:'10%', 
        padding:16
    },

    primaryTextInput : {
        width:'100%',
        alignSelf:'center',
    },
    
    primarySearch : {
        width:'90%',
        marginTop:4,
        alignSelf:'center',
        height:48,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#0065FF',
        paddingLeft:8,
        color:'black',
        backgroundColor:'white'
    },

    primaryButton : {
        height: 56,
        alignSelf: "center",
        width: "70%",
        backgroundColor:color.primaryButtonColor,
        borderRadius:28,
        justifyContent:'center',
        alignItems:'center',
    },

    buttonText : {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize:17,
        color:'#FFFFFF',
        fontWeight:"bold",
    }


})

export default commonStyle