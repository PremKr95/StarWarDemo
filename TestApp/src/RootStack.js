import {StackNavigator} from 'react-navigation'
import Login from './Login'
import SplashScreen from './SplashScreen'
import Search from './Search'
const RootStack = StackNavigator(
    {
        Login :{
            screen : Login,
            navigationOptions: {
                header: null
            }
        },
        
        SplashScreen :{
            screen : SplashScreen,
            navigationOptions :{
                header:null
            }
        },
        
        Search :{
            screen : Search,
            navigationOptions:{
                header:null
            }
        }
        
    },
    {
        initialRouteName: 'SplashScreen'
 
    }
)

export default RootStack