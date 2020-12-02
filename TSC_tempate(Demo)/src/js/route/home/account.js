import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Panel, Grid, Row, Col, FormControl, Table, DropdownButton, MenuItem, Pagination, Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link, hashHistory } from 'react-router';
/* component */
import PageTitile from '../../component/pageTitle.js';
import ServerAPI from '../../backendAPI/server.js';
//import getChildlists from '../../backendAPI/getChildlist.js';
import GetAccounts from '../../backendAPI/getAccount.js';
/* common */
// import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';
import MulitLangFile from '../../common/multiLang.js';
class Account extends Component {
    constructor (props) {
        super (props);
        this.logindata=JSON.parse(ServerAPI.getLoginInfo());
        this.state = {
            isLoading: false,
			placeholder: 'Device ID',
            activePage:1,
            accountuuid:'',
    
        };
        this.dataSource = '';
        this.tableParams = {
            headerLength: 0,
            matchAll: false,
            searchedCount: 1,
            searchedTag: [],
            sortedOrder: [],
            dataPerPage: 25,
            lastPage: 1,
            resultData:[]
        };
        this.tableHeader = {
            alias: {show: true, text: 'Alias Name'},
            userid: {show: true, text: 'E-mail'},
            role: {show: true, text: 'Role'},
            createTime: {show: true, text: 'Create Date'}
        };
        this.tableData = [];
        this.env = {
            project: ''
        };
        
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidUpdate()
    {
        console.log('account componentDidUpdate');
    }

    componentWillMount()
    {
        console.log('account componentWillMount');
    }

    componentDidMount () {
        console.log('account componentDidMount accountuuid='+this.state.accountuuid);
        this.env.project = this.props.params.project;
        if(!this.state.accountuuid)
        {
            this.setState({accountuuid:this.props.accountuuid});
            this.doFetch(this.props.accountuuid);
        }
        // this.dataUpdate();
    };
    componentWillReceiveProps (nextProps) {
        console.log('account componentWillReceiveProps uuid='+nextProps.accountuuid+",this uuid="+this.state.accountuuid);
        
        if (nextProps.accountuuid != this.state.accountuuid)
        {
            
            this.env.project = nextProps.params.project;
            this.setState({accountuuid:nextProps.accountuuid});
            this.doFetch(nextProps.accountuuid);
        }
    };

    

    render () {
        this.logindata=JSON.parse(ServerAPI.getLoginInfo());
        console.log("child account render format="+this.logindata.timeformat+",zone="+this.logindata.timezone);
        this.tableRefresh();
        return (
            <Grid fluid>
            
                {/* <Row style={{'margin-bottom': '10px'}}>
                    <Col md={2}>
                        <FormControl 
                            componentClass='select' 
                            onChange={() => {this._setDeviceIDorMAC();}} 
                            ref='dataSourceType' 
                            disabled={this.state.isLoading}
                        >
                            {
                                this.dataSource.DeviceIDorMAC.map((entry) => (
                                    <option value={entry['value']} selected={(this.dataSource.type == entry.value)?true:false}>{entry['text']}</option>
                                ))
                            }
                        </FormControl>
                    </Col>
                    <Col md={4}>
                        <FormControl 
                            type='text' 
                            placeholder={this.state.placeholder}
                            onChange={()=>{this._setDataSourceDevId();}} 
                            ref='dataSourceDevId'
                            maxLength='64'
                        />
                    </Col>
                    <Col md={2}>
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
                        </FormControl>
                    </Col>
                    <Col md={1}>
                        <Button className='fa fa-refresh'></Button>
                    </Col>
                </Row> */}
        
                <Row>
                    <Col md={12}>
                        {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                         <PageTitile text={`${'account manage'}`} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className='general-panel'>
                            {/* <div className='general-panel-title'>
                                <h3>{Lang.showText(7)}</h3>
                            </div> */}
                            <div className='general-panel-content'>
                                <Row style={{'overflow':'auto'}}>
                                    {this.tableData?this.showTable():[]}
                                </Row>
                                <Row>
                                    {this.showPaged()}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    };

    doFetch (accountuuid) {
        let result;
        let res;
        this.setState({isLoading: true});
        console.log('get child uuid='+accountuuid);
        if(accountuuid&&accountuuid!='')
        {
            
            //result = getChildlists.getChildlist(accountuuid);
            result = GetAccounts.getAccountList(accountuuid);
            result.then((res) => {
               console.log("get child  res="+JSON.stringify(res));
               if(res)
               { 
                    
                    if(res.data==null)
                   {
                        // confirm('No Data Available.');
                        this.resolveFetchData(res.data);
                   }else
                   {
                        //confirm('Get Success ');
                       
                       this.resolveFetchData(res.data);
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
        }else
        {
            res = {
                data: [
                    {
                        "alias": "Galaxy",
                        "userid": "galaxy@yahoo.com.tw",
                        "age": 23,
                        "role": 'Root Admin',
                        "progress": 93,
                        "status": "complicated"
                    }, {
                        "alias": "john",
                        "userid": "john@gmail.com",
                        "age": 20,
                        "role": 'Admin',
                        "progress": 94,
                        "status": "single",
                        
                    }, {
                        "alias": "tommy",
                        "userid": "tommy@gmail.com",
                        "age": 2,
                        "role": 'Operator',
                        "progress": 0,
                        "status": "single"
                    
                    }, {
                        "alias": "Peter",
                        "userid": "Peter@gmail.com",
                        "age": 16,
                        "role": 'Operator',
                        "progress": 32,
                        "status": "complicated"
                    }, {
                        "alias": "ken",
                        "userid": "ken@yahoo.com.tw",
                        "age": 29,
                        "role": 'Operator',
                        "progress": 89,
                        "status": "complicated"
                        
                    }, {
                        "alias": "kenny",
                        "userid": "kenny@yahoo.com.tw",
                        "age": 3,
                        "role": 'Operator',
                        "progress": 21,
                        "status": "single"
                        
                    }, {
                        "alias": "sam",
                        "userid": "sam@yahoo.com.tw",
                        "age": 3,
                        "role": 'Operator',
                        "progress": 52,
                        "status": "relationship"
                    }, {
                        "alias": "joke",
                        "userid": "joke@gmail.com",
                        "age": 21,
                        "role": 'Operator',
                        "progress": 75,
                        "status": "complicated"
                    
                    }, {
                        "alias": "temper",
                        "userid": "temper@gmail.com",
                        "age": 10,
                        "role": 'Operator',
                        "progress": 72,
                        "status": "complicated"
                    }, {
                        "alias": "affair",
                        "userid": "affair@gmail.com",
                        "age": 21,
                        "role": 'Operator',
                        "progress": 26,
                        "status": "complicated"
                    }, {
                        "alias": "marry",
                        "userid": "marry@gmail.com",
                        "age": 10,
                        "role": 'Operator',
                        "progress": 72,
                        "status": "complicated"
                    }, {
                        "alias": "bolb",
                        "userid": "olb@gmail.com",
                        "age": 10,
                        "role": 'Operator',
                        "progress": 72,
                        "status": "complicated"
                    }
                ]
            };
    //         result.then((res) => {
            setTimeout(() => {
                this.resolveFetchData(res.data);
                this.setState({ isLoading: false });
            }, 1000);
    //         });
        }
         
        
    };

    resolveFetchData (source) {
        this.dataSource=source;
        let dataArray = [];
        if(source)
        {
            let data = source.slice(0);
            data.map((entry, index) => {
                dataArray[index] = entry;
                dataArray[index]['id'] = index+1;
            });

            this.tableData = dataArray//.reverse()
            .slice(0);
        }else
            this.tableData = dataArray;
        
        this.initTable(dataArray);
    };

 

    initTable (data) {
        data.map((entry, index) => {
            this.tableParams.searchedTag[index] = 1;
            this.tableParams.sortedOrder[index] = index;
        });
        this.tableParams.searchedCount = 1;
        this.tableParams.matchAll = false;
        this.tableParams.lastPage = Math.ceil(data.length / this.tableParams.dataPerPage);
       // this.setState({ activePage: 1 });
    };
    tableRefresh () {
        this.tableParams.resultData = [];
        let countLength = 0;
        let data = this.tableData.slice(0);
        data.map((entry, index) => {
            if (this.tableParams.matchAll)
            {
                if (this.tableParams.searchedCount == this.tableParams.searchedTag[index])
                {
                    this.tableParams.resultData[countLength] = this.tableParams.sortedOrder[index];
                    countLength++;
                }
            }
            else
            {
                if (0 < this.tableParams.searchedTag[index])
                {
                    this.tableParams.resultData[countLength] = this.tableParams.sortedOrder[index];
                    countLength++;
                }
            }
        });
        /* update pagedInfo */
        this.tableParams.lastPage = Math.ceil(countLength / this.tableParams.dataPerPage);
    };

    showSearchBar () {
        let content = [];
        content.push(
            <Col md={4} mdOffset={6}>
                <FormGroup>
                    <InputGroup>
                        <FormControl ref='searchInput' type='text' placeholder={'101'} onChange={()=>this._searchHandler()} />
                        <InputGroup.Addon>
                            <FontAwesome name='search' />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
            </Col>
        );
        content.push(
            <Col md={2} className='matchAllToggle'>
                <Checkbox
                    checkboxClass={ConstDef.ICHECK_STYLE}
                    increaseArea="20%"
                    label={'105'}
                    checked={this.tableParams['matchAll']}
                    onChange={()=>this._searchMatchAllHandler()}
                />
            </Col>
        );
        return content;
    };
    showTable () {
        let content = [];
        content.push(
            <Col md={12}> 
                <Table striped bordered hover >
                    {this.showTableHeader()}
                    {this.showTableBody()}
                </Table>
            </Col>
        );
        return content;
    };

    handleClick(entry)
    {
        
        if(entry.role!='Operator')hashHistory.push({pathname:'/home/account/info',state:{alias:entry.alias,mail:entry.userid,role:'Admin'}});
        console.log('account handleClick entry='+JSON.stringify(entry));
    }

    showTableHeader () {
        let content = [];
        let count = 0;
        content.push(
            <thead>
                <tr style={{'background-color':'#2a3f54',color:'white'}} >
                    {
                        Object.keys(this.tableHeader).map((entry) => {
                            let content_th = [];
                            switch (entry)
                            {
                                case 'alias':
                                case 'userid':
								if(this.tableHeader[entry].show)content_th.push(
                                        <th style={{'text-align':"left"}}>{this.tableHeader[entry].text}</th>
                                    );
                                    break;
                                default:
									if(this.tableHeader[entry].show)content_th.push(
                                        <th style={{'text-align':"left"}}>{this.tableHeader[entry].text}</th>
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
        this.tableParams.headerLength = count;
        return content;
    };
    showTableBody () {
        let data = this.tableData.slice(0);
        let contentIndex = this.tableParams.resultData.slice(0);
        let contentStart = (this.state.activePage-1) * this.tableParams.dataPerPage;
        let contentEnd = Math.min((this.state.activePage * this.tableParams.dataPerPage) , this.tableParams.resultData.length);
        let content = [];
        let index = 0, count = 0, tableInfo = [];
        for (let i=contentStart; i<contentEnd; i++)
        {
            index = contentIndex[i];
            tableInfo[count] = data[index];
            count++;
        }
        let roottr={'background-color':'#f0f0f0'}//??f9f9f9
        let styleRoot={'text-align':"left"};
         let styleRole={'text-align':"left",'text-transform':'capitalize'};
        // let styleother={'text-align':"left",'padding-left': '50px'};
        //onClick={this.handleClick.bind(this,entry)} style={entry.role!='Operator'?{'cursor': 'pointer'}:{}}
        content.push(
            <tbody>
                {
                   
                    tableInfo.map((entry) => {
                        let content_tr = [];
                        content_tr.push(
                            <tr >
                                {
                                    Object.keys(this.tableHeader).map((info) => {
                                        let content_td = [];
                                        switch (info)
                                        {
                                            case 'alias':
                                                if(this.tableHeader[info].show)content_td.push(
                                                    <td style={styleRoot}>{entry[info]}</td>
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                                case 'createTime':
                                                if(this.tableHeader[info].show)content_td.push(
                                                    <td style={styleRoot}>{this.getDate(entry[info])}</td>
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                                case 'role':
                                                if(this.tableHeader[info].show)
                                                    content_td.push( <td style={styleRole}>{entry[info]==''?"Admin":entry[info]}</td>)
                                                {/* (entry.role=='Root Admin')?
                                                    content_td.push( <td style={styleRoot}>{entry[info]}</td>)
                                                :content_td.push(
                                                    <td style={styleRoot}>{entry[info].split('/').length==3?'Operator':<Link to={{pathname:'/home/account/info',state:{alias:entry.alias,mail:entry.mail,role:'Admin'}}} >Admin</Link>}</td>
                                                ); */}
                                                break;
                                            default:
											if(this.tableHeader[info].show)content_td.push(
                                                    <td style={styleRoot}>{entry[info]}</td>
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
                    
                    ( this.state.isLoading)? (<tr><td colSpan={this.tableParams['headerLength']} className='text-center'>Loading ...</td></tr>) :
                    (0 == tableInfo.length)? (<tr><td colSpan={this.tableParams['headerLength']} className='text-center'>No Data Available.</td></tr>) :[]
                }
            </tbody>
        );
        return content;
    };

    showloading()
    {
        let content = [];
        content.push(<tr><td colSpan={this.tableParams['headerLength']} className='text-center'>Loading ...</td></tr>);
        return content;
    }

    showPaged () {
        const pagedOptions = new Array(
            {value: 10},
            {value: 25},
            {value: 50},
            {value: 100},
        );
        let content = [];
        let showStart = 0;
        if (0 < this.tableParams.resultData.length)
        {
			showStart = (this.state.activePage-1) * this.tableParams.dataPerPage + 1;
        }
        let showEnd = Math.min((this.state.activePage * this.tableParams.dataPerPage) , this.tableParams.resultData.length);
        content.push(
            <Col md={12} className='tables-paging'>
                <div className='pageinfo'>
                    <span>{MulitLangFile.showText("Showing %0-%1 of %2 records.", showStart, showEnd, this.tableParams['resultData'].length)}</span>
                    <span>Items per page: </span>
                    <DropdownButton title={this.tableParams.dataPerPage} onSelect={(eventKey) => this._perPageHandler(eventKey)} dropup>
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
                        items={this.tableParams.lastPage}
                        maxButtons={9}
                        activePage={this.state.activePage}
                        onSelect={(eventKey) => {this._pagedHandler(eventKey);}}
                    />
                </div>
            </Col>
        );
        return content;
	};
	
	_pagedHandler (eventKey) {
		 console.log('_pagedHandler eventKey='+eventKey);
        this.tableParams['lastPage'] = eventKey;
        this.setState({ activePage: eventKey });
        this.resolveFetchData(this.dataSource);
       
	};
	
	_perPageHandler (eventKey) {
		// console.log('_perPageHandler eventKey'+eventKey);
        this.tableParams['lastPage'] = 1;
        this.tableParams['dataPerPage'] = eventKey;
        this.setState({ activePage: 1 });
        this.resolveFetchData(this.dataSource);
    };

    _setDeviceIDorMAC (entry) {
        if(1 == ReactDOM.findDOMNode(this.refs[`dataSourceType`]).value)
            this.state.placeholder = 'Device ID';
        else
            this.state.placeholder = 'MAC';
        this.setState(this.state);
    }
    _setDataSourceType () {
        
    };
    _setDataSourceDevId () {
        
    };
    _setDataSourceInterval () {
        
    };

        getDate(timestamp)
        {
            if(timestamp==0||timestamp=='')
            {
                    return timestamp;
            }
            if(timestamp<1552718400)
            {
                    return timestamp;
            }else if(timestamp.toString().length==10)
            {
                timestamp=timestamp*1000;
            }else if(timestamp<1552718400000)
            {
                return timestamp;
            }
            var zone=parseInt(this.logindata.timezone); 
            
            var date = new Date(timestamp+(zone*60*60*1000) );

            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
            var day = date.getUTCDate();
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();

            month = (month < 10) ? '0' + month : month;
            day = (day < 10) ? '0' + day : day;
            hours = (hours < 10) ? '0' + hours : hours;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            seconds = (seconds < 10) ? '0' + seconds: seconds;
            if(this.logindata.timeformat==1){
                return month + '/' + day+ '/' +  year + ' ' + hours + ':' + minutes+ ':' + seconds;
            }else
                return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes+ ':' + seconds;
        }
};
export default Account;