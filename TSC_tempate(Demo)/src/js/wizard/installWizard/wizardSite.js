import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel, FormControl, InputGroup
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* component */
//import Lang from '../../../component/languages.js';

/* common */
import ConstDef, { tzOptions, countryOptions } from '../../common/constDef.js';

class WizardSite extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isShowSecurity: false
        };
        this.configData = {};
        this.loginData = {};
        this.saveConfigHandler = function(){};
        this.saveLoginHandler = function(){};
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
            <Panel id='wizardSite' header={<h3>{Lang.showText(84)}</h3>}>
                {this.showConfigSettings()}
                {this.showLoginSettings()}
            </Panel>
        );
    };
    
    dataUpdate (source) {
        this.configData = source['configData'];
        this.loginData = source['loginData'];
        this.saveConfigHandler = source['saveConfigHandler'];
        this.saveLoginHandler = source['saveLoginHandler'];
    };
    formRefresh () {
        Object.keys(this.configData).map((entry) => {
            if (ReactDOM.findDOMNode(this.refs[`config_${entry}`]))
            {
                ReactDOM.findDOMNode(this.refs[`config_${entry}`]).value = this.configData[entry];
            }
        });
        Object.keys(this.loginData).map((entry) => {
            if (ReactDOM.findDOMNode(this.refs[`login_${entry}`]))
            {
                ReactDOM.findDOMNode(this.refs[`login_${entry}`]).value = this.loginData[entry];
            }
        });
    };

    showConfigSettings () {
        let content = [];
        content.push(
            <div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(68)}</div>
                    <div className="col-5">
                        <FormControl 
                            type='text' 
                            placeholder={Lang.showText(68)}
                            onChange={()=>{this._changeHandler('config', 'name');}} 
                            ref='config_name'
                            maxLength='32'
                        />
                    </div>
                </div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(81)}</div>
                    <div className="col-5">
                        <FormControl 
                            type='text' 
                            placeholder={Lang.showText(81)}
                            onChange={()=>{this._changeHandler('config', 'description');}} 
                            ref='config_description'
                            maxLength='32'
                        />
                    </div>
                </div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(69)}</div>
                    <div className="col-5">
                        <FormControl 
                            componentClass='select' 
                            onChange={()=>{this._changeHandler('config', 'countryCode');}} 
                            ref='config_countryCode'
                        >
                            {
                                countryOptions.map((entry) => (
                                    <option value={entry.A2}>{Lang.showText(entry.textIndex)}</option>
                                ))
                            }
                        </FormControl>
                    </div>
                </div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(70)}</div>
                    <div className="col-5">
                        <FormControl 
                            componentClass='select' 
                            onChange={()=>{this._changeHandler('config', 'timeZone');}} 
                            ref='config_timeZone'
                        >
                            {
                                tzOptions.map((entry) => (
                                    <option value={entry.value}>{Lang.showText(entry.textIndex)}</option>
                                ))
                            }
                        </FormControl>
                    </div>
                </div>
            </div>
        );
        return content;
    };
    showLoginSettings () {
        let content=[];
        content.push(
            <div>
                <div className="col-12 wizard-col-title">{Lang.showText(25)}</div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(151)}</div>
                    <div className="col-5">
                        <FormControl 
                            type='text' 
                            placeholder={Lang.showText(151)}
                            ref='login_name' 
                            onChange={()=>{this._changeHandler('login', 'name');}}
                            maxLength='16'
                        />
                    </div>
                </div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(7)}</div>
                    <div className="col-5">
                        <InputGroup>
                            <FormControl 
                                type={(this.state['isShowSecurity'])? 'text' : 'password'}
                                placeholder={Lang.showText(7)}
                                ref='login_security'
                                onChange={()=>{this._changeHandler('login', 'security');}}
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
                    <div className="col-3 col-notice">(6-32 {Lang.showText(154)})</div>
                </div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(19)}</div>
                    <div className="col-5">
                        <FormControl 
                            type='password' 
                            placeholder={Lang.showText(19)}
                            ref='login_confSecurity'
                            onChange={()=>{this._changeHandler('login', 'confSecurity');}}
                            maxLength='32'
                        />
                    </div>
                </div>
            </div>
        );
        return content;
    };

    _changeHandler (type, name) {
        let value;
        switch(type)
        {
            case 'config':
                value = ReactDOM.findDOMNode(this.refs[`config_${name}`]).value;
                this.saveConfigHandler(name, value);
                switch(name)
                {
                    case 'countryCode':
                        this.saveConfigHandler('isCountryCodeChanged', false);
                        break;
                    case 'timeZone':
                        this.saveConfigHandler('isTimezoneChanged', false);
                        break;
                }
                break;
            case 'login':
                value = ReactDOM.findDOMNode(this.refs[`login_${name}`]).value;
                this.saveLoginHandler(name, value);
                break;
        };
    };
};

export default WizardSite;