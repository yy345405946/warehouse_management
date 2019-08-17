import React, {Component} from 'react';
import { Transfer, Switch } from 'antd';

class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            targetKeys: [],
            selectedKeys: [],
            disabled: false
        }

        this.dataSource = [
            {
                key: 'useType',
                title: '自用/他用'
            },
            {
                key: 'category',
                title: '分类'
            },
            {
                key: 'vendor',
                title: '供应商'
            },
            {
                key: 'name',
                title: '品名'
            },
            {
                key: 'unit',
                title: '单位'
            },
            {
                key: 'rukuNumber',
                title: '入库数量'
            },
            {
                key: 'cost',
                title: '单价'
            },
            {
                key: 'debate',
                title: '返利'
            },
            {
                key: 'checkoutDate',
                title: '结算时间'
            },
            {
                key: 'chukuNumber',
                title: '出库数量'
            },
            {
                key: 'chukuDate',
                title: '出库时间'
            },
            {
                key: 'price',
                title: '售价'
            }
        ];
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({
            targetKeys: nextTargetKeys
        }, () => {
            this.props.onChange(nextTargetKeys);
        });
    }

    handleSelectChange = (sourceSelectKeys, targetSelectKeys) => {
        this.setState({
            selectedKeys: [...sourceSelectKeys, ...targetSelectKeys]
        });
    }

    handleScroll = (direction, e) => {
    }

    render() {
        const { targetKeys, selectedKeys, disabled } = this.state;

        return (
            <Transfer
                dataSource={this.dataSource}
                title={["Source", "Target"]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.title}
                />
        )
    }

}

export default App;