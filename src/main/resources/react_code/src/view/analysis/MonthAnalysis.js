import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';

const tabIndexMap = {
    date: '月份',
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

        let profileData = [];
        let ynumData = [];

        tableDataSource.forEach(item => {
            profileData.push([item.date, item.profile]);
            ynumData.push([item.date, item.ysum]);
        })

        const config = {
            chart: {
                type: 'bar',
                width: '1000'
            },
            title: {
                text: '年度汇总'
            },
            series: [{
                type: 'line',
                name: '耗材利润',
                data: profileData
            },{
                type: 'line',
                name: '月库存额',
                data: ynumData
            }]
        }

        return (
            <div style={{textAlign: 'center'}}>
                <h2>2019年1- 12月物喜铺汇总</h2>
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
                                                    return <div className={"pdf-td " + key}>{item[key] + '月'}</div>
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