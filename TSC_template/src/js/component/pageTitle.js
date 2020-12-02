import React, { Component, PropTypes } from 'react';
import {
  Row, Col
} from 'react-bootstrap';

class PageTitile extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    };
    constructor (props) {
        super(props);
        this.env = {
            text: ''
        };
    };
    componentWillMount () {
        this.dataUpdate(this.props);
    };
    componentWillReceiveProps (nextProps) {
        this.dataUpdate(nextProps);
    };
    render () {
        let strPath = this.env.text.split('/');
        let strPathLenght = strPath.length;
        return (
            <ol className='pagetitle'>
                {
                    strPath.map((name,index) => (strPathLenght-1 == index) ? <li><strong>{name}</strong></li> : <li>{name}</li>)
                }
            </ol>
        );
    };

    dataUpdate (source) {
        this.env.text = (source['text'])? source['text']: '';
    };
};

export default PageTitile;