import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Panel, Grid, Row, Col, FormControl, Table, DropdownButton, MenuItem, Pagination, Button ,Form
} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

/* component */
import PageTitile from '../../component/pageTitle.js';
import ServerAPI from '../../backendAPI/server.js';
import DeviceAPI from '../../backendAPI/DeviceAPI.js';

/* common */
// import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';
// import MulitLangFile from '../../common/multiLang.js';

class DeviceTransfer extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
            placeholder: 'ID',
            activePage:1,
            uuid_A:'',
            uuid_B:''
        };
        this.dataSource = {
            type: 1,
            devId: '',
            date: {
                interval: 2,
                startDay: 0,
                endDay: 0
            },
            dateList: [],
            opratorListA:[],
            operatorA:'',
            opratorListB:[],
            operatorB:''
            
        };
        this.tableParamsA = {
            headerLength: 0,
            matchAll: false,
            searchedCount: 1,
            searchedTag: [],
            sortedOrder: [],
            dataPerPage: 10,
            lastPage: 1,
            resultData:[]
        };
        this.tableParamsB = {
            headerLength: 0,
            matchAll: false,
            searchedCount: 1,
            searchedTag: [],
            sortedOrder: [],
            dataPerPage: 10,
            lastPage: 1,
            resultData:[]
        };
        this.tableHeaderA = {
            devname: {show: true, text: 'Device Name'},
            model: {show: true, text: 'Model'},
            mac: {show: true, text: 'Mac'}

        };
        this.tableHeaderB = {
            devname: {show: true, text: 'Device Name'},
            model: {show: true, text: 'Model'},
            mac: {show: true, text: 'Mac'}

        };
        this.tableDataA = [];
        this.firstTableDataA = [];
        this.tableDataB = [];
        this.firstTableDataB = [];
        this.env = {
            project: ''
        };
    };
    componentDidMount () {
        console.log('----------componentDidMount----------------');
        this.login=JSON.parse(ServerAPI.getLoginInfo());
        

        console.log('UUID=======',this.login.uuid,'=========');
        console.log('server componentDidMount', 'this.props.params.project =', this.props.params.project);
        this.env.project = this.props.params.project;
        this.dataUpdate();

        console.log(data);

    };
    componentWillReceiveProps () {
        console.log('----------componentWillReceiveProps----------------');
    };
    render () {
        this.tableRefreshA();
        this.tableRefreshB();
        return (
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <PageTitile text={`${'Device Manage'}/${'Device Transfer'}`} />
                    </Col>
                </Row>
                    <Row style={{'margin-bottom': '30px'}}>
                    </Row>
                <Row>
                    <Col md={12}>
                        <div className='general-panel'>        
                                <Row>                                    
                                    <Col md = {1}>
                                        <Row style={{'padding-left':'35%','padding-right':'0%','padding-top':'18%'}}>
                                            <div className='general-panel-content'>
                                                <label >
                                                    Operator   
                                                </label>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col md={4}>
                                        <div className='general-panel-content'>
                                            <Row style={{'padding-left':'5%','padding-right':'2%','padding-top':'3%'}}>
                                                <FormControl 
                                                    componentClass='select' 
                                                    onChange = {this._setOpratorA.bind(this)}
                                                    ref='selectOpratorA' 
                                                    // value = {this.state.uuid_A}
                                                    disabled={this.state.isLoading}
                                                    >
                                                    {this.selectOpratorListA()}
                                                </FormControl>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col md={2}style={{'paddingTop':'1%'}}>
                                        <Row style={{'padding-left':'45%'}} >
                                            <FontAwesome name='long-arrow-right' size='3x'/>
                                        <Row md={4} style={{'padding-left':'5%'}}>
                                            <label >
                                            Transfer
                                            </label>
                                        </Row>
                                        </Row>
                                        
                                    </Col>
                                    <Col md = {1}>
                                        <Row style={{'padding-left':'10%','padding-right':'0%','padding-top':'18%'}}>
                                            <div className='general-panel-content'>
                                                <label >
                                                    Operator   
                                                </label>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col md={4}>
                                        <div className='general-panel-content'>
                                            <Row style={{'padding-left':'0%','padding-right':'6%','padding-top':'3%'}}>
                                                <FormControl 
                                                    componentClass='select' 
                                                    placeholder = '---------------'
                                                    onChange={this._setOpratorB.bind(this)}
                                                    ref='selectOpratorB' 
                                                    // value = {this.state.uuid_B}
                                                    disabled={this.state.isLoading}
                                                    >
                                                    {this.selectOpratorListB()}
                                                </FormControl>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Col md={5}>
                                    <div className='general-panel-content'>
                                        <Row style={{'overflow':'auto'}}>
                                            {this.showTableA()}
                                        </Row>
                                    </div>
                                 </Col>
                                <Col md={2}>
                                <div className='general-panel-content'>
                                    
                                </div>
                                <div className='general-panel-content'>
                                    
                                </div>
                                <div className='general-panel-content'>
                                {/* <div style={{'width': '500px', 'margin-right':'5px', 'display': 'inline-flex'}}> */}
                                <div style={{'border-color':'gray','border-style':'solid','border-width':'1px','cursor': 'pointer','margin': '0px auto','width':'100px','text-align':'center'}} onClick={()=>{this._selectAllDevice()}}>
                                        <Row md={4} style={{'padding-right':'15%'}}>
                                            <FontAwesome name='long-arrow-right' size='3x' className='settings-icon' />
                                        </Row>
                                        <Row md={4} >
                                            <label style={{'cursor': 'pointer'}}>
                                            <font size="2">Select All </font>
                                            </label>
                                        </Row>
                                    </div>
                                <div style={{'border-color':'gray','border-style':'solid','border-width':'1px','cursor': 'pointer','margin': '0px auto','width':'100px','text-align':'center'}} onClick={()=>{this._selectDevice()}}>
                                    <Row md={3} style={{'padding-right':'15%'}}>
                                        <FontAwesome name='long-arrow-right' size='3x' className='settings-icon' />
                                    </Row>
                                    <Row md={4}>
                                    <label style={{'cursor': 'pointer'}}>
                                    <font size="2">select</font>
                                    </label>
                                    </Row>
                                </div>
                                </div>
                                <div className='general-panel-content'>
                                    
                                </div>
                                <div className='general-panel-content'>
                                    <div style={{'border-color':'gray','border-style':'solid','border-width':'1px','cursor': 'pointer','margin': '0px auto','width':'100px','text-align':'center'}} onClick={()=>{this._cancelAllDevice()}}>
                                        <Row md={3} style={{'padding-right':'18%'}}>
                                            <FontAwesome name='long-arrow-left' size='3x' className='settings-icon' />
                                        </Row>
                                        <Row md={3}>
                                            <label style={{'cursor': 'pointer'}}>
                                            <font size="2">Cancel All</font>
                                            </label>
                                        </Row>
                                    </div>
                                    <div style={{'border-color':'gray','border-style':'solid','border-width':'1px','cursor': 'pointer','margin': '0px auto','width':'100px','text-align':'center'}} onClick={()=>{this._cancelDevice()}}>
                                        <Row md={3} style={{'padding-right':'18%'}}>
                                            <FontAwesome name='long-arrow-left' size='3x' className='settings-icon' />
                                        </Row>
                                        <Row md={3}>
                                            <label style={{'cursor': 'pointer'}}>
                                                <font size="2">Cancel</font>
                                            </label>
                                        </Row>
                                    </div>
                                </div>
                                {/* <div className='general-panel-content'> */}
                                    
                                {/* </div> */}
                                    
                                    
                                   
                                     
                                 </Col>
                                <Col md={5}>
                                    <div className='general-panel-content'>
                                        <Row style={{'overflow':'auto'}}>
                                             {this.showTableB()}
                                        </Row>
                                     </div>
                                 </Col>
                                <div className='general-panel-footer'>
                                    <Col md={3} mdOffset={10}>
                                        <div>
                                            <Button onClick={()=>{this._submitHandler('submit');}} bsStyle="success">Submit</Button>
                                        </div>
                                    </Col>
                                </div>           
                                 
                         </div>
                             
                        </Col>
                        
                </Row>
                
                
                
                
            </Grid>
        );
    };
    _submitHandler (type) {
        
    };
    genUuid () {
        let d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function')
        {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    dataUpdate () {
        this.doFetch();
    };
    doFetch () {
        let result;
        let res;
        this.setState({isLoading: true});
        
            result = DeviceAPI.dev_account_list(this.login.uuid);
            result.then((res) => 
            {
               if(res)
               { 
                    if(res.data==null)
                   {
                        this.resolveFetchData(res.data);
                   }else
                   {
                        this.resolveFetchData(res.data);
                   }
                   this.setState({ isLoading: false });
               }
               else
               {
                   if(res&&res.message)alert(res.message);
                   else
                   alert('get Account List Fail.');
                   this.setState({ isLoading: false });
               }
           });
        


        
    };
    resolveFetchData (source) {
        let data = source.slice(0);
        
        this.dataSource.opratorListA = source.slice(0);
        this.dataSource.operatorA = this.dataSource.opratorListA[0].operatorA;
        this.dataSource.opratorListB = source.slice(0);
        this.dataSource.operatorB = this.dataSource.opratorListB[1].operatorB;


    };
    initTableA (data) {
        data.map((entry, index) => {
            this.tableParamsA.searchedTag[index] = 1;
            this.tableParamsA.sortedOrder[index] = index;
        });
        this.tableParamsA.searchedCount = 1;
        this.tableParamsA.matchAll = false;
    };
    initTableB (data) {
        data.map((entry, index) => {
            this.tableParamsB.searchedTag[index] = 1;
            this.tableParamsB.sortedOrder[index] = index;
        });
        this.tableParamsB.searchedCount = 1;
        this.tableParamsB.matchAll = false;
    };
    tableRefreshA () {
        this.tableParamsA.resultData = [];
        let countLengthA = 0;
        let dataA = this.tableDataA.slice(0);

        dataA.map((entry, index) => {
            if (this.tableParamsA.matchAll)
            {
                if (this.tableParamsA.searchedCount == this.tableParamsA.searchedTag[index])
                {
                    this.tableParamsA.resultData[countLengthA] = this.tableParamsA.sortedOrder[index];
                    countLengthA++;
                }
            }
            else
            {
                if (0 < this.tableParamsA.searchedTag[index])
                {
                    this.tableParamsA.resultData[countLengthA] = this.tableParamsA.sortedOrder[index];
                    countLengthA++;
                }
            }
        });

    }
    tableRefreshB () {
        
        this.tableParamsB.resultData = [];
        
        let countLengthB = 0;
        
        let dataB = this.tableDataB.slice(0);
        
        
        dataB.map((entry, index) => {
            if (this.tableParamsB.matchAll)
            {
                if (this.tableParamsB.searchedCount == this.tableParamsB.searchedTag[index])
                {
                    this.tableParamsB.resultData[countLengthB] = this.tableParamsB.sortedOrder[index];
                    countLengthB++;
                }
            }
            else
            {
                if (0 < this.tableParamsB.searchedTag[index])
                {
                    this.tableParamsB.resultData[countLengthB] = this.tableParamsB.sortedOrder[index];
                    countLengthB++;
                }
            }
        });
    };

    showTableA () {
        let content = [];
        content.push(
            <Col md={12}>
                <Table striped bordered hover>
                    {this.showTableHeaderA()}
                    {this.showTableBodyA()}
                </Table>
            </Col>
        );
        return content;
    };
    showTableB (){
        let content = [];
        content.push(
            <Col md={12}>
                <Table striped bordered hover>
                    {this.showTableHeaderB()}
                    {this.showTableBodyB()}
                </Table>
            </Col>
        );
        return content;
    }
    showTableHeaderA () {
        let content = [];
        let count = 0;
        content.push(
            <thead>
                <tr style={{'background-color':'#2a3f54',color:'white'}}>
                    {
                        Object.keys(this.tableHeaderA).map((entry) => {
                            let content_th = [];
                            switch (entry)
                            {
                                case 'devname':
                                case 'model':
                                    content_th.push(
                                        <th style={{'text-align':"left"}}>{(this.tableHeaderA[entry].text)}
                                            {/* <FontAwesome name='sort' size='1x' style={{'padding-left':'10px'}}/> */}
                                         </th>
                                    );
                                    break;
                                    case 'mac':
                                    content_th.push(
                                        <th style={{'text-align':"left"}}>{(this.tableHeaderA[entry].text)}
                                            {/* <FontAwesome name='sort' size='1x' style={{'padding-left':'10px'}}/> */}
                                        </th>
                                    );
                                    break;
                               
                            };
                            count++;
                            return content_th;
                        })
                    }
                </tr>
            </thead>
        );
        this.tableParamsA.headerLength = count;
        return content;
    };
    showTableHeaderB () {
        let content = [];
        let count = 0;
        content.push(
            <thead>
                <tr style={{'background-color':'#2a3f54',color:'white'}}>
                    {
                        Object.keys(this.tableHeaderB).map((entry) => {
                            let content_th = [];
                            switch (entry)
                            {
                                case 'devname':
                                case 'model':
                                    content_th.push(
                                        <th style={{'text-align':"left"}}>{(this.tableHeaderB[entry].text)}
                                            {/* <FontAwesome name='sort' size='1x' style={{'padding-left':'10px'}}/> */}
                                        </th>
                                    );
                                    break;
                                    case 'mac':
                                    content_th.push(
                                        <th style={{'text-align':"left"}}>{(this.tableHeaderB[entry].text)}
                                            {/* <FontAwesome name='sort' size='1x' style={{'padding-left':'10px'}}/> */}
                                        </th>
                                    );
                                    break;
                               
                            };
                            count++;
                            return content_th;
                        })
                    }
                </tr>
            </thead>
        );
        this.tableParamsB.headerLength = count;
        return content;
    };
    showTableBodyA () {
        console.log('-----------',this.tableDataA);
        let data = this.tableDataA.slice(0);
        let contentIndex = this.tableParamsA.resultData.slice(0);
        let contentStart = (this.state.activePage-1) * this.tableParamsA.dataPerPage;
        let contentEnd = Math.min((this.state.activePage * this.tableParamsA.dataPerPage) , this.tableParamsA.resultData.length);
        let content = [];
        let index = 0, count = 0, tableInfo = [];
        for (let i=contentStart; i<contentEnd; i++)
        {
            index = contentIndex[i];
            tableInfo[count] = data[index];
            count++;
        }
        content.push(
            <tbody>
                {
                    tableInfo.map((entry) => {
                        let content_tr = [];
                        let checkOrNo;
                        if(entry.select=0){
                            checkOrNo=true;
                        }else
                        {
                            checkOrNo=false;
                        }
                        content_tr.push(
                            
                            <tr>
                            
                                {
                                    Object.keys(this.tableHeaderA).map((info) => {
                                        let content_td = [];
                                        switch (info)
                                        {
                                            case 'devname':
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}><input 
                                                    type='checkbox' 
                                                    checked={checkOrNo} 
                                                    onChange={this.changeState.bind(this,index)}
                                                    onClick={() => {this._selectHandler(entry);}} 
                                                /> {entry[info]}</td>
                                                );
                                                break;
                                                case 'model':
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}>{entry[info]}</td>
                                                    
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                                case 'mac':
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}>{entry[info]}</td>
                                                    
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                        };
                                        return content_td;
                                    })
                                }
                            </tr>
                        );
                        return content_tr;
                    })
                }
                {
                    (0 == tableInfo.length)? (<tr><td colSpan={this.tableParamsA['headerLength']} className='text-center'>{'No data'}</td></tr>) : []
                }
            </tbody>
        );
        return content;
    };
    showTableBodyB () {
        console.log('-----------',this.tableDataB);
        let data = this.tableDataB.slice(0);
        let contentIndex = this.tableParamsB.resultData.slice(0);
        let contentStart = (this.state.activePage-1) * this.tableParamsB.dataPerPage;
        let contentEnd = Math.min((this.state.activePage * this.tableParamsB.dataPerPage) , this.tableParamsB.resultData.length);
        let content = [];
        let index = 0, count = 0, tableInfo = [];
        for (let i=contentStart; i<contentEnd; i++)
        {
            index = contentIndex[i];
            tableInfo[count] = data[index];
            count++;
        }
        content.push(
            <tbody>
                {
                    tableInfo.map((entry) => {
                        let content_tr = [];
                        let checkOrNo;
                        if(entry.select=0){
                            checkOrNo=true;
                        }else
                        {
                            checkOrNo=false;
                        }
                        content_tr.push(
                            
                            <tr >
                            
                                {
                                    Object.keys(this.tableHeaderB).map((info) => {
                                        let content_td = [];
                                        switch (info)
                                        {
                                            case 'devname':
                                            if(entry.B==1){
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}>{entry[info]}</td>                                                
                                                );
                                            }else
                                            {
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}><input 
                                                    type='checkbox' 
                                                    checked={checkOrNo} 
                                                    onChange={this.changeState.bind(this,index)}
                                                    onClick={() => {this._selectHandler(entry);}} 
                                                /> {entry[info]}</td>
                                                );
                                            }
                                            
                                                break;
                                                case 'model':
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}>{entry[info]}</td>
                                                    
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                                case 'mac':
                                                content_td.push(
                                                    <td style={{'text-align':"left"}}>{entry[info]}</td>
                                                    
                                                );
                                                break;
                                        };
                                        return content_td;
                                    })
                                }
                            </tr>
                        );
                        return content_tr;
                    })
                }
                {
                    (0 == tableInfo.length)? (<tr><td colSpan={this.tableParamsB['headerLength']} className='text-center'>{'No data'}</td></tr>) : []
                }
            </tbody>
        );
        return content;
    };
    


    _setOpratorA (e) {
        console.log('----------------',e.target.value);

        let result;
            let res;
            this.setState({isLoading: true});

            result = DeviceAPI.dev_account_device_list(e.target.value);
            result.then((res) => {
               console.log("get All Device  res="+JSON.stringify(res));
               if(res)
               {
                    console.log("get All Device  res="+JSON.stringify());
                    if(res.data==null)
                   {
                        confirm('no data.');
                        this._setDeviceListA(res.data);
                   }else
                   {
                        // res.data.unshift(my);
                        // confirm('Get Success ');
                       this._setDeviceListA(res.data);
                       
                   }
                   this.setState({ isLoading: false });
               }
               else
               {
                   //alert('Current password invalid!');
                   if(res&&res.message)alert(res.message);
                   else
                   alert('get Account List Fail.');
                   this.setState({ isLoading: false });
               }
           });

        let opA = ReactDOM.findDOMNode(this.refs['selectOpratorA']).value;
        this.dataSource.operatorA = opA;
        this.setState(this.state);
    }
    _setOpratorB (e) {
        console.log('BBBBB----------------',e,'|||||||||');
        let result;
            let res;
            this.setState({isLoading: true});

            result = DeviceAPI.dev_account_device_list(e.target.value);
            result.then((res) => {
               console.log("get All Device  res="+JSON.stringify(res));
               if(res)
               {
                    console.log("get All Device  res="+JSON.stringify());
                    if(res.data==null)
                   {
                        confirm('no data.');
                        this._setDeviceListB(res.data);
                   }else
                   {
                        // res.data.unshift(my);
                        // confirm('Get Success ');
                       this._setDeviceListB(res.data);
                   }
                   this.setState({ isLoading: false });
               }
               else
               {
                   //alert('Current password invalid!');
                   if(res&&res.message)alert(res.message);
                   else
                   alert('get Account List Fail.');
                   this.setState({ isLoading: false });
               }
           });

        let opA = ReactDOM.findDOMNode(this.refs['selectOpratorB']).value;
        this.dataSource.operatorB = opA;
        this.setState(this.state);
    
    }
    _redirectHandler (path) {
        let homeThis = StorageData.get('homeThis');
        if (homeThis)
        {
            homeThis.env.nextPath = path;
        }
        hashHistory.push(path);
    };
    _selectAllDevice (){
        
        console.log('1111111',this.tableDataA);
        console.log('2222222',this.tableDataB);




        this.tableDataB = this.tableDataA.concat(this.tableDataB);


        this.tableDataA = [];
        
        
        console.log('4444444',this.tableDataB);
        this.initTableB(this.tableDataA);
        this.initTableB(this.tableDataB);

        this.setState(this.state);

    };
    _selectDevice ()
    {
        let dataA=[];
        let dataB=[];
        let searchinput = 'tansferSelect'
        let data = this.tableDataA.slice(0);
        console.log(data);

        data.map((entry)=> {
            if(entry.select==searchinput)
            {
                console.log(entry);
                dataB = dataB.concat(entry);
            }
            else
            {
                dataA = dataA.concat(entry);
            }
        });
        this.tableDataA = dataA;
        this.tableDataB = this.tableDataB.concat(dataB);

        // this.initTableA();

        this.initTableA(this.tableDataA);
        this.initTableB(this.tableDataB);

        this.setState(this.state);
    };
    _cancelDevice()
    {
        let dataA=[];
        let dataB=[];
        let searchinput = 'tansferSelect'
        let data = this.tableDataB.slice(0);
        console.log(data);

        data.map((entry)=> {
            if(entry.select==searchinput)
            {
                console.log(entry);
                dataA = dataA.concat(entry);
            }
            else
            {
                dataB = dataB.concat(entry);
            }
        });
        this.tableDataA = this.tableDataA.concat(dataA);
        this.tableDataB = dataB

        // this.initTableA();

        this.initTableA(this.tableDataA);
        this.initTableB(this.tableDataB);

        this.setState(this.state);
    };
    _cancelAllDevice()
    {

        let data = this.firstTableDataA.slice(0);


        console.log(data);

        this.tableDataA = this.firstTableDataA;
        this.tableDataB = this.firstTableDataB;
        
        this.initTableA(this.tableDataA);
        this.initTableB(this.tableDataB);

        this.setState(this.state);
    };
   
    
    _setDataSourceType () {
        
    };
    _setDataSourceDevId () {
        
    };
    _setDataSourceInterval () {
        
    };
  
    _setDeviceListA(source)
    {
        let dataArray = [];
        if(source)
        {
            let data = source.slice(0);
            data.map((entry, index) => {
                dataArray[index] = entry;
                dataArray[index]['select'] = 0;
                dataArray[index]['B'] = 0;
            });

            this.tableDataA = dataArray.slice(0);
        }else{
            this.tableDataA = dataArray;
        }
            
        this.firstTableDataA = dataArray;
        this.initTableA(dataArray);
    };
    _setDeviceListB(source)
    {
        let dataArray = [];
        if(source)
        {
            let data = source.slice(0);
            data.map((entry, index) => {
                dataArray[index] = entry;
                dataArray[index]['select'] = 0;
                dataArray[index]['B'] = 1;
            });

            this.tableDataB = dataArray.slice(0);
        }else
            this.tableDataB = dataArray;

        this.firstTableDataB = (dataArray)
        this.initTableB(dataArray);
    };
    selectOpratorListA () {
        let content = [<option disabled selected value></option>];
        if (this.dataSource.opratorListA.length)
        {
            this.dataSource.opratorListA.map((entry, index) => {
                
                content.push(<option value={entry['uuid']} selected={(this.dataSource.opratorListA == entry.opratorListA)?true:false}>{`${entry['userid']}`}</option>);
            });
        }
        else
        {
            content.push(<option disabled>Loading...</option>);
        }
        return content;
    };
    selectOpratorListB () {
        let content = [<option disabled selected value></option>];
        if (this.dataSource.opratorListB.length)
        {
            this.dataSource.opratorListB.map((entry, index) => {
                content.push(<option value={entry['uuid']} selected={(this.dataSource.opratorListB == entry.opratorListB)?true:false}>{`${entry['userid']}`}</option>);
            });
        }
        else
        {
            content.push(<option disabled>Loading...</option>);
        }
        return content;
    };
    _selectHandler(object)
    {
        if(object.select ==0)
        {
            object.select ='tansferSelect';
        }
        else{
            object.select =0;
        }
        console.log(object.select)
    }
    changeState(index){
        //修改時先將this.state.lists指定給一個變數
        let arrLists = this.state.lists
        
        //確認清單中的該事項目前狀態是不是已完成
        if(arrLists[index].check)
            //原本是true的話這時候會變false
            arrLists[index].check = false
        else
            //原本是false的話這時候會變true
            arrLists[index].check = true
            
        //改完後用setState將lists重新設定為arrLists
        this.setState({lists:arrLists})

    }


};
export default DeviceTransfer;