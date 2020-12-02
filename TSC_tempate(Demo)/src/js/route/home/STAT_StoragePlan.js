import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Panel, Grid, Row, Col, FormControl, Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* server API */
import ServerAPI from '../../backendAPI/server.js';
import StorageAPI from '../../backendAPI/StoragePlan.js';

/* component */
import PageTitile from '../../component/pageTitle.js';
import PercentBar from '../../component/percentBar.js';
import LineChart from '../../component/lineChart.js';

import { hashHistory } from 'react-router';

/* common */
import FunctionJS from '../../common/functionJS.js';

class StoragePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectorLoading: false,
            isLoading: false,
            linechartExpand: true,
            detailExpand: false
        };
        this.dataSource = {
            typeList: [{text: 'All', value: 999}],
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
        this.countDownInterval;

        this.timeSlot = [];
        this.lineData = {
            rowlabels: [],
            dataUnits: []
        };
        this.columnLabels = {
            name: {text: 26},
            number: {text: 27}
        };
        this.tableData = [];
        this.env = {
            project: ''
        };
        this.formData = {
            timeslot: 7,
            fetch: "All",
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
        this.state.refreshTimer = 60 * ReactDOM.findDOMNode(this.refs[`widgetInterval`]).value;
        this.countDownInterval = setInterval(()=>{this._checkCountDownTime()}, 1000)
    };

    componentWillUnmount () {
        // stop refresh event
        clearInterval(this.countDownInterval);
    };

    render () {      
        return (
            <Grid id='other_blank' fluid>
                <Row>
                    <Col md={12}>
                         <PageTitile text={`${'Sales Statistics'}/${'Storage Plan'}`} />
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
                    <Col md={2} className='data-source-selector'>
                        <FormControl 
                            componentClass='select' 
                            onChange={() => {this._setDataSourceType();}} 
                            ref='dataSourceType' 
                            disabled={this.state.isLoading}
                        >
                            {
                                this.dataSource.typeList.map((entry) => (
                                    <option value={entry['value']} selected={(this.dataSource.type == entry.value)?true:false}>{entry['text']}</option>
                                ))
                            }
                        </FormControl>
                    </Col>                  
                </Row>
                <Row>                   
                    <Col md={12}>
                        <Panel collapsible expanded={this.state.linechartExpand} 
                            className='general-expand-panel'
                        >
                            <div className='linegraphTitle'>Storage Plan</div>
                            <PercentBar
                                Rowlabels={this.lineData.rowlabels}
                                DataUnits={this.lineData.dataUnits}
                                isLoading={this.state.isLoading}
                            />
                            <div className='login-wrapper'></div>
                            <div className='login-wrapper'></div>
                            <div className='login-wrapper'></div>
                            <div className='login-wrapper'></div>
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

    dataUpdate () {
        this.doFetch();
    };

    doFetch () {
        let result;

        this.setState({isSelectorLoading: true});
        result = StorageAPI.allplans();
        result.then((res) => {
            this.resolveTypeData(res.modelList);
            this.setState({ isSelectorLoading: false });
        });

        // Storage Plan      
        this.setState({isLoading: true});
        result = StorageAPI.planlist(this.formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData(source.data); 
                this.setState({isLoading: false});   
            }
        });
    };

    resolveFetchData (source) {
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
            this.lineData.dataUnits.push({name: entry.plan, data: value});
        });
    };

    _setDataSourceType () {
        let type = ReactDOM.findDOMNode(this.refs['dataSourceType']).value;
        this.dataSource.type = type;
        this.formData.fetch = type == 999 ? "All" : type;
        this.dataUpdate();
    };

    resolveTypeData (source) {
        this.dataSource.typeList = [{text: 'All', value: 999}];
        source.map((entry) => {
            let cell = {text: '', value: ''};
            cell.value = entry;
            cell.text = FunctionJS.changeModelName(entry);
            if (cell.text != "GDP")
                this.dataSource.typeList.push(cell);
        });
    };

    _setDataSourceInterval () {
        let interval = parseInt(ReactDOM.findDOMNode(this.refs['dataSourceInterval']).value);
        this.dataSource.date.interval = interval;
        this.formData.timeslot = interval;
        this.dataUpdate();
    };
};

export default StoragePlan;