import { combineReducers } from 'redux';
import configureStore from './configure-store';
import env from './reducers/env';

function createStore() {
    const rootReducer = combineReducers({
        env
    })
    return configureStore(rootReducer)
}

export default createStore()
