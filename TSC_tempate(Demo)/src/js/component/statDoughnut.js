import React, { Component, PropTypes } from 'react';
import {
    Panel, Row, Col, Table
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {Doughnut} from 'react-chartjs-2';

/* component */
import Lang from '../common/languages.js';

const colorMap = ['#26B99A', '#3498DB', '#E74C3C', '#BDC3C7', '#9B59B6', '#FFCE56', '#FF6384', '#36A2EB'];

function AddDot (num) {
    var numStr = num.toString();
    var retStr = "";

    for (let i = 0; i < numStr.length; i++)
    {
        retStr += numStr[i];

        if ((numStr.length - i - 1) % 3 == 0 && i != numStr.length - 1)
            retStr += ",";
    }

    return retStr;
}

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
        originalDoughnutDraw.apply(this, arguments);
    
        var chart = this.chart.chart;
        var ctx = chart.ctx;
        var width = chart.width;
        var height = chart.height;

        var fontSize = (height / 90).toFixed(2);
        ctx.font = "bold 22px Verdana";//fontSize + " Courier";
        ctx.textBaseline = "middle";

        // draw number
        var text = AddDot(chart.config.data.text),
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 7;
        ctx.fillStyle = 'black';
        ctx.fillText(text, textX, textY);

        // draw Total
        fontSize = (height / 200).toFixed(2);//114
        ctx.font = '16px Verdana';//fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        text = "Total";
        textX = Math.round((width - ctx.measureText(text).width) / 2);
        textY = height / 2 - 15;//Math.round(height / 2) - ctx.measureText(text).height; 
        ctx.fillStyle = '#00a0e9';//chart.config.data.datasets[0].backgroundColor[1];
        ctx.fillText(text, textX, textY);
    }
});

class StatDoughnut extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        statData: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        isLoading: PropTypes.bool
    };

    constructor (props) {
        super (props);
        this.data = [];
        this.totalNumber = 0;

        this.palette = [];
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.isLoading !== this.props.isLoading)
        {
            this.dataUpdate(nextProps);
        }
    };

    render () {
        return (
            <Panel
                className='statDoughnut-panel' 
                header={<h3>{this.props.title}</h3>}
            >
                <Table style={{'width':'100%', 'overflow':'auto'}}>
                    {this.showTableHeader()}
                    {this.showTableBody()}
                </Table>
            </Panel>
        );
    };

    dataUpdate (source) {
        this.data = source['statData'].slice(0);
    };

    showTableHeader () {
        let data = this.data.slice(0);
        this.totalNumber = 0;
        for (var i=0; i < data.length; i++)
        {
            this.totalNumber += parseInt(data[i].val);
        }
        let content = [];
        content.push(
            <tr>
                <th style={{'width':'50%', 'font-size':'14px'}}>
                    {/*Total: {this.totalNumber}*/}
                </th>
                <th>
                    <Row className='statDoughnut-table-row'>
                        <Col md={5}>
                            {/*this.props.type*/}
                        </Col>
                        <Col md={3} style={{'text-align':'right'}}>
                            {/*Number*/}
                        </Col>
                        <Col md={3} style={{'text-align':'right'}}>
                            {/*Percentage*/}
                        </Col>
                    </Row>
                </th>
            </tr>
        );
        return content;
    };

    getRandomRgb () {
        this.palette = [];
        this.palette.push('41,128,185');
        this.palette.push('26,188,156');
        this.palette.push('192,57,43');
        this.palette.push('241,196,15');
        this.palette.push('230,126,34');
        this.palette.push('155,89,182');
        this.palette.push('52,152,219');
        this.palette.push('22,160,133');
        this.palette.push('231,76,60');
        this.palette.push('243,156,18');
        this.palette.push('211,84,0');
        this.palette.push('142,68,173');
    };

    showTableBody () {
        let chartData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }],
            text:this.totalNumber
        };
        
        this.getRandomRgb();

        this.data.map((entry, index)=>{
            let colorpicker = index;
            if(colorpicker == this.palette.length)
                colorpicker = 0;
                
            chartData.labels.push(entry['model']);
            chartData.datasets[0].data.push(entry['val']);
            chartData.datasets[0].backgroundColor.push('rgba(' + this.palette[colorpicker] + ',' + '1)');//colorMap[index]);
            chartData.datasets[0].hoverBackgroundColor.push('rgba(' + this.palette[colorpicker] + ',' + '1)');
        });

        let content = [];
        if (this.props.isLoading)
        {
            content.push(<tr style={{'text-align':'center'}}><td colspan='4'><span className="statDoughnut-accessingTag"><FontAwesome name='spinner' size='lg' pulse />&nbsp;&nbsp;Loading...</span></td></tr>);
        }
        else
        {
            content.push(
                <tr>
                    <td style={{'padding-top': '20'}}>
                        <div style={{'width':'center'}}>
                            <Doughnut 
                                data={chartData} 
                                width={'150%'}
                                height={'150%'}
                                options={{
                                    legend:false,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        datalabels: {
                                            display: false,
                                        }
                                    },
                                    cutoutPercentage: 60,
                                    animation:{
                                        animateRotate:true,
                                        animateScale:true
                                        /*onComplete: function(animation) {
                                            animation.fillText("100%");
                                        }*/
                                    },
                                    tooltips: {
                                        callbacks: {                                    
                                            label: function(tooltipItem, data) {
                                                var index = parseInt(data['labels'][tooltipItem['index']]);
                                                var label;
                                                
                                                if (index === 0)
                                                    label = 'GOP';
                                                else if (index === 1)
                                                    label = 'GLP';    
                                                else if (index === 2)
                                                    label = 'Security Box'; 
                                                else if (index === 3)
                                                    label = 'GAP'; 
                                                else if (index === 4)
                                                    label = 'GBP'; 
                                                else if (index === 5)
                                                    label = 'GCP'; 
                                                else if (index === 6)
                                                    label = 'GDP'; 
                                                else
                                                    label = index; 

                                                if (label) 
                                                    label += ': ';
                                                
                                                label += data['datasets'][0]['data'][tooltipItem['index']];
                                                return label;
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </td>
                    {this.showBodyContent()}
                </tr>
            );
        }
        return content;
    };

    showBodyContent () {
        let content = [];
        content.push(
            <td>       
            {
                this.data.map((entry, index)=>{
                    let content_tr = [];
                    let percentage = (parseInt(entry['val'])/this.totalNumber)*100;
                    content_tr.push(
                        <Row className='statDoughnut-table-row'>
                            <Col md={6}>
                                <span className='circle-icon' style={{'background-color': 'rgba(' + this.palette[index] + ',' + '1)'}}></span><span>{this._changeModelName(entry['model'])}</span>
                            </Col>
                            <Col md={3} style={{'text-align':'right'}}>
                                {entry['val']}
                            </Col>
                            <Col md={3} style={{'text-align':'right'}}>
                                {percentage.toFixed(1)}%
                            </Col>
                        </Row>
                    );
                    return content_tr;
                })
            }
            </td>
        );
        return content;
    };

    _changeModelName(source)
    {
        switch(source)
        {
            case '0':
                return 'GOP';
            case '1':
                return 'GLP';
            case '2':
                return 'Security Box';
            case '3':
                return 'GAP';
            case '4':
                return 'GBP';
            case '5':
                return 'GCP';
            case '6':
                return 'GDP';
            default:
                return source;
        }
    };
};

export default StatDoughnut;