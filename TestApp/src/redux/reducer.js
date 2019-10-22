
import action from './action'

const initialState = {
    userName:'',
    searchData:[],
    maxPopulation:0,
    showLoader:false
}

const defaultState = {
    userName:'',
    searchData:[],
    maxPopulation:0,
    showLoader:false
}

export default ( reducer = (state =  initialState , data) => {
    newState = Object.assign({},state)
     if(data.type==action.FETCH_USER_DATA){
         newState.userName = data.res
         newState.status = data.status
         return Object.assign({},newState)
    } else if(data.type==action.PLANET_LIST){
        let res = data.res

        newState.searchData = [...res]
        newState.maxPopulation = data.maxPopulation
        return Object.assign({},newState)
   }
    else{
        return Object.assign({},newState)
    }
})


