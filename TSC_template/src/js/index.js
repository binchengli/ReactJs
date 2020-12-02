import React, { Component } from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRedirect } from 'react-router';

// import {defaults} from 'react-chartjs-2';
// defaults.global.animation.duration= 0;
window.Promise = Promise;

// import Lang from './common/languages.js';

/* route */
import Login from './route/login/login.js';
import Home from './route/home/home.js';
import Blank from './route/other/blank.js';
import Account from './route/home/account.js';
import Device from './route/home/device.js';
import Statistic from './route/home/statistic.js';
import Create from './route/home/create.js';
import Setting from './route/home/setting.js';
import Welecom from './route/home/welecom.js';
import Page_404 from './route/other/404.js';

document.title = process.env['NAME'];

class Index extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        );
    };
};

class RouteMap extends Component {
    constructor (props) {
        super(props);
        // Lang.initLanguage();
    };
    render () {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Index}>
                    <IndexRedirect to='/login' />
                    <Route path='/login' component={Login} />
                    <Route path='/login/*' component={Page_404} />
                    
                    <Route path='/home' component={Home}>
                        {/* <Route path='/home/template/:project' component={Blank}/> */}
                        <Route path='/home/account' component={Account} />
                        <Route path='/home/device' component={Device} />
                        <Route path='/home/statistic' component={Statistic} />
                        <Route path='/home/create' component={Create} />
                        <Route path='/home/setting' component={Setting} />
                         <Route path='/home/Welecom' component={Welecom} />
                        <Route path='/home/*' component={Page_404}/>
                    </Route>
                   
                    <Route path='/404' component={Page_404} />
                    <Route path='/*' component={Page_404} />
                   
                </Route>
            </Router>
        );
    };
};


render((<RouteMap />), document.getElementById('main'));