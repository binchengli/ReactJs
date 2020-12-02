import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
import PageTitile from '../../component/pageTitle.js';

class Welecom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render () {
        
        return (

            <Grid id='other_blank' style={{background:'white',height:'100%',width:'100%'}} fluid>
                <Row>
                    <Col md={12} >
                        {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                         {/* <PageTitile text={`${'Project'}/${'setting'}`} /> */}
                         <div style={{color:'black',width:'100%','text-align':'center', 'font-size': '35px','margin-top':'50px'}}>Hi Smart Vision Direct,</div>
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

export default Welecom;