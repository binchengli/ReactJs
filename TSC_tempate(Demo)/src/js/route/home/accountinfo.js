import React, { Component } from 'react';
import {
  Grid, Row, Col,Button,ControlLabel,FormGroup
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
/* component */
import PageTitile from '../../component/pageTitle.js';

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        const { alias,mail,role } = this.props.location.state
        this.state = {
            alias:alias,
            email:mail,
            role:role,
            time:''
        };
        console.log('AccountInfo location='+JSON.stringify(this.props.location));
    };

   

    
    render () {
        let mstyle={color:'black','text-align':'right','margin-top':'10px'};
        let mstyle2={color:'black','text-align':'left','margin-top':'10px',display:'inline-block'};
        return (

            <Grid  fluid>
                <Row>
                    <Col md={12} >
                        {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                         { <PageTitile text={`Account Manage/Account Information`} /> }
                         
                    </Col>
                </Row>
                <Row className=' general-panel'>
                <div className='general-panel-content'>
                        <FormGroup>
                            <Col  md={ 10 } ></Col>  
                            <Col  md={ 2 } >
                                <Link to={{pathname:'/home/account'}}>
                                    <Button style={{}}  bsStyle="success">
                                        <FontAwesome name = "reply" className='clickable' size='lg'/>
                                    </Button>
                                </Link>
                            </Col>
                        </FormGroup>
                      
                         
                     <Col  md={ 7 } mdOffset={1} >
                        
                        <FormGroup>
                        <Col componentClass={ControlLabel} md={4}  style={mstyle}>{`Alias Name: `}</Col>
                        <div  md={5}  style={mstyle2}>{`${this.state.alias}`}</div>   
                        </FormGroup>
                  
                       
                        <FormGroup>
                        <Col componentClass={ControlLabel} md={4}  style={mstyle}>{`E-mail Account: `}</Col>
                        <div  md={5}  style={mstyle2}>{`${this.state.email}`}</div>   
                        </FormGroup>
                        <FormGroup>
                        <Col componentClass={ControlLabel} md={4}  style={mstyle}>{`Role: `}</Col>
                        <div  md={5}  style={mstyle2}>{`${this.state.role}`}</div>   
                        </FormGroup>
                        <FormGroup>
                        <Col componentClass={ControlLabel} md={4}  style={mstyle}>{`Created Date: `}</Col>
                        <div  md={5}  style={mstyle2}>  </div>   
                        </FormGroup>
                    </Col>
                   
                    <Col  md={ 4 } >
                       
                      
                        </Col>

                </div>
                   
                </Row>
                {/* <Row>
                    <Col md={12} >
                        <div style={mstyle}>{`E-mail Account: ${this.state.email}`}</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        <div style={mstyle}>{`Role: ${this.state.role}`}</div>
                    </Col>
                </Row>
                 */}
            </Grid>
        )
    };
};

export default AccountInfo;