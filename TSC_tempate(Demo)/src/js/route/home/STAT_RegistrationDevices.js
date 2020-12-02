import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel, Grid, Row, Col, FormControl, Button, Link
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* server API */
import ServerAPI from '../../backendAPI/server.js';
import RegDevAPI from '../../backendAPI/RegDevice.js';

/* component */
import PageTitile from '../../component/pageTitle.js';
import LineChart from '../../component/lineChart.js';
import StatDoughnut from '../../component/statDoughnut.js';

import { hashHistory } from 'react-router';

/* common */
import FunctionJS from '../../common/functionJS.js';

class RegistrationDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDoughnutLoading: false,
            isDoughnutAllLoading: false,
            isSelectorLoading: false,
            isLoading: false,
            linechartExpand: true,
            detailExpand: false
        };
        this.dataSource = {
            type: 'c0',
            date: {
                interval: 7,
                startDay: 0,
                endDay: 0
            },
            dateList: [
                {text: '1 Day', value: 1},
                {text: '7 Days', value: 7},
            ]
        };
        this.actDevice = [];
        this.timeSlot = [];
        this.lineData = {
            rowlabels: [],
            dataUnits: []
        };
        this.columnLabels = {
            name: {text: 26},
            number: {text: 27}
        };
        this.env = {
            project: ''
        };
        this.formData = {
            timeslot: 7,
            timezone: 0
        }
        this.formTotal = {
            timeslot: 60,
            timezone: 0
        }
    };

    componentWillReceiveProps (nextProps) {
        
        if (nextProps.params.project != this.env.project)
        {
            this.env.project = nextProps.params.project;
            this.dataUpdate();
        }
    };

    componentDidMount () {
        this.env.project = this.props.params.project;
        this.dataUpdate();
    };

    componentWillUnmount () {
        // stop refresh event
    };

    render () {      
        return (
            <Grid id='other_blank' fluid>
                <Row>
                    <Col md={12}>
                         <PageTitile text={`${'Sales Statistics'}/${'Registration Devices'}`} />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className='data-source-selector'>
                        <FormControl 
                            componentClass='select' 
                            onChange={() => {this._setDataSourceInterval();}} 
                            ref='dataSourceInterval' 
                            disabled={this.state.isLoading}
                        >
                            {
                                this.dataSource.dateList.map((entry) => (
                                    <option value={entry['value']} selected={(this.dataSource.date.interval == entry.value)?true:false}>{entry['text']}</option>
                                ))
                                
                            }
                            {/*<option value='30'>{this.LastOneMonth()}</option>
                            <option value='60'>{this.LastTwoMonth()}</option>*/}
                        </FormControl>
                    </Col>                   
                </Row>
                <Row>
                    <Col md={6}>
                        <StatDoughnut type='Model' statData={this.actDevice} 
                            title = 'Registration Devices'
                            isLoading={this.state['isDoughnutLoading']} />
                    </Col>           
                </Row>            
                <Row>                   
                    <Col md={12}>
                        <Panel collapsible expanded={this.state.linechartExpand} 
                            className='general-expand-panel'
                        >
                            <div className='linegraphTitle'>Registration Devices</div>
                            <LineChart
                                Rowlabels={this.lineData.rowlabels}
                                DataUnits={this.lineData.dataUnits}
                                isLoading={this.state.isLoading}
                            />
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    };

    LastOneMonth () {
        let now = new Date();
        now.setMonth(now.getMonth() - 2);
        let month = (now.getMonth() + 1).toString();
        return now.getFullYear() + '.' + (month[1] ? month : "0" + month[0]);
    }

    LastTwoMonth () {
        let now = new Date();
        now.setMonth(now.getMonth() - 1);
        let month = (now.getMonth() + 1).toString();

        return now.getFullYear() + '.' + (month[1] ? month : "0" + month[0]);
    }

    _redirectHandler (path) {
        /*let homeThis = StorageData.get('homeThis');
        if (homeThis)
        {
            homeThis.env.nextPath = path;
        }*/
        hashHistory.push(path);
    };

    GetTitle () {
        let title;
        
        this.dataSource.dateList.map((entry) => {
            if (this.dataSource.date.interval == entry.value)
                title = entry.text;
        });

        return 'Total Registration Devices (' + title + ')';
    };

    dataUpdate () {
        this.doFetch();
    };
    doFetch () {
        let result;
        let res;

        /*this.setState({ isDoughnutLoading: true });
        result = RegDevAPI.attachpie(this.formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.actDevice = source.data;    
            }       
            this.setState({isDoughnutLoading: false});
        });
        */

        this.setState({ isDoughnutLoading: true });
        this.setState({isLoading: true});
        result = RegDevAPI.attachset(this.formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData(source.data);    
            }       
            this.setState({isDoughnutLoading: false});
            this.setState({isLoading: false});
        });
    };

    resolveFetchData (source) {
        this.lineData.rowlabels = [];
        this.lineData.dataUnits = [];
        this.tableData = [];
        this.actDevice = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        source.map((entry) => {
            let value = [];
            let total = 0;
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData.rowlabels.includes(time))
                        this.lineData.rowlabels.push(time);
                    
                    total += parseInt(entry.count);
                    value.push(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17
                    
                    if(!this.lineData.rowlabels.includes(time))
                        this.lineData.rowlabels.push(time);
                    
                    total += parseInt(entry.count);
                    value.push(entry.count);
                });
            }
            this.lineData.dataUnits.push({name: FunctionJS.changeModelName(entry.model), data: value});
            this.actDevice.push({val: total, model:entry.model});
        });
    };
    /*resolveFetchData (source) {
        this.lineData.rowlabels = [];
        this.lineData.dataUnits = [];
        this.tableData = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        source.map((entry) => {
            let value = [];
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData.rowlabels.includes(time))
                        this.lineData.rowlabels.push(time);
                    
                    value.push(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17

                    if(!this.lineData.rowlabels.includes(time))
                        this.lineData.rowlabels.push(time);
                    
                    value.push(entry.count);
                });
            }
            this.lineData.dataUnits.push({name: FunctionJS.changeModelName(entry.model), data: value});
        });

        this.lineData.rowlabels.map((time, index) => {
            let obj = {};
            obj['title'] = time;
            obj['dataUnits'] = [];
            this.lineData.dataUnits.map((entry) => {
                let tableObj = {};
                tableObj['name'] = entry.name;
                tableObj['number'] = entry.data[index];
                obj['dataUnits'].push(tableObj);
            });
            this.tableData.push(obj);
        });
        this.tableData.reverse();
    };*/

    _setDataSourceType () {
        let type = ReactDOM.findDOMNode(this.refs['dataSourceType']).value;
        this.dataSource.type = type;
        this.formData.fetch = type;
        this.dataUpdate();
    };
    _setDataSourceInterval () {
        let interval = parseInt(ReactDOM.findDOMNode(this.refs['dataSourceInterval']).value);
        this.dataSource.date.interval = interval;
        this.formData.timeslot = interval;
        this.dataUpdate();
    };
};

export default RegistrationDevice;