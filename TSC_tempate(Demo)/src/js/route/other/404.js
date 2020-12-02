import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
import PageTitile from '../../component/pageTitle.js';

class Blank extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render () {
        console.log("404 page");
        return (
            <Grid id='other_404' fluid>
                <Row>
                    <Col md={12}>
                        <PageTitile path="404: Not found page" />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        Sorry, we can not find what you want ...
                    </Col>
                </Row>
            </Grid>
        )
    };
};

export default Blank;