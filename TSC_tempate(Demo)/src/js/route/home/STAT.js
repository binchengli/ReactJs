import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';
import {
    Panel, Grid, Row, Col, Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* server API */
import ServerAPI from '../../backendAPI/server.js';
import StorageAPI from '../../backendAPI/StoragePlan.js';
import RegDevAPI from '../../backendAPI/RegDevice.js';
import ActivateDevAPI from '../../backendAPI/ActivateDevice.js';
import DeactivateDevAPI from '../../backendAPI/DeactivateDevice.js';

/* component */
import PageTitile from '../../component/pageTitle.js';
import LineChart from '../../component/lineChart.js';
import PercentBar from '../../component/percentBar.js';

import ReactTooltip from 'react-tooltip'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

/* common */
import FunctionJS from '../../common/functionJS.js';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAttDevLoading: false, 
            isStoragePlanLoading: false,
            isActDevLoading: false, 
            isDeaDevLoading: false,
            isAttDevLoading2: false, 
            isActDevLoading2: false, 
            isDeaDevLoading2: false
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
                {text: '14 Days', value: 14},
                {text: '30 Days', value: 30},
                {text: '60 Days', value: 60},
                {text: '90 Days', value: 90}
            ]
        };
        this.timeSlot = [];
        this.lineData_AttDev = {
            rowlabels: [],
            dataUnits: []
        };
        this.lineData_StorageDev = {
            rowlabels: [],
            dataUnits: []
        };
        this.lineData_ActDev = {
            rowlabels: [],
            dataUnits: []
        };
        this.lineData_DeaDev = {
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
        this.AttDev_formData = {
            timeslot: 7,
            timezone: 0
        }
        this.StoragePlan_formData = {
            timeslot: 7,
            fetch: "All",
            timezone: 0
        }
        this.ActDev_formData = {
            timeslot: 7,
            timezone: 0
        }
        this.DeaDev_formData = {
            timeslot: 7,
            timezone: 0
        }
        this.TotalNum = {
            reg: 0,
            activate: 0,
            deactivate: 0
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

    render () {        
        return (
            <Grid id='other_blank' fluid>
                <Row>
                    <Col md={12}>
                         <PageTitile text={`${'Sales Statistics'}`} />
                    </Col>
                </Row>  
                <Row md={2} style={{'font-size': '20', 'text-align': 'right', 'padding-top': '10px', 'margin-right': '10px'}}>
                Last 7 days  
                </Row>  
                         
                <Row>
                    <Col md={6}>
                        <Panel>       
                            <div>
                                <span className="linegraphTitle">
                                    Registration Devices&nbsp;
                                </span>
                                <span className="clickable" data-tip="Registration Devices Infomation">                                
                                    <FontAwesome name = "question-circle" className='clickable'/><ReactTooltip place="right" type="warning" effect="float"/>                   
                                </span>
                                <div className="linegraphTitle">
                                    {!this.state.isAttDevLoading2 ? "Total : " + this.AddDot(this.TotalNum.reg) : "Loading ..."}
                                </div>
                            </div>                   
                            <LineChart
                                Rowlabels={this.lineData_AttDev.rowlabels}
                                DataUnits={this.lineData_AttDev.dataUnits}
                                isLoading={this.state.isAttDevLoading}
                            />
                            <div style={{'text-align':'right'}}>
                                <Button onClick={()=>{this._redirectHandler('/home/statistic/registrationdevices');}} bsStyle="success">more</Button>
                            </div>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <Panel>
                            <div>
                                <span className="linegraphTitle">
                                    Storage Plan&nbsp;
                                </span>
                                <span className="clickable" data-tip="Storage Plan Infomation">                                
                                    <FontAwesome name = "question-circle" className='clickable'/><ReactTooltip place="right" type="warning" effect="float"/>                   
                                </span>
                                <div className="linegraphTitle">
                                &nbsp;
                                </div>
                            </div>
                            <PercentBar
                                Rowlabels={this.lineData_StorageDev.rowlabels}
                                DataUnits={this.lineData_StorageDev.dataUnits}
                                isLoading={this.state.isStoragePlanLoading}
                            />
                            <div style={{'text-align':'right'}}>
                                <Button onClick={()=>{this._redirectHandler('/home/statistic/storageplan');}} bsStyle="success">more</Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Panel>
                            <div>
                                <span className="linegraphTitle">
                                    Activate Devices&nbsp;
                                </span>
                                <span className="clickable" data-tip="Activate Devices Infomation">                                
                                    <FontAwesome name = "question-circle" className='clickable'/><ReactTooltip place="right" type="warning" effect="float"/>                   
                                </span>
                                <div className="linegraphTitle">
                                    {!this.state.isActDevLoading2 ? "Total : " + this.AddDot(this.TotalNum.activate) : "Loading ..."}
                                </div>
                            </div> 
                            <LineChart
                                Rowlabels={this.lineData_ActDev.rowlabels}
                                DataUnits={this.lineData_ActDev.dataUnits}
                                isLoading={this.state.isActDevLoading}
                            />
                            <div style={{'text-align':'right'}}>
                                <Button onClick={()=>{this._redirectHandler('/home/statistic/activateddevices');}} bsStyle="success">more</Button>
                            </div>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <Panel>
                            <div>
                                <span className="linegraphTitle">
                                    Deactivate Devices&nbsp;
                                </span>
                                <span className="clickable" data-tip="Deactivate Devices Infomation">                                
                                    <FontAwesome name = "question-circle" className='clickable'/><ReactTooltip place="right" type="warning" effect="float"/>                   
                                </span>
                                <div className="linegraphTitle">
                                    {!this.state.isDeaDevLoading2 ? "Total : " + this.AddDot(this.TotalNum.deactivate) : "Loading ..."}
                                </div>
                            </div> 
                            <LineChart
                                Rowlabels={this.lineData_DeaDev.rowlabels}
                                DataUnits={this.lineData_DeaDev.dataUnits}
                                isLoading={this.state.isDeaDevLoading}
                            />
                            <div style={{'text-align':'right'}}>
                                <Button onClick={()=>{this._redirectHandler('/home/statistic/deactivateddevices');}} bsStyle="success">more</Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    };

    AddDot (num) {
        var numStr = num.toString();
        var retStr = "";
    
        for (let i = 0; i < numStr.length; i++)
        {
            retStr += numStr[i];
    
            if ((numStr.length - i - 1) % 3 == 0 && i != numStr.length - 1)
                retStr += ",";
        }
    
        return retStr;
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
        let res;
        
        // Attached Device
        this.setState({isAttDevLoading: true});
        this.setState({ isAttDevLoading2: true });
        result = RegDevAPI.attachset(this.AttDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData_AttDev(source.data);  
                this.setState({isAttDevLoading: false});  
                this.setState({isAttDevLoading2: false});
            }             
        });

        /*this.setState({ isAttDevLoading2: true });
        result = RegDevAPI.attachpie(this.AttDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.TotalNum.reg = this.GetTotal("reg", source.data);    
                this.setState({isAttDevLoading2: false});
            }       
        });*/

        // Storage Plan
        this.setState({isStoragePlanLoading: true});

        result = StorageAPI.planlist(this.StoragePlan_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData_StoragePlan(source.data); 
                this.setState({isStoragePlanLoading: false});   
            }             
        });

        // Activate Device
        this.setState({isActDevLoading: true});
        this.setState({ isActDevLoading2: true });
        result = ActivateDevAPI.activateset(this.ActDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData_ActDev(source.data);   
                this.setState({isActDevLoading: false}); 
                this.setState({isActDevLoading2: false});
            }          
        });

        /*this.setState({ isActDevLoading2: true });
        result = ActivateDevAPI.activatepie(this.ActDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.TotalNum.activate = this.GetTotal("activate", source.data);    
                this.setState({isActDevLoading2: false});
            }            
        });*/

        // Deactivate Device
        this.setState({isDeaDevLoading: true});
        this.setState({ isDeaDevLoading2: true });
        result = DeactivateDevAPI.deactivateset(this.DeaDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.resolveFetchData_DeaDev(source.data);    
                this.setState({isDeaDevLoading: false});
                this.setState({isDeaDevLoading2: false});  
            }            
        });

        /*this.setState({ isDeaDevLoading2: true });
        result = DeactivateDevAPI.deactivatepie(this.DeaDev_formData);
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            {
                this.TotalNum.deactivate = this.GetTotal("deactivate", source.data); 
                this.setState({isDeaDevLoading2: false});   
            }       
        });*/
    };

    GetTotal(type, source) {     
        let total;
        if (type == "reg")
            total = this.TotalNum.reg;
        else if (type == "attach") 
            total = this.TotalNum.activate;
        else
            total = this.TotalNum.deactivate;

        total = 0;
        source.map((entry) => {
            total += parseInt(entry.val);
        });

        return total;
    }

    resolveFetchData_AttDev (source) {
        this.lineData_AttDev.rowlabels = [];
        this.lineData_AttDev.dataUnits = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        let total = 0;
        source.map((entry) => {
            let value = [];
            
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData_AttDev.rowlabels.includes(time))
                        this.lineData_AttDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17

                    if(!this.lineData_AttDev.rowlabels.includes(time))
                        this.lineData_AttDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            this.lineData_AttDev.dataUnits.push({name: FunctionJS.changeModelName(entry.model), data: value});      
        });
        this.TotalNum.reg = total;
    };

    resolveFetchData_StoragePlan (source) {
        this.lineData_StorageDev.rowlabels = [];
        this.lineData_StorageDev.dataUnits = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        source.map((entry) => {
            let value = [];
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData_StorageDev.rowlabels.includes(time))
                        this.lineData_StorageDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17

                    if(!this.lineData_StorageDev.rowlabels.includes(time))
                        this.lineData_StorageDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                });
            }
            this.lineData_StorageDev.dataUnits.push({name: entry.plan, data: value});
        });
    };

    resolveFetchData_ActDev (source) {
        this.lineData_ActDev.rowlabels = [];
        this.lineData_ActDev.dataUnits = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        let total = 0;
        source.map((entry) => {
            let value = [];
            
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData_ActDev.rowlabels.includes(time))
                        this.lineData_ActDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17

                    if(!this.lineData_ActDev.rowlabels.includes(time))
                        this.lineData_ActDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            this.lineData_ActDev.dataUnits.push({name: FunctionJS.changeModelName(entry.model), data: value});   
        });
        this.TotalNum.activate = total;
    };

    resolveFetchData_DeaDev (source) {
        this.lineData_DeaDev.rowlabels = [];
        this.lineData_DeaDev.dataUnits = [];

        // 當取得的資料不足設定天數時，自動補足
        FunctionJS.datasetFormat(source, this.dataSource.date.interval);

        let total = 0;
        source.map((entry) => {
            let value = [];
            if(this.dataSource.date.interval == 1)
            {
                entry.list.shift();
                entry.list.map((entry) => {
                    let time = entry.timestamp.split('T')[1].split('+')[0].split(':')[0] + ':' + entry.timestamp.split('T')[1].split('+')[0].split(':')[1];

                    if(!this.lineData_DeaDev.rowlabels.includes(time))
                        this.lineData_DeaDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            else
            {
                entry.list.map((entry) => {
                    // 2019-03-17T23:00:00Z
                    let time = entry.timestamp.split('T')[0];//2019-03-17

                    if(!this.lineData_DeaDev.rowlabels.includes(time))
                        this.lineData_DeaDev.rowlabels.push(time);
                    
                    value.push(entry.count);
                    total += parseInt(entry.count);
                });
            }
            this.lineData_DeaDev.dataUnits.push({name: FunctionJS.changeModelName(entry.model), data: value});       
        });
        this.TotalNum.deactivate = total;
    };
};

export default Statistic;