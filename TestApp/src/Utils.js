import {StackActions , NavigationActions} from 'react-navigation'
import testAsyncStorage from './TestAsyncStorage'
class Utils {

    finishActivity(context , activityName ,myProps , myKey){
        let resetAction = StackActions.reset({
            index: 0,
            key: myKey,
            actions: [NavigationActions.navigate({ routeName: activityName , params:myProps})],
        });
        return context.props.navigation.dispatch(resetAction);
    }
}

 const utils = new Utils()
 export default utils