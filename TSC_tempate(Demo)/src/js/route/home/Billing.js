import React, { Component } from 'react';
import {
  Grid, Row, Col, Button, Table, FormControl, MenuItem, ButtonToolbar
} from 'react-bootstrap';

import ReactDOM from 'react-dom';

/* component */
import PageTitile from '../../component/pageTitle.js';
import ServerAPI from '../../backendAPI/server.js';

import FontAwesome from 'react-fontawesome';

import BillingAPI from '../../backendAPI/Billing.js';

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRefresh: false
        };

        this.options = [
            {
                index: 0,
                text: 'Registration Fee',
                isSelect: true
            },
            {
                index: 1,
                text: 'Subscription Fee',
                isSelect: false
            }
        ];

        this.tableHeader = {
            Reg: {
                item: 'Item',
                qty: 'Total QTY',
                up: 'U/P',
                amount: 'Amount(USD)'
            },
            Sub: {
                item: 'Item',
                plan: 'Plan',
                qty: 'Total QTY',
                up: 'U/P',
                amount: 'Amount(USD)'
            }
        };

        this.RegtableData = [];

        this.SubtableData = [];

        this.monthList = {index: 0};

        this.env = {
            project: ''
        };
    };

    componentWillMount () {
        /*this.monthList = {index: 0,list:[]};
        let now = new Date();
        for (let i = 1; i < 5; i++)
        {
            now.setMonth(now.getMonth() - 1);
            let month = (now.getMonth() + 1).toString();
            let monthStr = now.getFullYear() + "." + (month[1] ? month : "0" + month[0]);
            this.monthList.list.push({text: monthStr, value: i-1});
        }*/
        this.monthList = {index: 0,list:[{text: "2019.03", value: 0},{text: "2019.02", value:1},{text: "2019.01", value: 2}]};
    };

    componentDidMount () {
        this.env.project = this.props.params.project;
        this.dataUpdate();
    };

    dataUpdate () {
        this.doFetch();
    };

    doFetch () {
        this.setState({isLoading: true});
        
        this.resolveFetchRegData(
            [
                {
                    "item": "Lyric C1 Camera Cloud Registration Fee_ Lyric Cloud",
                    "qty": "1382",
                    "up": "4.1",
                    "amount": "5666.2"
                }, 
                {
                    "item": "Lyric C2 Camera Cloud Registration Fee_ Lyric Cloud",
                    "qty": "1382",
                    "up": "4.1",
                    "amount": "5666.2"
                }
            ]); 

        this.resolveFetchSubData(
            [
                {
                    "item": "TC C1 Camera Cloud Subscription Fee_ Lyric Cloud",
                    "plan": "7 Days",
                    "qty": "1684",
                    "up": "5.3",
                    "amount": "8925.2"
                }, 
                {
                    "item": "TC C2 Camera Cloud Subscription Fee_ Lyric Cloud",
                    "plan": "30 Days",
                    "qty": "1684",
                    "up": "5.3",
                    "amount": "8925.2"
                }
            ]);

        this.setState({isLoading: false});
    }

    resolveFetchRegData(source) {
        this.RegtableData = [];
    }

    resolveFetchSubData(source) {
        this.SubtableData = [];
    }
    
    render () {
        return (
            <Grid id='other_blank' fluid>
                <Row>
                    <Col md={12}>
                         <PageTitile text={`${'Billing'}`} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className='general-panel'>
                            <div className='general-panel-content'>
                            <Row>
                                <div className="btn-group" role="group" style={{'padding-left': "10px", 'margin-top':'18px'}}>
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

                                <Col style={{'padding-right':'12px', 'margin-top':'8px'}} className='data-source-selector'>
                                <Button onClick = {() => this.Download()} bsStyle="success">
                                <FontAwesome name = "cloud-download" className='clickable' size="lg" style={{'height':'12px', 'margin-top':'4px'}}/>
                                </Button></Col>

                                <Col md={2} style={{'padding-right':'12px', 'margin-top':'8px'}} className='data-source-selector'>
                                <FormControl 
                                    ref='monthSelect' 
                                    componentClass='select'
                                    onChange={() => {this.setDataTime();}} 
                                    disabled={this.state.isLoading}
                                >
                                {
                                this.monthList.list.map((entry) => (
                                    <option value={entry.value} selected={(this.monthList.index == entry.value)? true:false}>{entry['text']}</option>
                                ))
                                }
                                </FormControl>
                                </Col>        
                            </Row>
                            <Row>
                                <div style={{'padding-left':'12px', 'padding-top':'12px'}}>
                                <h3>Date: {this.GetTitle()}</h3>
                                </div>
                            </Row>
                            <Row style={{'overflow':'auto'}}>
                                {this.showTable()}
                            </Row>
                            </div>
                        </div>
                    </Col>
                </Row>    
            </Grid>
        )
    };

    GetTitle () {
        if (this.monthList.index == 0)
            return "2019/03";
        else if (this.monthList.index == 1)
            return "2019/02";
        else
            return "2019/01";
    }

    Download () {
        let filename = "TSC-BillingReport-2019-0"+(3-this.monthList.index).toString()+".pdf";
        BillingAPI.download(filename);
    }

    setDataTime () {
        this.monthList.index = parseInt(ReactDOM.findDOMNode(this.refs['monthSelect']).value);
        this.setState({isRefresh: false});
    }

    showTable () {
        let content = [];
        content.push(
            <Col md={12}> 
                <Table striped bordered hover>
                    {this.showTableHeader()}
                    {this.showTableBody()}
                </Table>
            </Col>
        );
        return content;
    };
    
    showTableHeader () {
        let content_th = [];
        content_th.push(
            <thead>
                <tr style={{'background-color':'#2a3f54',color:'white'}}>
                {
                    (() => {
                        let obj = this.options[0].isSelect ? this.tableHeader.Reg : this.tableHeader.Sub;
                        let content = [];
                        Object.keys(obj).map((entry) => {           
                            content.push(<th style={{'text-align':"left"}}>{obj[entry]}</th>);
                        })

                        return content;
                    })()
                }
                </tr>
            </thead>
        );

        return content_th;
    };

    showTableBody () {
        let content = [];
        let BodyStyle={'text-align':'left'};
        let FootStyle={'text-align':'left', 'padding':'25px 25px 25px 8px'};// backgroundColor: '#bccdde'
        let month = 0;

        if (this.options[0].isSelect)
            content.push(
            <tbody>
                <tr>
                <td style={BodyStyle}>GOP Camera Cloud Registration Fee</td>
                <td style={BodyStyle}>597</td>
                <td style={BodyStyle}>$15.1</td>
                <td style={BodyStyle}>$9,041.7</td>
                </tr>
                <tr>
                <td style={BodyStyle}>GLP Camera Cloud Registration Fee</td>
                <td style={BodyStyle}>845</td>
                <td style={BodyStyle}>$15.1</td>
                <td style={BodyStyle}>$12,759.5</td>
                </tr>
                <tr>
                <td style={FootStyle}>Subtotal</td>
                <td style={FootStyle}>1442</td>
                <td style={FootStyle}></td>
                <td style={FootStyle}>$21,801.2</td>
                </tr>
            </tbody>);
        else
            content.push(<tbody>
                <tr>
                <td style={BodyStyle}>Subscription Fee_ User</td>
                <td style={BodyStyle}>7 day</td>
                <td style={BodyStyle}>902</td>
                <td style={BodyStyle}>$4.10</td>
                <td style={BodyStyle}>$3,698.2</td>
                </tr>
                <tr>
                <td style={BodyStyle}>Subscription Fee_ User</td>
                <td style={BodyStyle}>30 day</td>
                <td style={BodyStyle}>34</td>
                <td style={BodyStyle}>$14.00</td>
                <td style={BodyStyle}>$476</td>
                </tr>
                <tr>
                <td style={BodyStyle}>Subscription Fee_ User</td>
                <td style={BodyStyle}>60 day</td>
                <td style={BodyStyle}>5</td>
                <td style={BodyStyle}>$25.14</td>
                <td style={BodyStyle}>$125.7</td>
                </tr>
                <tr>
                <td style={FootStyle}>Subtotal</td>
                <td style={FootStyle}></td>
                <td style={FootStyle}>941</td>
                <td style={FootStyle}></td>
                <td style={FootStyle}>$4,299.9</td>
                </tr>
            </tbody>);

        return content;
    }

    showTableBody2 () {
        let data = this.options[0].isSelect ? this.RegtableData : this.SubtableData;
        let content = [];
 
        let BodyStyle={'text-align':"left"};
        content.push(
            <tbody>
                {
                    (this.state.isLoading) ? this.showloading() :
                    data.map((entry) => {
                        let content_tr = [];
                        content_tr.push(
                            <tr>
                                {
                                    (() => {
                                        let obj = this.options[0].isSelect ? this.RegtableData : this.SubtableData;
                                        let content_td = [];
                                        Object.keys(obj).map((info) => {   
                                            content_td.push(<td>{entry[info]}</td>);
                                        })
                                    
                                        return content_td;
                                    })()
                                }
                            </tr>
                        );
                        return content_tr;
                    })
                }
                {
                    (0 == data.length)? (<tr><td colSpan={this.tableParams['headerLength']} className='text-center'>Loading ...</td></tr>) : []
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

    onSelectTypeChange(index) {
        this.options.map((option) => {
            option.isSelect = index == option.index ? true : false;
        });

        this.setState({isRefresh: false});
    }

    doFetch () {
        data: [
            {
                "alias": "Galaxy",
                "userid": "galaxy@yahoo.com.tw",
                "age": 23,
                "role": 'Root Admin',
                "progress": 93,
                "status": "complicated"
            }, {}
        ];
        //this.resolveFetchData(res.data);
    }

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
};

export default Billing;