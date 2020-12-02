import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form, Table, Image
} from 'react-bootstrap';
import { hashHistory } from 'react-router';

/* server API */
import ServerAPI from '../../backendAPI/server.js';
import AccountAPI from '../../backendAPI/Account.js';

/* common */
// import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';

let CK_account = `${process.env['COOKIE']}_account`;
let CK_security = `${process.env['COOKIE']}_security`;

class Login extends Component {
    constructor (props) {
        super (props);
        this.loginData = {
            rememberMe: false,
            username: '',
            security: ''
        };
        this.env = {
            
        };
    };
    componentDidMount () {
        this.rememberLogin();
    };
    render () {
        return (
            <div className='login-wrapper'>
                <div className='login-form'>
                    <div className='login-content'>
                        <div><Image src='./img/login.png' /></div>
                        <div className='login-body'>
                            <h1>{'Dashboard Login'}</h1>
                            <div className='login-row'>
                                <FormControl 
                                    type='text' 
                                    placeholder={'Username'}
                                    onChange={()=>{this._changeHandler('username');}} 
                                    ref='username'
                                    maxLength='32'
                                    style={{height:'34px'}}
                                />
                            </div>
                            <div className='login-row'>
                                <FormControl 
                                    type='text' 
                                    placeholder={'Password'}
                                    onChange={()=>{this._changeHandler('security');}} 
                                    ref='security'
                                    maxLength='32'
                                    style={{height:'34px'}}
                                />
                            </div>
                            <div className='login-row'>
                                <Button onClick={()=>{this._loginHandler('login');}}>{'LOGIN'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    doFetch (request) {
        var result;

        switch(request)
        {
            case 'login':
                result = AccountAPI.login(this.loginData);
                result.then((res) => {
                    if (ServerAPI.errorCodeCheck(res)) 
                    {
                        console.log(res);
                        this.setCookie();
                        ServerAPI.saveUserInfo(res);
                        hashHistory.push('/home/realtime/devices/lyric');
                    }

                });
                break;
            default:
                break;
        };
        
    };
    rememberLogin () {
        let cookieObj = this.getCookieObj();
        if(cookieObj[CK_account] && cookieObj[CK_security])
        {
            ReactDOM.findDOMNode(this.refs['username']).value = cookieObj[CK_account];
            ReactDOM.findDOMNode(this.refs['security']).value = cookieObj[CK_security];
            this.loginData = {
                rememberMe: true,
                username: cookieObj[CK_account],
                security: cookieObj[CK_security]
            };
        };
        this.forceUpdate();
    };
    setCookie () {
        let loginData = this.loginData
        let setAccount = `${CK_account}=${loginData['username']};`;
        let setSecurity = `${CK_security}=${loginData['security']};`;
        let setExpired = ``;
        if(!loginData['rememberMe'])
        {
            let expires = new Date();
            expires.setTime (expires.getTime() - 1);
            setExpired = `expires=${expires.toGMTString()};`;
        };
        document.cookie = `${setAccount} ${setExpired}`;
        document.cookie = `${setSecurity} ${setExpired}`;
    };
    getCookieObj () {
        let obj = {};
        let cookies = document.cookie.split(';');
        cookies.map((entry)=>{
            let cookie = entry.trim().split('=');
            obj[cookie[0]] = cookie[1];
        });
        return obj
    };
    _changeHandler (name) {
        let value = ReactDOM.findDOMNode(this.refs[`${name}`]).value;
        this.loginData[name] = value;
        this.forceUpdate();
    };
    _loginHandler (request) {
        // this.doFetch(request);
        // hashHistory.push('/home/template/lyric');
        // hashHistory.push('/home/account');
        hashHistory.push('/home/welecom');
    };
};

export default Login;