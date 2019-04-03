import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Login from './Login'
import App from './App'
import DashBoard from './DashBoard'
import Category from './Category'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import LoginSaga from './data/sagas/LoginSaga'

import rootReducer from './data/reducers'

const sagaMiddleware = createSagaMiddleware()
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer,devTools)

sagaMiddleware.run(LoginSaga)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/index" component={App}>
                <Route path="/dashBoard" component={DashBoard}/>
                <Route path="/category" component={Category}/>
            </Route>
        </Router>
    </Provider>
, document.getElementById('root'));