/** @format */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import RootStack from './src/RootStack';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'

import reducer from './src/redux/reducer'
import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleWare from 'redux-saga'
import saga from './src/redux/saga'
const sagaMiddleWare = createSagaMiddleWare()
const store = createStore(reducer , applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(saga)

export class TestApp extends Component {
    constructor(props) {
        super(props);
    } 

  render() {
    return(
      <Provider store={store}>
        <RootStack/>
      </Provider>
    )
}
}
AppRegistry.registerComponent(appName, () => TestApp)
