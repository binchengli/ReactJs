import React, { Component, PropTypes } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

/* common */
import Lang from '../common/languages.js';

/*var original = Chart.defaults.global.legend.onClick;
Chart.defaults.global.legend.onClick = function(e, legendItem) 
{
    //var chart = this.chart.chart;
    //var ctx = chart.ctx;

    //original.call(this, e, legendItem);
    var index = legendItem.datasetIndex;
    var ci = this.chart;
    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

    ci.data.datasets.forEach(function(e, i) {
        var meta = ci.getDatasetMeta(i);

        if (i !== index) {
            if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
            } else if (meta.hidden === null) {
                meta.hidden = true;
            }
        } else if (i === index) {
            meta.hidden = null;
        }
    });

    ci.update();
};*/

let SrcSets = [];
let hiddenMeta = [];

class PercentBar extends Component {
    static propTypes = {
        Rowlabels: PropTypes.array.isRequired,
        DataUnits: PropTypes.array.isRequired,
        isLoading: PropTypes.bool
    };

    constructor (props) {
        super (props);
        this.rowlabel = [];
        this.datasets = [];
        this.rgb = [];
        this.palette = [];
        this.isInit = false;
        this.options = {
            legend: {
                display: true,
                position: 'bottom',
                onClick: function(e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;

                    // 原功能：選擇可視項目
                    hiddenMeta = [];
                    ci.data.datasets.forEach(function(e, i) {
                        var meta = ci.getDatasetMeta(i);
                                         
                        if (i === index)
                            meta.hidden = meta.hidden === null ? !meta.hidden : null;

                        hiddenMeta.push(meta.hidden);
                    });
                 
                    // 計算可視項目的總和
                    let sumsets = [];
                    for (let i = 0; i < ci.data.datasets[0].data.length; i++)//7
                    {
                        let sum = 0;
                        for (let j = 0; j < ci.data.datasets.length; j++)//3
                        {
                            if (ci.getDatasetMeta(j).hidden === null)
                                sum += parseInt(SrcSets[j][i]);
                        }
                        sumsets.push(sum);
                    }

                    // 重新設定每個資料百分比
                    for (let i = 0; i < ci.data.datasets[0].data.length; i++)//7
                    {
                        for (let j = 0; j < ci.data.datasets.length; j++)//3
                            ci.data.datasets[j].data[i] = parseInt(SrcSets[j][i])/sumsets[i];  
                    }                     
            
                    ci.update();                  
                  }
            },       
            scales: {
                xAxes: [{
                    ticks: { min: 0,  max: 100, },
                    stacked: true,
                }],
                yAxes: [{ 
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 1,
                        max: 1,
                        reverse: false,
                        callback: function(value, index, values) {
                            return (value*100) + "%";
                        }
                    },
                    barPercentage: 0.6, 
                    stacked: true 
                }]
            },
            elements: {
                rectangle: {
                    borderWidth: 4,
                    borderColor: 'rgb(255, 255, 0)',
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        /*let datasets = ctx.chart.data.datasets;
                        let sum = 0;
                        datasets.map(dataset => {
                            sum += dataset.data[ctx.dataIndex];
                        });*/

                        return SrcSets[ctx.datasetIndex][ctx.dataIndex];//[3][7]         
                    },
                    anchor: 'center',
                    display: 'auto',
                    color: 'black',
                    align:'center'
                }
            },
            tooltips: {
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        var label =  Math.round(tooltipItem.yLabel * 100);
                        label += '%';
                        return label;
                    }
                }
            }
        }
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.isLoading != this.props.isLoading)
        {
            this.dataUpdate(nextProps);
        }
    };

    render () {
        const styles = {
            graphContainer: {
                padding: '15px',
                'text-align': 'center',
                'height':'350px'
            }
        };
        return (
            <div style={styles.graphContainer}>
                {this.showChart()}
            </div>
        );
    };

    dataUpdate (source) {
        // 將hiddenMeta初始化
        if (this.isInit === false & source['DataUnits'].length != 0)
        {
            hiddenMeta = [];
            for (let k=0; k<source['DataUnits'].length; k++)
                hiddenMeta.push(-1);
            this.isInit = true;
        }
        
        this.datasets = [];
        SrcSets = [];
        this.rowlabel = source['Rowlabels'];
        let colorpicker = 0;
        for (let i=0; i<source['DataUnits'].length; i++)
        {
            if(colorpicker == this.palette.length)
                colorpicker = 0;
            this.rgb = [];
            this.getRandomRgb();
        
            let SumData = [];
            for (let j=0; j<source['DataUnits'][i]['data'].length; j++)
            {
                let SumVal = 0;
                for (let k=0; k<source['DataUnits'].length; k++)
                {
                    if (hiddenMeta[k] === -1)
                        SumVal += parseInt(source['DataUnits'][k]['data'][j]);                                     
                }
                SumData.push(parseInt(source['DataUnits'][i]['data'][j]) / SumVal);               
            }

            SrcSets.push(source['DataUnits'][i]['data']);
            this.datasets.push({
                'label': source['DataUnits'][i]['name'],
                'backgroundColor': 'rgba(' + this.palette[colorpicker] + ',' + '0.1)',
                'pointBackgroundColor': 'rgba(255,255,255,1)',
                'pointBorderColor': 'rgba(' + this.palette[colorpicker] + ',' + '1)',
                'borderColor': 'rgba(' + this.palette[colorpicker] + ',' + '1)',
                'borderWidth': 1,
                'data': SumData//source['DataUnits'][i]['data']
            });
            colorpicker ++;
        }
    };

    showChart () {
        let content = [];
        if (this.props.isLoading || !this.rowlabel.length)
        {
            content.push(<span className='accessingTag'><FontAwesome name='spinner' size='lg' pulse />Loading...</span>);
        }
        else
        {
            const chartData = {
                labels: this.rowlabel.slice(0),
                datasets: this.datasets.slice(0)
            };
            content.push(
                <Bar 
                    data={chartData}
                    options={this.options}
                    width={'100%'}
                    height={350}
                />
            );
        }
        return content;
    };

    getRandomRgb () {
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
};
export default PercentBar;