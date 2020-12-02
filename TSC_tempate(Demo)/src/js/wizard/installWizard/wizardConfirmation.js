import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel
} from 'react-bootstrap';

/* component */
//import Lang from '../../../component/languages.js';

/* common */
import DataObj from '../../common/dataObj.js';

class WizardConfirmation extends Component {
    constructor (props) {
        super (props);
        this.controller_adminData = {};
        this.controller_configData = {};
        this.site_configData = {};
        this.site_loginData = {};

        if ('software' == process.env['PRODUCT']) 
        {
            this.listLabel_controller_admin = {
                'username': {textIndex: 151},
                'security': {textIndex: 7},
                'lastname': {textIndex: 152},
                'email':    {textIndex: 5}
            };
        }
        else
        {
            this.listLabel_controller_admin = {
                'username':     {textIndex: 151},
                'security':     {textIndex: 7},
                'firstname':    {textIndex: 22},
                'lastname':     {textIndex: 23},
                'email':        {textIndex: 5}
            };
        }
        this.listLabel_controller_config = {
            'name':             {textIndex: 143},
            'description':      {textIndex: 81},
            'countryCodeText':  {textIndex: 69},
            'timeZoneText':     {textIndex: 70}
        };
        this.listLabel_site_config = {
            'name':             {textIndex: 68},
            'description':      {textIndex: 81},
            'countryCodeText':  {textIndex: 69},
            'timeZoneText':     {textIndex: 70}
        };
        this.listLabel_site_login = {
            'name':     {textIndex: 151},
            'security': {textIndex: 7}
        };
    };
    componentWillMount () {
        this.dataUpdate(this.props);
    };
    componentWillReceiveProps (nextProps) {
        this.dataUpdate(nextProps);
    };
    render () {
        return (
            <div id='wizardConfirmation'>
                {this.showAdmin()}
                {this.showController()}
                {this.showSite()}
            </div>
        );
    };
    
    dataUpdate (source) {
        this.controller_adminData = source['controller_adminData'];
        this.controller_configData = new DataObj.orgCtrlObj(source['controller_configData']);
        this.site_configData = new DataObj.ctrlSiteObj(source['site_configData']);
        this.site_loginData = source['site_loginData'];
    };

    showAdmin () {
        let content = [];
        content.push(
            <Panel header={<h3>{Lang.showText(167)}</h3>}>
                {this.showAdminSettings()}
            </Panel>
        );
        return content;
    }
    showAdminSettings () {
        let content=[];
        Object.keys(this.listLabel_controller_admin).map((entry) => {
            content.push(
                <div className="col-12">
                    <div className="col-4 col-label">{Lang.showText(this.listLabel_controller_admin[entry].textIndex)}</div>
                    <div className="col-8">{this.controller_adminData[entry]}</div>
                </div>
            );
        });
        return content;
    };
    showController () {
        let content = [];
        content.push(
            <Panel header={<h3>Text145</h3>}>
                {this.showControllerConfig()}
            </Panel>
        );
        return content;
    };
    showControllerConfig () {
        let content = [];
        Object.keys(this.listLabel_controller_config).map((entry) => {
            switch(entry)
            {
                case 'countryCodeText':
                case 'timeZoneText':
                    content.push(
                        <div className="col-12">
                            <div className="col-4 col-label">{Lang.showText(this.listLabel_controller_config[entry].textIndex)}</div>
                            <div className="col-8">{Lang.showText(this.controller_configData[entry])}</div>
                        </div>
                    );
                    break;
                default:
                    content.push(
                        <div className="col-12">
                            <div className="col-4 col-label">{Lang.showText(this.listLabel_controller_config[entry].textIndex)}</div>
                            <div className="col-8">{this.controller_configData[entry]}</div>
                        </div>
                    );
                    break;
            };
        })
        return content;
    }
    showSite () {
        let content = [];
        content.push(
            <Panel header={<h3>{Lang.showText(84)}</h3>}>
                {this.showSiteConfig()}
                {this.showSiteLogin()}
            </Panel>
        );
        return content;
    };
    showSiteConfig () {
        let content = [];
        Object.keys(this.listLabel_site_config).map((entry) => {
            switch(entry)
            {
                case 'countryCodeText':
                case 'timeZoneText':
                    content.push(
                        <div className="col-12">
                            <div className="col-4 col-label">{Lang.showText(this.listLabel_site_config[entry].textIndex)}</div>
                            <div className="col-8">{Lang.showText(this.site_configData[entry])}</div>
                        </div>
                    );
                    break;
                default:
                    content.push(
                        <div className="col-12">
                            <div className="col-4 col-label">{Lang.showText(this.listLabel_site_config[entry].textIndex)}</div>
                            <div className="col-8">{this.site_configData[entry]}</div>
                        </div>
                    );
                    break;
            };
        });
        return content;
    };
    showSiteLogin () {
        let content=[];
        content.push(
            <div className="col-12 wizard-col-title">{Lang.showText(25)}</div>
        );
        Object.keys(this.listLabel_site_login).map((entry) => {
            content.push(
                <div className="col-12">
                    <div className="col-4 col-label">{Lang.showText(this.listLabel_site_login[entry].textIndex)}</div>
                    <div className="col-8">{this.site_loginData[entry]}</div>
                </div>
            );
        })
        return content;
    };
};

export default WizardConfirmation;