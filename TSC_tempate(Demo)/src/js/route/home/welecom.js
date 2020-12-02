import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
import PageTitile from '../../component/pageTitle.js';
import ServerAPI from '../../backendAPI/server.js';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alias:""
        };
    };

   

    
    render () {
        let login=JSON.parse(ServerAPI.getLoginInfo());
        return (

            <Grid id='other_blank' style={{background:'white',height:'100%',width:'100%'}} fluid>
            <Row>
                    <Col md={12} >
                        {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                         {/* <PageTitile text={`Welcome`} /> */}
                         
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                         <div style={{color:'black',width:'100%','text-align':'center', 'font-size': '35px','margin-top':'50px'}}>{`Hi ${login.alias},`}</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        {/* <PageTitile path="Building page" /> */}
                        <h1 style={{color:'black','font-weight': 'bold',width:'100%','text-align':'center'}}>Welcome</h1>
                    </Col>
                </Row>
             
            </Grid>
        )
    };
};

export default Welcome;