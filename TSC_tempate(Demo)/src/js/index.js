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
import DeviceTransfer from './route/home/deviceTransfer.js';
import DeviceInfo from './route/home/deviceInfo.js';
import Statistic from './route/home/STAT.js';
import Create from './route/home/create.js';
import Setting from './route/home/setting.js';
import ChangePassword from './route/home/change.js';
import Welcome from './route/home/welecom.js';
import Billing from './route/home/Billing.js';
import Page_404 from './route/other/404.js';
import AccountInfo from './route/home/accountinfo.js';
import RegistrationDevice from './route/home/STAT_RegistrationDevices.js';
import StoragePlan from './route/home/STAT_StoragePlan.js';
import ActivateDevice from './route/home/STAT_ActivatedDevices.js';
import DeactivateDevice from './route/home/STAT_DeactivatedDevices.js';

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
                        <Route path='/home/device/deviceinfo' component={DeviceInfo} />
                        <Route path='/home/device/devicetransfer' component={DeviceTransfer} />
                        <Route path='/home/statistic' component={Statistic} />
                        <Route path='/home/statistic/registrationdevices' component={RegistrationDevice} />
                        <Route path='/home/statistic/storageplan' component={StoragePlan} />
                        <Route path='/home/statistic/activateddevices' component={ActivateDevice} />
                        <Route path='/home/statistic/deactivateddevices' component={DeactivateDevice} />
                        <Route path='/home/billing' component={Billing} />
              
                        <Route path='/home/create' component={Create}  />
                        <Route path='/home/setting' component={Setting} />
                        <Route path='/home/change' component={ChangePassword} />
                        <Route path='/home/welcome' component={Welcome} />
                        <Route path='/home/account/info' component={AccountInfo} />
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
