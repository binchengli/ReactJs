import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel
} from 'react-bootstrap';

/* component */
//import Lang from '../../../component/languages.js';

class WizardBegin extends Component {
    constructor (props) {
        super (props);
        this.env = {
            saveFn: ()=>{}
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
            <Panel id='wizardBegin' header={<h3>Installation</h3>}>
                <span>This Install wizard will guide you through a basic procedure to configure TSC device</span>
            </Panel>
        );
    };
    
    dataUpdate (source) {
        this.env['saveFn'] = source['saveFn'];
    };

   _saveHandler () {
        this.env.saveFn();
    };
};

export default WizardBegin;