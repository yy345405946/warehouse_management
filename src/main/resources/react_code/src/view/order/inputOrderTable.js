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
                dataIndex: 'categoryStr',
                width: '8%',
                ...this.getColumnSearchProps('categoryStr')
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
                ...this.getColumnSearchProps('name')
            },
            {
                title: '单价',
                dataIndex: 'cost',
                width: '5%',
                sorter: (a, b) => a.cost - b.cost,
                sortDirections: ['ascend']
            },
            {
                title: '数量',
                dataIndex: 'number',
                width: '5%',
                sorter: (a, b) => a.number - b.number,
                sortDirections: ['descend', 'ascend'],
                render: number => (<span style={{color: number <=0? 'red' : '#333', fontWeight: number <=0? 700 : 400}}>{number}</span>)
            },
            {
                title: '余数',
                dataIndex: 'snum',
                width: '5%',
                sorter: (a, b) => a.snum - b.snum,
                sortDirections: ['descend', 'ascend'],
                render: snum => (<span style={{color: snum <=0? 'red' : '#333', fontWeight: snum <=0? 700 : 400}}>{snum}</span>)
            },
            {
                title: '单位',
                dataIndex: 'unit',
                width: '5%',
                ...this.getColumnSearchProps('unit')
            },
            {
                title: '入库时间',
                dataIndex: 'rukuDate',
                width: '8%',
                sorter: (a, b) => {
                    if(a.rukuDate && b.rukuDate){
                        return moment(a.rukuDate, dateFormat) - moment(b.rukuDate, dateFormat) >0;
                    }else{
                        return true;
                    }
                },
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
                sorter: (a, b) => {
                    if(a.checkoutDate && b.checkoutDate){
                        return moment(a.checkoutDate, dateFormat) - moment(b.checkoutDate, dateFormat) > 0
                    }else{
                        return false;
                    }
                },
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
                width: '9%'
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
                dataSource: dataSource
            });
        }, (err, msg) => {
            console.error(msg);
        }).always(response => {
            this.setState({
                loading: false
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
                dataSource: dataSource
            });
        }, (err, msg) => {
            console.error(msg);
        }).always(response => {
            this.setState({
                loading: false
            })
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input ref={node => { this.searchInput = node; }}
                    placeholder={"查询"}
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
                    查询
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
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
        }, (err, msg) => {
            console.error(msg)
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
        }, (err, msg) => {
            console.error(msg);
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
        }, (err, msg) => {
            console.error(msg);
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