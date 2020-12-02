import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
import PageTitile from '../../component/pageTitle.js';

class Device extends Component {
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
                         <PageTitile text={`${'Project'}/${'device'}`} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <PageTitile path="Building page" />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        Coming soon ...
                    </Col>
                </Row>
            </Grid>
        )
    };
};

export default Device;