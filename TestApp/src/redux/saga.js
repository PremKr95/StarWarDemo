import { fork,all,put,takeLatest,call } from "@redux-saga/core/effects";
import action from './action'
import { STAR_WAR_API } from "../common/AppUrls";
import testAsyncStorage from '../TestAsyncStorage'
function* ApiRequest(url) {
    try {
      const response = yield fetch(url)
      const res = yield response.json()
      return res
    } catch (err) {
      return [-1, "ERROR_MSG"]
    }
  }

export function* fetchPlanetList() {
    yield takeLatest(action.PLANET_LIST_SAGA, function*(data) {
         const url = STAR_WAR_API.PLANET_LIST+data.data
         const res = yield call(ApiRequest, url)
         

         var max_population=0
         res.results.map(item=>{
           const current_population = parseInt(item.population)
           if(current_population>max_population){
              max_population = current_population
           }
                
         })
          yield put({
             type: action.PLANET_LIST,
             res: res.results,
             maxPopulation:max_population
           })
       })
}

export function* searchUser() {
  yield takeLatest(action.FETCH_USER_DATA_SAGA, function*(data) {
       const url = STAR_WAR_API.SEARCH_CHARACTER+data.userName
       const res = yield call(ApiRequest, url) 
       if(res.count===1){
        const userName = res.results[0].name
        const password = res.results[0].birth_year
        if(data.userName == userName){
          if(password === data.password){
            testAsyncStorage.saveData('login', "done");
            testAsyncStorage.saveData('userName', userName);
            yield put({
              type: action.FETCH_USER_DATA,
              status: 1,
              res: userName
            })
          }else{
            yield put({
              type: action.FETCH_USER_DATA,
              status: -2,
            })
          } 
        }else{
          yield put({
            type: action.FETCH_USER_DATA,  
            status: -1,
          })
        }
       }else{
        yield put({
          type: action.FETCH_USER_DATA,  
          status: -1,
        })
       }
     })
}

export default function* saga(){
    yield all([
        fork(searchUser),
        fork(fetchPlanetList),
    ])
}