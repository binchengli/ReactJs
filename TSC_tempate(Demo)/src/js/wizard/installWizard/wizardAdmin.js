import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel, FormControl, InputGroup
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* component */
//import Lang from '../../../component/languages.js';

class WizardAdmin extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isShowSecurity: false
        };
        this.adminData = {};
        this.saveAdminHandler = function(){};
    };
    componentWillMount () {
        this.dataUpdate(this.props);
    };
    componentDidMount () {
        this.formRefresh();
    };
    componentWillReceiveProps (nextProps) {
        this.dataUpdate(nextProps);
    };
    componentDidUpdate () {
        this.formRefresh();
    };
    render () {
        return (
            <Panel id='wizardAdmin' header={<h3>Admin Settings</h3>}>
                {this.showUserSettings()}
            </Panel>
        );
    };
    
    dataUpdate (source) {
        this.adminData = source['adminData'];
        this.saveAdminHandler = source['saveAdminHandler'];
    };
    formRefresh () {
        Object.keys(this.adminData).map((entry) => {
            if (ReactDOM.findDOMNode(this.refs[entry]))
            {
                ReactDOM.findDOMNode(this.refs[entry]).value = this.adminData[entry];
            }
        });
    };

    showUserSettings () {
        let content=[];
        content.push(
            <div>
                <div>
                    <div className="col-4 col-label">Account</div>
                    <div className="col-5">
                        <FormControl 
                            type='text' 
                            placeholder="Admin"
                            ref='username'
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <div className="col-4 col-label">Password</div>
                    <div className="col-5">
                        <InputGroup>
                            <FormControl 
                                type={(this.state['isShowSecurity'])? 'text' : 'password'}
                                placeholder='Password'
                                onChange={()=>{this._changeHandler('admin', 'security');}} 
                                ref='security'
                                maxLength='32'
                            />
                            <InputGroup.Addon
                                onClick={()=>{this.setState({isShowSecurity : !this.state['isShowSecurity']});}} 
                                className='clickable'
                            >
                                <FontAwesome name={(this.state['isShowSecurity'])? 'eye':'eye-slash'} />
                            </InputGroup.Addon>
                        </InputGroup>
                    </div>
                    <div className="col-3 col-notice">(6-32 Characters)</div>
                </div>
                <div>
                    <div className="col-4 col-label">Confirm Password</div>
                    <div className="col-5">
                        <FormControl 
                            type='password' 
                            placeholder='Confirm Password'
                            onChange={()=>{this._changeHandler('admin', 'confSecurity');}} 
                            ref='confSecurity'
                            maxLength='32'
                        />
                    </div>
                </div>
                {
                    ('software' == process.env['PRODUCT'])?
                    (
                        <div>
                            <div className="col-4 col-label">{Lang.showText(152)}</div>
                            <div className="col-5">
                                <FormControl
                                    type='text' 
                                    placeholder={Lang.showText(152)}
                                    onChange={()=>{this._changeHandler('admin', 'lastname');}} 
                                    ref='lastname'
                                    maxLength='32'
                                />
                            </div>
                        </div>
                    ) : ([(
                        <div>
                            <div className="col-4 col-label">'text22'</div>
                            <div className="col-5">
                                <FormControl
                                    type='text' 
                                    placeholder='text22'
                                    onChange={()=>{this._changeHandler('admin', 'firstname');}} 
                                    ref='firstname'
                                    maxLength='32'
                                />
                            </div>
                        </div>
                    ),(
                        <div>
                            <div className="col-4 col-label">'text22'</div>
                            <div className="col-5">
                                <FormControl
                                    type='text' 
                                    placeholder='text23'
                                    onChange={()=>{this._changeHandler('admin', 'lastname');}} 
                                    ref='lastname'
                                    maxLength='32'
                                />
                            </div>
                        </div>
                    )])
                }
                <div>
                    <div className="col-4 col-label">Email</div>
                    <div className="col-5">
                        <FormControl
                            type='text' 
                            placeholder='Email'
                            onChange={()=>{this._changeHandler('admin', 'email');}} 
                            ref='email'
                            maxLength='64'
                        />
                    </div>
                </div>
            </div>
        );
        return content;
    };

    _changeHandler (type, name) {
        let value = ReactDOM.findDOMNode(this.refs[name]).value;
        switch(type)
        {
            case 'admin':
                if ('software' == process.env['PRODUCT']) {
                    if('lastname' == name)
                    {
                        this.saveAdminHandler('firstname', value);
                    };
                };
                this.saveAdminHandler(name, value);
                break;
        };
    };
};

export default WizardAdmin;