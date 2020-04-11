import React from 'react';
import ReactDOM from 'react-dom';
import Home from './page/home'
import { BrowserRouter as Router, Route, Switch/* , NavLink, Redirect */ } from "react-router-dom";
import './assets/css/reset.css';
import './assets/css/variable.scss';
import 'antd/dist/antd.css';
function App() {
    return (
        <div id="app">
            <Router>
                {/* <header>
                    <NavLink to="/child1" style={{ color: 'green' }} activeStyle={{ color: '#f40' }}>1111</NavLink> <br />
                    <NavLink to="/child2" activeClassName="active">2222</NavLink><br />
                    <NavLink to="/child3">3333</NavLink><br />
                </header> */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/" render={() => (<Redirect to="/child1" />)} /> 
                    <Route path="/child1" component={Child1} />
                    <Route path="/child2" component={Child2} />
                    <Route path="/child3" component={Child3} /> */}
                </Switch>
            </Router>

        </div>
    )
}


ReactDOM.render(< App />, document.getElementById('root'));