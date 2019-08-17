import React, { Component } from 'react';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const tabIndexMap = {
    useType: '自用/他用',
    category: '分类',
    vendor: '供应商',
    name: '品名',
    unit: '单位',
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
                {
                    tabIndex.map(key => {
                        return <div className="pdf-th">{tabIndexMap[key]}</div>
                    })
                }
                <div className="pdf-header">利润</div>
                </div>
                <div className="pdf-body">
                    {
                        dataSource.map(item => {
                            return (
                                <div className="pdf-tr">
                                    {
                                        tabIndex.map(key => {
                                            if(key === 'rukuDate' || key === 'chukuDate' || key === 'checkoutDate'){
                                                return <div className="pdf-td">{moment(item[key]).format(dateFormat)}</div>
                                            }else{
                                                return <div className="pdf-td">{item[key]}</div>
                                            }
                                        })
                                    }
                                    <div className="pdf-td">{item['profile']}</div>
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