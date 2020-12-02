import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    FormControl, Panel
} from 'react-bootstrap';

/* component */
//import Lang from '../../../component/languages.js';

/* common */
import ConstDef, { tzOptions, countryOptions } from '../../common/constDef.js';

class WizardController extends Component {
    constructor (props) {
        super (props);
        this.configData = {};
        this.saveConfigHandler = function(){};
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
            <Panel id='wizardController' header={<h3>Text145</h3>}>
                {this.showConfigSettings()}
            </Panel>
        );
    };
    
    dataUpdate (source) {
        this.configData = source['configData'];
        this.saveConfigHandler = source['saveConfigHandler'];
    };
    formRefresh () {
        Object.keys(this.configData).map((entry) => {
            if (ReactDOM.findDOMNode(this.refs[`config_${entry}`]))
            {
                ReactDOM.findDOMNode(this.refs[`config_${entry}`]).value = this.configData[entry];
            }
        });
    };

    showConfigSettings () {
        let content = [];
        content.push(
            <div>
                <div>
                    <div className="col-4 col-label">{Lang.showText(143)}</div>
                    <div className="col-5">
                        <FormControl 
                            type='text' 
                            placeholder={Lang.showText(143)}
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

    _changeHandler (type, name) {
        let value;
        switch(type)
        {
            case 'config':
                value = ReactDOM.findDOMNode(this.refs[`config_${name}`]).value;
                this.saveConfigHandler(name, value);
                break;
        };
    };
};

export default WizardController;