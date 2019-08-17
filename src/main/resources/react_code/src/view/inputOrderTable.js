import React, {Component} from 'react';
import { Table, Button, Icon, Popconfirm, Input, Divider } from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import Filter from './filter';
import InputOrderEditModal from './inputOrderEditModal';
import OutputOrderModal from './outOrderModal';

const dateFormat = 'YYYY-MM-DD';

/** Editable Table start **/
class EditableTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            searchText: '',
            loading: false
        }

        this.columns = [
            {
                title: '使用',
                dataIndex: 'useType',
                width: '5%',
                filters: [{ text: '自用', value: '自用' }, { text: '他用', value: '他用' }],
                onFilter: (value, record) => record.useType.indexOf(value) === 0
            },
            {
                title: '商品归类',
                dataIndex: 'category',
                width: '8%',
                ...this.getColumnSearchProps('category'),
            },
            {
                title: '供应商',
                dataIndex: 'vendor',
                width: '7%',
                ...this.getColumnSearchProps('vendor')
            },
            {
                title: '品名',
                dataIndex: 'name',
                width: '8%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '单价',
                dataIndex: 'cost',
                width: '5%',
                sorter: (a, b) => a.cost - b.cost,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: '数量',
                dataIndex: 'number',
                width: '5%',
                sorter: (a, b) => a.number - b.number,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: '余数',
                dataIndex: 'snum',
                width: '5%',
                sorter: (a, b) => a.snum - b.snum,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: '单位',
                dataIndex: 'unit',
                width: '5%',
                ...this.getColumnSearchProps('unit'),
            },
            {
                title: '入库时间',
                dataIndex: 'rukuDate',
                width: '10%',
                sorter: (a, b) => a.rukuDate - b.rukuDate,
                sortDirections: ['descend', 'ascend'],
                render: rukuDate => {
                    if(rukuDate){
                        return moment(rukuDate).format(dateFormat)
                    }
                    return "";
                }
            },
            {
                title: '返利',
                dataIndex: 'rebate',
                width: '5%',
                sorter: (a, b) => a.rebate - b.rebate,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: '总价',
                dataIndex: 'totalCost',
                width: '5%',
                render: (totalCost, record) => {
                    const number = record.number? record.number : 0 ;
                    const cost = record.cost? record.cost : 0;
                    return number * cost;
                }
            },
            {
                title: '结算时间',
                dataIndex: 'checkoutDate',
                width: '7%',
                sorter: (a, b) => a.checkoutDate - b.checkoutDate,
                sortDirections: ['descend', 'ascend'],
                render: rukuDate => {
                    if(rukuDate){
                        return moment(rukuDate).format(dateFormat)
                    }
                    return "";
                }
            },
            {
                title: '备注',
                dataIndex: 'memo',
                width: '9%',
                className: 'swt-memo'
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: '10%',
                render: (text, record) => {
                    return (
                        <span>
                            <OutputOrderModal inputOrderId={record.id} onFetch={this.fetch}/>
                            <Divider type="vertical" />
                            <InputOrderEditModal isEdit={true} record={record} onSave={this.edit} onFetch={this.fetch}/>
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
        this.fetch();
    }

    fetch = () => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/ruku/findAll',
            method: 'get',
            type: 'json',
        }).then(dataSource => {
            this.setState({
                loading: false,
                dataSource: dataSource
            });
        });
    }

    search = (params) => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/ruku/find',
            method: 'get',
            data: {
                ...params
            },
            type: 'json',
        }).then(dataSource => {
            this.setState({
                loading: false,
                dataSource: dataSource
            });
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

    delete = id => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/ruku/deleteById?id='+id,
            method: 'delete'
        }).then(response => {
            if(response){
                this.fetch();
            }
        });
    }

    edit = (record) => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/ruku/save',
            method: 'put',
            data: JSON.stringify(record),
            contentType: 'application/json'
        }).then(response => {
            if(response){
                this.fetch();
            }
        });
    }

    save = (record) => {
        this.setState({
            loading: true
        });
        reqwest({
            url: '/ruku/save',
            method: 'put',
            data: JSON.stringify(record),
            contentType: "application/json"
        }).then(response => {
            if(response){
                this.fetch();
            }
        });
    }

    render() {
        const { dataSource, loading } = this.state;

        return (
            <div>
                <Filter onFetch={this.fetch} onSearch={this.search} onSave={this.save}/>
                <Table
                    className="swt-warehouse-table"
                    bordered
                    dataSource={dataSource}
                    columns={this.columns}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}
/** Editable Table end **/

export default EditableTable;