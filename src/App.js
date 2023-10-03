import {Redirect, Route, Switch} from 'react-router-dom'
import {adminRoutes,setRoutes} from "./router";
import Frame from  './components/Frame/Index'
import './Frame.css'

function App() {
    return (
        <Frame>
            <Switch>
                {[].concat(adminRoutes,setRoutes).map(route => {
                    return (
                        <Route key={route.path} path={route.path} exact={route.exact} render={
                            routeProps => {
                                return <route.component {...routeProps} />;
                            }
                        }/>
                    )
                })}
                <Redirect to="/404"/>
            </Switch>
        </Frame>
    );
}

export default App;
