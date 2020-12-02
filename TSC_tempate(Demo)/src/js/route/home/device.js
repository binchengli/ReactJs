import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Panel, Grid, Row, Col, FormControl, Table, DropdownButton, MenuItem, Pagination, Button ,Form ,InputGroup,FormGroup,Image
} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';



/* component */
import PageTitile from '../../component/pageTitle.js';
// import ServerAPI from '../../backendAPI/server.js';
// import getChildlists from '../../backendAPI/getChildlist.js';
import DeviceAPI from '../../backendAPI/DeviceAPI.js';
/* common */
// import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';
import MulitLangFile from '../../common/multiLang.js';

class Device extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
			placeholder: 'Device ID',
            deviceActivePage:1,
            allDeviceList:0
        };
        this.dataSource = {
            type: 1,
            devId: '',
        };


        this.deviceTableParams = {
            headerLength: 0,
            matchAll: false,
            searchedCount: 1,
            searchedTag: [],
            sortedOrder: [],
            dataPerPage: 25,
            lastPage: 1,
            resultData:[]
        };
        this.deviceTableHeader = {
            devname: {show: true, text: 'Device Name'},
            status: {show: true, text: 'Status'},
            model: {show: true, text: 'Model'},
            mac: {show: true, text: 'MAC'},
            devid: {show:true ,text: 'Device ID'},
            owner:{show:true,text: 'Owner'}
        };
        this.deviceTableData = [];
        this.env = {
            project: ''
        };
    };
    componentDidMount () {
        console.log('account componentDidMount', 'this.props.params.project =', this.props.params.project);
        this.env.project = this.props.params.project;

        this.doFetch();
    };
    componentWillReceiveProps (nextProps) {
        
        this.setState({ isLoading: true });
    };
    render () {
        console.log("child account render");
        this.tableRefresh();
        return (
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <PageTitile text={`${'Device Manage'}`} /> 
                    </Col>
                </Row>
                <Row>                    
                    <Col md={12}>
                        <div className='general-panel'>
                            <div>
                                <Row>
                                    {/* <Col className='data-source-selector' style ={{'padding-right':'1%'}}>
                                        <Button onClick={()=>{this._redirectHandler('/home/device/deviceTransfer');}} bsStyle="success">
                                            <FontAwesome name = "share" className='clickable' size='lg' onClick={() => {this._redirectHandler('/home/device/deviceTransfer');}} />
                                        </Button>
                                    </Col> */}
                                    {this.showSearchBar()}                                                    
                                </Row>
                                <Row style={{'overflow':'auto'}}>
                                    {this.showDeviceTable()}
                                </Row>
                                <Row>
                                    {this.showDevicePaged()}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    };

    doFetch () {
        let result;
        let res;
        this.setState({isLoading: true});

            result = DeviceAPI.all_device_list();
            result.then((res) => 
            {
                console.log(res)
               if(res)
               { 
                    if(res.data==null)
                   {
                        this.resolveFetchData_AllDeviceList(res.data);
                   }else
                   {
                        this.resolveFetchData_AllDeviceList(res.data);
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
        // }
        // else
        // {
            
        // }
         
        
    };
    resolveFetchData_AllDeviceList (source) {
        let dataArray = [];
        if(source)
        {
            let data = source.slice(0);
            data.map((entry, index) => {
                dataArray[index] = entry;
                // dataArray[index]['idList'] = index+1;
            });

            this.deviceTableData = dataArray//.reverse()
            .slice(0);
        }else
            this.deviceTableData = dataArray;
        
        // this.initAccountTable(dataArray);

        this.initDeviceTable(dataArray);
    };
    initDeviceTable (data) {
        data.map((entry, index) => {
            this.deviceTableParams.searchedTag[index] = 1;
            this.deviceTableParams.sortedOrder[index] = index;
        });
        this.deviceTableParams.searchedCount = 1;
        this.deviceTableParams.matchAll = false;
        this.deviceTableParams.lastPage = Math.ceil(data.length / this.deviceTableParams.dataPerPage);
       
    };
    tableRefresh () {

        this.deviceTableParams.resultData = [];

        
        let deviceCountLength = 0;

       
        let deviceData  = this.deviceTableData.slice(0);

        deviceData.map((entry, index) => {
            if (this.deviceTableParams.matchAll)
            {
                if (this.deviceTableParams.searchedCount == this.deviceTableParams.searchedTag[index])
                {
                    this.deviceTableParams.resultData[deviceCountLength] = this.deviceTableParams.sortedOrder[index];
                    deviceCountLength++;
                }
            }
            else
            {
                if (0 < this.deviceTableParams.searchedTag[index])
                {
                    this.deviceTableParams.resultData[deviceCountLength] = this.deviceTableParams.sortedOrder[index];
                    deviceCountLength++;
                }
            }
        });
        /* update pagedInfo */
        this.deviceTableParams.lastPage = Math.ceil(deviceCountLength / this.deviceTableParams.dataPerPage);
    };

    showSearchBar () {
        let content = [];
        content.push(
            <Col md={4} className='data-source-selector' >
                <FormGroup>
                    <InputGroup>
                        <FormControl ref='searchInput' type='text' placeholder={'Search'} onChange={()=>this._searchHandler()} />
                        <InputGroup.Addon className="searchBtn" onClick={()=>{this._searchHandler()}}>
                            <FontAwesome name='search'/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
            </Col>
        );
        return content;
    };
    _searchHandler(){
        let searchinput = ReactDOM.findDOMNode(this.refs.searchInput).value.split(' ').filter((entry) => ('' != entry));
        let data = this.deviceTableData.slice(0);
        let dataTag = this.deviceTableParams['searchedTag'].slice(0);
        if (0 == searchinput.length) { searchinput[0] = ''; }
        data.map((entry,entryIndex) => {
            let count = 0;
            searchinput.map((input) => {
                let inputLowCase = new RegExp(input, 'i');
                for (let obj in entry)
                {
                    let objContent = '';
                    objContent = entry[obj];

                    if (inputLowCase.test(objContent)) 
                    {
                        count+=1;
                        break;
                    }
                }
            });
            dataTag[entryIndex] = count;
        });
        this.deviceTableParams['searchedCount'] = searchinput.length;
        this.deviceTableParams['searchedTag'] = dataTag.slice(0);
        this.setState({ deviceActivePage: 1 });
    };
    _searchInputHandler(){

    };
    _searchMatchAllHandler(){

    };
    
    
    showDeviceTable () {
        let content = [];
        content.push(
            <Col md={12}>
                <Table striped bordered hover>
                    {this.showDeviceTableHeader()}
                    {this.showDeviceTableBody()}
                </Table>
            </Col>
        );
        return content;
    };
    showDeviceTableHeader () {
        let content = [];
        let count = 0;
        content.push(
            <thead>
                <tr style={{'background-color':'#2a3f54',color:'white'}}>
                    {
                        Object.keys(this.deviceTableHeader).map((entry) => {
                            let content_th = [];
                            switch (entry)
                            {
                               
                                
                                //     content_th.push(
                                //         <th>{(this.deviceTableHeader[entry].text)}<FontAwesome name='sort' size='1x' style={{'padding-left':'10px'}}/></th>
                                //     );
                                //     break;
                                default:
                                    content_th.push(
                                        <th style={{'text-align':"left"}}>{(this.deviceTableHeader[entry].text)}
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
        this.deviceTableParams.headerLength = count;
        return content;
    };
    showDeviceTableBody () {
        let data = this.deviceTableData.slice(0);
        let contentIndex = this.deviceTableParams.resultData.slice(0);
        let contentStart = (this.state.deviceActivePage-1) * this.deviceTableParams.dataPerPage;
        let contentEnd = Math.min((this.state.deviceActivePage * this.deviceTableParams.dataPerPage) , this.deviceTableParams.resultData.length);
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
                        content_tr.push(
                            <tr onClick={() => {this._redirectHandler('/home/device/deviceInfo'); this._setThisDeviceID(entry.devid);}}  style = {{'cursor': 'pointer'}} >
                    
                                {
                                    Object.keys(this.deviceTableHeader).map((info) => {
                                        let content_td = [];
                                        switch (info)
                                        {
                                            default:
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
                    (0 == tableInfo.length)? (<tr><td colSpan={this.deviceTableParams['headerLength']} className='text-center'>{''}</td></tr>) : []
                }
            </tbody>
        );
        return content;
    };
    showDevicePaged () {
        const pagedOptions = new Array(
            {value: 10},
            {value: 25},
            {value: 50},
            {value: 100},
        );

        
        let content = [];
        let showStart = 0;
        if (0 < this.deviceTableParams.resultData.length)
        {
			showStart = (this.state.deviceActivePage-1) * this.deviceTableParams.dataPerPage + 1;
        }
        let showEnd = Math.min((this.state.deviceActivePage * this.deviceTableParams.dataPerPage) , this.deviceTableParams.resultData.length);
        content.push(
            <Col md={12} className='tables-paging'>
                <div className='pageinfo'>
                    <span>{MulitLangFile.showText("Showing %0-%1 of %2 records.", showStart, showEnd, this.deviceTableParams['resultData'].length)}</span>
                    <span>Items per page: </span>
                    <DropdownButton title={this.deviceTableParams.dataPerPage} onSelect={(eventKey) => this._perDevicePageHandler(eventKey)} dropup>
                        {
                            pagedOptions.map((entry) => (
                                <MenuItem eventKey={entry.value}>{entry.value}</MenuItem>
                            ))
                        }
                    </DropdownButton>
                    <span>Page(s): </span>
                    <Pagination
                        // prev
                        // next
                        first
                        last
                        ellipsis={false}
                        items={this.deviceTableParams.lastPage}
                        maxButtons={9}
                        activePage={this.state.deviceActivePage}
                        onSelect={(eventKey) => {this._devicePagedHandler(eventKey);}}
                    />
                </div>
            </Col>
        );
        return content;
	};
    _devicePagedHandler (eventKey) {
		// console.log('eventKey='+eventKey);
        this.deviceTableParams['lastPage'] = eventKey;
        this.setState({ deviceActivePage: eventKey });
	};
    _perDevicePageHandler (eventKey) {
		// console.log('_perDevicePageHandler eventKey'+eventKey);
        this.deviceTableParams['lastPage'] = 1;
        this.deviceTableParams['dataPerPage'] = eventKey;
        this.setState({ deviceActivePage: 1 });
    };

    _setDeviceIDorMAC (entry) {
        if(1 == ReactDOM.findDOMNode(this.refs[`dataSourceType`]).value)
            this.state.placeholder = 'Device ID';
        else
            this.state.placeholder = 'MAC';
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
    _setThisDeviceID (data) {
        console.log('======--------',data);
        StorageData.set('DeviceID',data);
    };
    _setDataSourceType () {
        
    };
    _setDataSourceDevId () {
        
    };
    
    _setAllDeviceList()
    {
        if(this.allDeviceList == 0)
        {
            this.allDeviceList =1;

            let result;
            let res;
            this.setState({isLoading: true});

            result = DeviceAPI.all_device_list();
            result.then((res) => {
               console.log("get All Device  res="+JSON.stringify(res));
               if(res)
               {   
                    console.log("get All Device  res="+JSON.stringify());
                    if(res.data==null)
                   {
                        confirm('no data.');
                        this.resolveFetchData_AllDeviceList(res.data);
                   }else
                   {
                        // res.data.unshift(my);
                        // confirm('Get Success ');
                       this.resolveFetchData_AllDeviceList(res.data);
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

        }
        else{
            this.allDeviceList =0;

            this.setState({isLoading: true});
            this.resolveFetchData_AllDeviceList();
            this.setState({ isLoading: false });
        }
        console.log('fuck ===',this.allDeviceList);
    }
};
export default Device;