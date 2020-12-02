import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Panel, Grid, Row, Col, FormControl, Table, DropdownButton, MenuItem, Pagination, Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* component */
import PageTitile from '../../component/pageTitle.js';

/* common */
// import Lang from '../../common/languages.js';
import StorageData from '../../common/storageData.js';
import MulitLangFile from '../../common/multiLang.js';

class Account extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
			placeholder: 'Device ID',
			activePage:1
        };
        this.dataSource = {
            type: 1,
            devId: '',
            // date: {
            //     interval: 2,
            //     startDay: 0,
            //     endDay: 0
            // },
            // dateList: [
            //     {text: '1 Hour', value: 1},
            //     {text: '2 Hours', value: 2},
            //     {text: '3 Hours', value: 3},
            //     {text: '5 Hours', value: 5},
            //     {text: '12 Hours', value: 12}
            // ],
            // DeviceIDorMAC: [
            //     {text: 'Device ID', value: 1},
            //     {text: 'MAC', value: 2}
            // ]
        };
        this.tableParams = {
            headerLength: 0,
            matchAll: false,
            searchedCount: 1,
            searchedTag: [],
            sortedOrder: [],
            dataPerPage: 10,
            lastPage: 1,
            resultData:[]
        };
        this.tableHeader = {
            aliasName: {show: true, text: 'Alias Name'},
            email: {show: true, text: 'E-mail'},
            age: {show: false, text: 'Age'}
        };
        this.tableData = [];
        this.env = {
            project: ''
        };
    };
    componentDidMount () {
        console.log('account componentDidMount', 'this.props.params.project =', this.props.params.project);
        this.env.project = this.props.params.project;
        this.dataUpdate();
    };
    componentWillReceiveProps (nextProps) {
        if (nextProps.params.project != this.env.project)
        {
            this.env.project = nextProps.params.project;
            console.log('account componentWillReceiveProps', this.env.project);
            this.dataUpdate();
        }
    };
    render () {
        this.tableRefresh();
        return (
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        {/* <PageTitile text={`${this.env.project}/${Lang.showText(3)}/${Lang.showText(7)}`} /> */}
						<PageTitile text={`${'Project'}/${'account'}`} />
                    </Col>
                </Row>
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
                        <div className='general-panel'>
                            {/* <div className='general-panel-title'>
                                <h3>{Lang.showText(7)}</h3>
                            </div> */}
                            <div className='general-panel-content'>
                                <Row style={{'overflow':'auto'}}>
                                    {this.showTable()}
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

    dataUpdate () {
        this.doFetch();
    };
    doFetch () {
        let result;
        let res;
        this.setState({isLoading: true});
//         result = SiteDashboard.getWidget(this.env['siteUuid']);
        res = {
            data: [
                {
					"aliasName": "quantity",
					"email": "stove@yahoo.com.tw",
					"age": 23,
					"visits": 50,
					"progress": 93,
					"status": "complicated"
				}, {
					"aliasName": "rose",
					"email": "rabbits",
					"age": 20,
					"visits": 59,
					"progress": 94,
					"status": "single",
					
				}, {
					"aliasName": "guide",
					"email": "basket",
					"age": 2,
					"visits": 40,
					"progress": 0,
					"status": "single"
				
				}, {
					"aliasName": "wheel",
					"email": "pleasure",
					"age": 16,
					"visits": 4,
					"progress": 32,
					"status": "complicated"
				}, {
					"aliasName": "disease",
					"email": "lunch",
					"age": 29,
					"visits": 86,
					"progress": 89,
					"status": "complicated"
					
				}, {
					"aliasName": "coast",
					"email": "religion",
					"age": 3,
					"visits": 7,
					"progress": 21,
					"status": "single"
					
				}, {
					"aliasName": "side",
					"email": "category",
					"age": 3,
					"visits": 44,
					"progress": 52,
					"status": "relationship"
				}, {
					"aliasName": "joke",
					"email": "market",
					"age": 21,
					"visits": 8,
					"progress": 75,
					"status": "complicated"
				
				}, {
					"aliasName": "needle",
					"email": "temper",
					"age": 10,
					"visits": 84,
					"progress": 72,
					"status": "complicated"
				}, {
					"aliasName": "air",
					"email": "affair",
					"age": 21,
					"visits": 28,
					"progress": 26,
					"status": "complicated"
				}, {
					"aliasName": "1",
					"email": "1",
					"age": 10,
					"visits": 84,
					"progress": 72,
					"status": "complicated"
				}, {
					"aliasName": "2",
					"email": "2",
					"age": 10,
					"visits": 84,
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
    };
    resolveFetchData (source) {
        let data = source.slice(0);
        let dataArray = [];

        data.map((entry, index) => {
            dataArray[index] = entry;
            dataArray[index]['id'] = index+1;
        });

		this.tableData = dataArray//.reverse()
		.slice(0);
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
                <Table striped hover>
                    {this.showTableHeader()}
                    {this.showTableBody()}
                </Table>
            </Col>
        );
        return content;
    };
    showTableHeader () {
        let content = [];
        let count = 0;
        content.push(
            <thead>
                <tr>
                    {
                        Object.keys(this.tableHeader).map((entry) => {
                            let content_th = [];
                            switch (entry)
                            {
                                case 'aliasName':
                                case 'email':
								if(this.tableHeader[entry].show)content_th.push(
                                        <th>{this.tableHeader[entry].text}</th>
                                    );
                                    break;
                                default:
									if(this.tableHeader[entry].show)content_th.push(
                                        <th>{this.tableHeader[entry].text}</th>
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
        content.push(
            <tbody>
                {
                    tableInfo.map((entry) => {
                        let content_tr = [];
                        content_tr.push(
                            <tr>
                                {
                                    Object.keys(this.tableHeader).map((info) => {
                                        let content_td = [];
										{/* console.log(info+" show="+entry[info].show); */}
                                        switch (info)
                                        {
                                            case 'aliasName':
                                                if(this.tableHeader[info].show)content_td.push(
                                                    <td>{entry[info]}</td>
                                                    //<td className='text-left'>{entry[info]}</td>
                                                );
                                                break;
                                            default:
											if(this.tableHeader[info].show)content_td.push(
                                                    <td>{entry[info]}</td>
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
                    (0 == tableInfo.length)? (<tr><td colSpan={this.tableParams['headerLength']} className='text-center'>Loading ...</td></tr>) : []
                }
            </tbody>
        );
        return content;
    };
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
		// console.log('eventKey='+eventKey);
        this.tableParams['lastPage'] = eventKey;
        this.doFetch();
        this.setState({ activePage: eventKey });
	};
	
	_perPageHandler (eventKey) {
		// console.log('_perPageHandler eventKey'+eventKey);
        this.tableParams['lastPage'] = 1;
        this.tableParams['dataPerPage'] = eventKey;
        this.doFetch();
        this.setState({ activePage: 1 });
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
};
export default Account;