import {createStore} from 'redux';
// 引入reducer
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    // 显示redux调试工具
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;