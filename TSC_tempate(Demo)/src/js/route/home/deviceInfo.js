import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form,Panel
} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import DeviceAPI from '../../backendAPI/DeviceAPI.js';

/* component */
import PageTitile from '../../component/pageTitle.js';
/* route */


/* common */
import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';

class DeviceInfo extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
            isDataLoading: false,
            devname: '',
            status: '',
            model: '',
            mac: '',
            devid: '',
            owner:''
        };
        this.formData = {
            refreshTime: 5
        };
        this.deviceInfoData = [];
        this.env = {
            
        };
        
        this.options = [
            {
                index: 0,
                text: 'Suspend',
                isSelect: true
            },
            {
                index: 1,
                text: 'Resume',
                isSelect: false
            }
        ];
    };
    componentDidMount () {
        let deviceID = StorageData.get('DeviceID');
        
        
        this.doFetch(deviceID);
    };
    componentWillReceiveProps (nextProps) {
        
    };

    dataUpdate () {
        
    };

    doFetch (deviceID) {
        let result;
        // let res;
        this.setState({isLoading: true});

            result = DeviceAPI.device_info(deviceID);
            result.then((res) => 
            {
                // console.log(res,'============')
                console.log("getSettings res="+JSON.stringify(res));
                if(res)
                { 
                     if(res.data==null)
                    {
                        //  this.resolveFetchData_DeviceInfo(res.data);
                    }else
                    {
                        console.log(res.data[0].devname,'============devname')
                        this.setState({
                            devname:res.data[0].devname,
                            status:res.data[0].status,
                            model:res.data[0].model,
                            mac:res.data[0].mac,
                            devid:res.data[0].devid,
                            owner:res.data[0].owner,
                            isLoading:false
                        });
                    }
                    // this.setState({ isLoading: false });
                }
                else
                {
                    // if(res&&res.message)alert(res.message);
                    // else
                    // alert('get Account List Fail.');
                    this.setState({ isLoading: false });
                }

           });
    };


    render () {
        return (
            <Grid fluid>
                 
                <Row >
                    <Col md={12}>
                        {/* <PageTitile text={`${Lang.showText(54)}/${Lang.showText(40)}`} /> */}
                        <PageTitile text={`${'Device Manage'}/${'Device infomation'}`} />
                    </Col>
                </Row>
                <Row  className='general-panel'  >
                    <Panel >
                <Row>
                    <Col md={12}>
                        <div className='general-panel'>   
                        <Col md={1} style={{'padding-left':'0%'}}>
                            {/* <FontAwesome name='times-circle' size='2x' onClick={() => {this._redirectHandler('/home/device');}} className='settings-icon' style={{'padding-right':'3%'}}/> */}
                            <Button onClick={()=>{this._redirectHandler('/home/device');}} bsStyle="success">
                                            <FontAwesome name = "reply" className='clickable' size='lg' onClick={() => {this._redirectHandler('/home/device');}}/>                          
                                        </Button>
                            
                           
                                        </Col>
                            {/* <div className='general-panel-title'>
                                <h3>{Lang.showText(40)}</h3>
                            </div> */}
                            <div className='general-panel-content'>
                                <Form horizontal>
                                <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Name:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.devname}
                                         </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Account:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.owner}</Col>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Status:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.status}</Col>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Model:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.model}</Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Mac:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.mac}</Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Device ID:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{this.state.devid}</Col>
                                        
                                    </FormGroup>
                                    {/* <FormGroup>
                                        <Col componentClass={ControlLabel} md={3}>{`Attached Date:`}</Col>
                                        <Col style={{'text-align':'left','font-fontweight':'10', 'display':'table-cell','vertical-align': 'middle','padding-top':'7px'}}  md={3}>{}</Col>
                                        
                                    </FormGroup> */}
                                </Form>
                            </div>
                            <div className="btn-group" role="group" style={{'padding-left': "0px", 'margin-top':'18px'}}>
                                {
                                    this.options.map((option) => {
                                        return (
                                            <Button 
                                                title = {option.text}
                                                onClick = {() => this.onSelectTypeChange(option.index)}
                                                bsStyle={this.options[option.index].isSelect ? "success" : "default"}
                                            >
                                                <option>{option.text}</option>
                                            </Button >
                                        );
                                    })
                                }
                                </div>

                        </div>
                    </Col>
                </Row>
                </Panel>
                </Row>
            </Grid>
        );
    };

    onSelectTypeChange(index) {
        this.options.map((option) => {
            option.isSelect = index == option.index ? true : false;
        });

        this.setState({isRefresh: false});
    }


    _redirectHandler (path) {
        let homeThis = StorageData.get('homeThis');
        if (homeThis)
        {
            homeThis.env.nextPath = path;
        }
        hashHistory.push(path);
    };

};

export default DeviceInfo;