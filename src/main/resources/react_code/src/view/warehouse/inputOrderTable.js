import React, {Component} from 'react';
import { Table, Button, Icon, Popconfirm, Input, Divider } from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import Filter from './filter';
import InputOrderEditModal from './inputOrderEditModal';
import OutputOrderEditModal from './outputOrderEditModal';
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
//            {
//                title: '',
//                dataIndex: 'id',
//                width: '2%'
//            },
            {
                title: '使用',
                dataIndex: 'useType',
                width: '5%',
                filters: [{ text: '自用', value: '自用' }, { text: '他用', value: '他用' }],
                ...this.getColumnSearchProps('useType'),
            },
            {
                title: '商品归类',
                dataIndex: 'categroy',
                width: '8%',
                ...this.getColumnSearchProps('categroy'),
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
                sorter: true
            },
            {
                title: '数量',
                dataIndex: 'number',
                width: '5%',
                sorter: true
            },
            {
                title: '余数',
                dataIndex: 'snum',
                width: '5%',
                sorter: true
            },
            {
                title: '单位',
                dataIndex: 'unit',
                width: '5%'
            },
            {
                title: '入库时间',
                dataIndex: 'rukuDate',
                width: '10%',
                sorter: true,
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
                sorter: true
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
                sorter: true,
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
                width: '9%'
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: '14%',
                render: (text, record) => {

                    return (
                        <span>
                            {
                                record.snum > 0? (
                                    <span>
                                        <OutputOrderEditModal inputOrderId={record.id}/>
                                        <Divider type="vertical" />
                                    </span>
                                ) : (
                                    <span></span>
                                )
                            }
                            <OutputOrderModal inputOrderId={record.id}/>
                            <Divider type="vertical" />
                            <InputOrderEditModal isEdit={true} record={record} onSave={this.edit}/>
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
            url: '/rukuOrder/findAll',
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
            url: '/rukuOrder/find',
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
            url: '/rukuOrder/deleteById?id='+id,
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

    edit = (record) => {
        debugger;
        this.setState({
            loading: true
        });
        reqwest({
            url: '/rukuOrder/save',
            method: 'put',
            data: JSON.stringify(record),
            contentType: 'application/json'
        }).then(response => {
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

    save = (record) => {
        debugger;
        this.setState({
            loading: true
        });
        reqwest({
            url: '/rukuOrder/save',
            method: 'put',
            data: JSON.stringify(record),
            contentType: "application/json"
        }).then(response => {
            if(response){
                console.log(response);
                const newDataSource = [...this.state.dataSource];
                this.setState({
                    loading: false,
                    dataSource: [response, ...newDataSource]
                });
            }
        });
    }

    render() {
        const { dataSource, loading } = this.state;

        return (
            <div>
                <Filter onFetch={this.fetch} onSearch={this.search} onSave={this.save}/>
                <Table
                    className="components-table-demo-nested"
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