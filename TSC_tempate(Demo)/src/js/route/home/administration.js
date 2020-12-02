import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
import PageTitile from '../../component/pageTitle.js';

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render () {
        
        return (
            <Grid id='other_blank' fluid>
                <Row>
                    <Col md={12}>
                        {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                         <PageTitile text={`${'Administration'}`} />
                    </Col>
                </Row>
                
               
            </Grid>
        )
    };
};

export default Administration;