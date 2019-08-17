import React, { Component } from 'react';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const tabIndexMap = {
    useType: '自用/他用',
    category: '分类',
    vendor: '供应商',
    name: '品名',
    unit: '单位',
    rukuDate: '入库时间',
    rukuNumber: '入库数量',
    cost: '单价',
    debate: '返利',
    checkoutDate: '结算时间',
    chukuNumber: '出库数量',
    chukuDate: '出库时间',
    price: '售价'
}

class App extends Component{

    render() {

        const { tabIndex, dataSource } = this.props;

        return (
            <div className="pdf-table">
                <div className="pdf-header">
                    <div className="pdf-th rownum"></div>
                    {
                        tabIndex.map(key => {
                            return <div className={"pdf-th " + key}>{tabIndexMap[key]}</div>
                        })
                    }
                    <div className="pdf-th profile">利润</div>
                </div>
                <div className="pdf-body">
                    {
                        dataSource.map((item, index) => {
                            return (
                                <div className="pdf-tr">
                                    <div className="pdf-td rownum">{index + 1}</div>
                                    {
                                        tabIndex.map(key => {
                                            if(key === 'rukuDate' || key === 'chukuDate' || key === 'checkoutDate'){
                                                return <div className={"pdf-td " + key}>{moment(item[key]).format(dateFormat)}</div>
                                            }else{
                                                return <div className={"pdf-td " + key}>{item[key]}</div>
                                            }
                                        })
                                    }
                                    <div className="pdf-td profile">{item['profile']}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default App;