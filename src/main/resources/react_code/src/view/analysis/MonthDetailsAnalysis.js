import React, { Component } from 'react';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const tabIndexMap = {
    chukuDate: '日期',
    name: '品名',
    num: '数量',
    totalPrice: '卖出总价',
    cost: '单个成本价',
    totalCost: '成本总价',
    profile: '利润',
    nonCost: '未结算'
}

class App extends Component{

    render() {

        const { tableDataSource } = this.props;
        const tabIndex = ["chukuDate", "name", "num", "totalPrice", "cost", "totalCost", "profile", "nonCost"];

        let num = 0;
        let totalPrice = 0;
        let cost = 0;
        let totalCost = 0;
        let profile = 0;
        let nonCost = 0;

        tableDataSource.forEach(item => {
            num = num + item.num;
            totalPrice = totalPrice + item.totalPrice;
            cost = cost + item.cost;
            totalCost = totalCost + item.totalCost;
            profile = profile + item.profile;
            nonCost = nonCost + item.nonCost;
        })

        return (
            <div style={{textAlign: 'center'}}>
                <h2>耗材使用成本</h2>
                <div className="pdf-table">
                    <div className="pdf-header">
                        {
                            tabIndex.map(key => {
                                return <div className={"pdf-th " + key}>{tabIndexMap[key]}</div>
                            })
                        }
                    </div>
                    <div className="pdf-body">
                        {
                            tableDataSource.map((item, index) => {
                                return (
                                    <div className="pdf-tr">
                                        {
                                            tabIndex.map(key => {
                                                if(key === 'rukuDate' || key === 'chukuDate' || key === 'checkoutDate'){
                                                    return <div className={"pdf-td " + key}>{moment(item[key]).format(dateFormat)}</div>
                                                }else{
                                                    return <div className={"pdf-td " + key}>{item[key]}</div>
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="pdf-tr">
                            <div className={"pdf-td total"}>总计</div>
                            <div className={"pdf-td total"}></div>
                            <div className={"pdf-td total"}>{num}</div>
                            <div className={"pdf-td total"}>{totalPrice}</div>
                            <div className={"pdf-td total"}>{cost}</div>
                            <div className={"pdf-td total"}>{totalCost}</div>
                            <div className={"pdf-td total"}>{profile}</div>
                            <div className={"pdf-td total"}>{nonCost}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;