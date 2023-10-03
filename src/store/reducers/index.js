import { combineReducers } from 'redux';
import userReducer from './userReducer';
import selectReducer from './selectReducer'
import loadingReducer from './loadingReducer'

// 通过combineReducers把多个reducer进行合并
const index = combineReducers({
    userReducer,
    selectReducer,
    loadingReducer,
})

export default index;
