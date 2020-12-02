import React, { Component, PropTypes } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {Line} from 'react-chartjs-2';

/* common */
import Lang from '../common/languages.js';

var insideFontColor = '0,0,0';//'255,255,255';
// Font color for values above the bar
var outsideFontColor = '0,0,0'//'255,255,255';
// How close to the top edge bar can be before the value is put inside it
var topThreshold = 25;

var modifyCtx = function(ctx) {
  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  return ctx;
};

var fadeIn = function(ctx, obj, x, y, black, step) {
  var ctx = modifyCtx(ctx);
  var alpha = 0;
  ctx.fillStyle = black ? 'rgba(' + outsideFontColor + ',' + step + ')' : 'rgba(' + insideFontColor + ',' + step + ')';
  ctx.fillText(obj, x, y);
};

var drawValue = function(context, step) {
  var ctx = context.chart.ctx;

  context.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      console.log("datasetIndex = "+i+", model.y = "+model.y)
      var textY = (model.y > topThreshold) ? model.y - 3 : model.y + 20;
      fadeIn(ctx, dataset.data[i], model.x, textY, model.y > topThreshold, step);
    }
  });
};

class LineChart extends Component {
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
        this.options = {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true
                }
            },
            responsive: true, maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    display: 'auto',
                    color: 'black',
                    align: function(ctx) {
                        var model = ctx.dataset._meta[Object.keys(ctx.dataset._meta)[0]].data[ctx.dataIndex]._model;
                        //var scale_max = ctx.dataset._meta[Object.keys(ctx.dataset._meta)[0]].data[ctx.dataIndex]._yScale.maxHeight;
                        //console.log("datasetIndex = "+ctx.datasetIndex+", model.y = "+(scale_max - model.y) / scale_max)
                        if (model.y < topThreshold)
                            return 'bottom';
                        else
                            return 'top';
                      }
                }
            },
            tooltips: {
                enabled: true
            }/*,
            hover: {
                animationDuration: 0
            },
            animation: {
                onComplete: function() {
                  this.chart.controller.draw();
                  drawValue(this, 1);
                },
                onProgress: function(state) {
                  var animation = state.animationObject;
                  drawValue(this, animation.currentStep / animation.numSteps);
                }
            }*/
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
        this.datasets = [];
        this.rowlabel = source['Rowlabels'];
        let colorpicker = 0;

        for (let i=0; i<source['DataUnits'].length; i++)
        {
            if(colorpicker == this.palette.length)
                colorpicker = 0;

            this.rgb = [];
            this.getRandomRgb();
            this.datasets.push({
                'label': source['DataUnits'][i]['name'],
                'backgroundColor': 'rgba(' + this.palette[colorpicker] + ',' + '0.1)',
                'pointBackgroundColor': 'rgba(255,255,255,1)',
                'pointBorderColor': 'rgba(' + this.palette[colorpicker] + ',' + '1)',
                'borderColor': 'rgba(' + this.palette[colorpicker] + ',' + '1)',
                'borderWidth': 1,
                'data': source['DataUnits'][i]['data']
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
                <Line 
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
};
export default LineChart;