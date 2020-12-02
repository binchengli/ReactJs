import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
    Navbar, Nav, NavItem, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form, Table, Image
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { hashHistory } from 'react-router';
/* server API */
import ServerAPI from '../../backendAPI/server.js';
import AccountAPI from '../../backendAPI/Account.js';
import InstallWizard from '../../wizard/installWizard/wizard.js';
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
        this.state = {
            displayInstallWizard: false,
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
                        <div><Image style={{height:'120px',width:'120px'}} src='./img/logo.png' /></div>   
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
                                    type='password' 
                                    placeholder={'Password'}
                                    onChange={()=>{this._changeHandler('security');}} 
                                    ref='security'
                                    maxLength='32'
                                    style={{height:'34px'}}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this._loginHandler('login');
                                        }
                                    }}
                                />
                            </div>
                            <div className='login-row'>
                                <Button  ref='login-row' onClick={()=>{this._loginHandler('login');}}>{'LOGIN'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar fluid className='home-topbar' style={{ 'background-color':'transparent'}}>
                    {/* <div className='home-topbar-bar'  onClick={() => {this._toogleHandler()}} >
                        <FontAwesome name='bars' fixedWidth />
                    </div> */}
                     {this.state.displayInstallWizard ? this.showInstallWizardWindow() : []} 
                   
                    {/* <Nav className='home-topbar-tools'>
                        {this.showTopbarLanguages()}
                        {this.showTopbarUser()}
                    </Nav> */}
                </Navbar>
            </div>
        );
    };

    showInstallWizardWindow () {
        let content = [];
        content.push(
            <div 
                className={
                    classNames({
                        'block-window': true,
                        'expand': true//this.state['displayInstallWizard']
                    })
                }
            >
                <InstallWizard 
                    mail={this.loginData.username}
                    mode="regist"
                    onComplete={e => {this.setState({displayInstallWizard: false});}}
                />
            </div>
        );
        return content;
    };

    doFetch (request) {
        var result;
        
        switch(request)
        {
            case 'login':
                console.log('doFetch login');
                if(!this.loginData.username)
                {
                    alert('Please enter UserName.');
                    return false;
                }

                if(!this.loginData.security)
                {
                    alert('Please enter the password.');
                    return false;
                }
                result = AccountAPI.login(this.loginData);
                result.then((res) => {//this.setState({displayInstallWizard: true});return;
                    //if (ServerAPI.errorCodeCheck(res) && res.status!=401) 
                    if (res.status == "ok")
                    {                     
                        this.setCookie();
                        // ServerAPI.saveUserInfo(res);
                        console.log('login res='+JSON.stringify(res));
                 
                        res["mail"]=this.loginData.username;
                        console.log('login hi '+res.alias);
                        ServerAPI.saveLoginInfo(JSON.stringify(res));
                        // hashHistory.push('/home/realtime/devices/lyric');
                        hashHistory.push('/home/welecom');
                    }else
                    {
                        //console.log('login res='+JSON.stringify(res));

                        if (res.message.indexOf("not verified") != -1)
                            this.setState({displayInstallWizard: true});
                        else //if (res && res.message)
                            //alert(res.message);
                        //else
                            alert('Login Fail, Please try again.');
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
      
         this.doFetch(request);
        // hashHistory.push('/home/template/lyric');
        // hashHistory.push('/home/account');
        // hashHistory.push('/home/welecom');
    };
};

export default Login;