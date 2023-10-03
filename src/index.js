import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {mainRoutes} from "./router";
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import store from './store';
import './preload'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<App />*/}
            <Router>
                <Switch>
                    {/*当使用admin的时候，都用app来渲染页面*/}
                    <Route path="/admin" render={routeProps => <App {...routeProps}/>}/>
                    {mainRoutes.map(route => {
                        return <Route key={route.path} {...route}/>
                    })}
                    <Redirect to="/login"/>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
