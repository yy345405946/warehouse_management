import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

const tabIndexMap = {
    date: '年份',
    price: '卖耗材收入',
    cost: '耗材成本',
    profile: '耗材利润',
    inProfilePercent: '耗材利润同比上月增长率',
    ysum: '月库存额',
    inYSumPercent: '库存同比上月增长率'
}

class App extends Component{

    render(){
        const {tableDataSource} = this.props;

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
            <div style={{textAlign: 'center'}}>
                <h2>年度汇总</h2>
                <div className="pdf-table">
                    <div className="pdf-header">
                        {
                            Object.keys(tabIndexMap).map(item => {
                                return <div className="pdf-th">{ tabIndexMap[item]}</div>
                            })
                        }
                    </div>
                    <div className="pdf-body">
                        {
                            tableDataSource.map((item, index) => {
                                return (
                                    <div className="pdf-tr">
                                        {
                                            Object.keys(tabIndexMap).map(key => {
                                                if(key === 'date'){
                                                    return <div className={"pdf-td " + key}>{item[key] + '年'}</div>
                                                }else{
                                                    return <div className={"pdf-td " + key}>{item[key]}</div>
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <ReactHighCharts config={config} ref="exportChart"/>
            </div>
        )
    }

}

export default App;