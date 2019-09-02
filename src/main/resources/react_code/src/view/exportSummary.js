import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

class App extends Component{

    render(){
        const config = {
            chart: {
                type: 'pie',
                width: 800
            },
            title: {
                text: '利润图'
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '利润比例',
                data: [
                    ['四物堂监制', 45.0],
                    ['一号提斗', 45.0],
                    ['墨汁', 10.0]
                ]
            }]
        }

        return (
            <ReactHighCharts config={config} ref="exportChart"/>
        )
    }

}

export default App;