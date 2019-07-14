import React, {Component} from 'react';
import { Table, Button, Icon, Popconfirm, Input, Form, Divider } from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import OutputOrderEditModal from './outputOrderEditModal';

const dateFormat = 'YYYY-MM-DD';

/** Editable Table start **/
class OutputEditableTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            searchText: '',
            loading: false
        }

        this.columns = [
            {
                title: '售单价',
                dataIndex: 'price',
                width: '10%'
            },
            {
                title: '数量',
                dataIndex: 'number',
                width: '10%',
                ...this.getColumnSearchProps('number'),
            },
            {
                title: '销售总价',
                width: '10%',
                render: (text, record) => {
                    const price = typeof record.price === "number"? record.price : Number(record.price);
                    const num = typeof record.number === "number"? record.number : Number(record.number);
                    return price * num;
                }
            },
            {
                title: '出库日期',
                dataIndex: 'chukuDate',
                width: '11%',
                render: chukuDate => {
                    if(chukuDate){
                        return moment(chukuDate).format(dateFormat)
                    }
                    return "";
                }
            },
            {
                title: '备注',
                dataIndex: 'memo',
                width: '10%'
            },
            {
                title: '操作',
                width: '12%',
                render: (text, record) => {
                    return (
                        <span>
                            <OutputOrderEditModal isEdit={true} />
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.id)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ];
    }

    componentDidMount() {
        this.fetch(this.props.inputOrderId);
    }

    delete = (id) => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/chukuOrder/deleteById?id='+id,
            method: 'delete'
        }).then(response => {
            if(response){
                const dataSource = [...this.state.dataSource];
                this.setState({
                    loading: false,
                    dataSource: dataSource.filter(item => item.id !== id)
                });
            }
        });
    }

    fetch = (inputOrderId) => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/chukuOrder/findByInputOrderId?inputOrderId='+inputOrderId,
            method: 'get',
            type: 'json',
        }).then(dataSource => {
            console.log(dataSource)
            this.setState({
                loading: false,
                dataSource: dataSource
            });
        });
    }

    edit = (record) => {
        const { dataSource } = this.state;
        reqwest({
            url: '/chukuOrder/save',
            method: 'put',
            data: JSON.stringify(record),
            contentType: "application/json"
        }).then(response => {
            console.log(dataSource)
            if(response){
                const newDataSource = [...this.state.dataSource];
                const index = newDataSource.findIndex(item => response.id === item.id);
                if(index > -1){
                    const item = newDataSource[index];
                    newDataSource.splice(index, 1, {
                        ...item,
                        ...response
                    });
                    this.setState({
                        loading: false,
                        dataSource: newDataSource
                    });
                }else{
                    this.setState({
                        loading: false,
                        dataSource: [response, ...newDataSource]
                    });
                }
            }
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input ref={node => { this.searchInput = node; }}
                    placeholder={"Search "+dataIndex}
                    value={selectedKeys[0]}
                    onChange={e => {setSelectedKeys(e.target.value? [e.target.value] : [])}}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered? '#1890ff' : undefined}} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if(visible){
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({
            searchText: ''
        });
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        });
    }

    render() {
        const { loading, dataSource } = this.state;

        return (
            <Table
                bordered
                dataSource={dataSource}
                columns={this.columns}
                loading={loading}
            />
        )
    }
}

export default OutputEditableTable;