import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Button, Divider } from 'antd';
import reqwest from 'reqwest';

const EditableContext = React.createContext();

class EditableCell extends Component {

    renderCell = ({ getFieldDecorator }) => {
        const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = this.props;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {
                            getFieldDecorator(dataIndex, {
                                rules: [
                                    {
                                        required: true,
                                        message: `Please Input ${title}`
                                    }
                                ],
                                initialValue: record[dataIndex]
                            })(<Input />)
                        }
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        )
    }

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    }
}

class CategoryEditableTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            editingKey: ''
        };
        this.columns = [
            {
                title: '类别',
                dataIndex: 'name',
                width: 100,
                editable: true
            }, {
                title: '耗材类型',
                dataIndex: 'type',
                width: 100,
                editable: true
            }, {
                title: '操作',
                width: 100,
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.id)}
                                    >保存</a>
                                )}
                            </EditableContext.Consumer>
                            <Divider type="vertical" />
                            <Popconfirm title="确定取消？" onConfirm={() => this.cancel(record.key)}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <span>
                                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>编辑</a>
                                <Divider type="vertical" />
                                <Popconfirm title="确定删除?" onConfirm={() => this.delete(record)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        )
                }
            }
        ]
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        reqwest({
            url: '/category/findAll',
            method: 'get',
            type: 'json',
        }).then(dataSource => {
            dataSource.forEach((item, index) => {
                item.key = index;
            });
            console.log('dataSource:', dataSource);
            this.setState({
                dataSource: dataSource,
                editingKey: ''
            });
        });
    }

    handleAdd = () => {
        const { dataSource } = this.state;
        const newData = {
            key: dataSource.length + 1,
            name: '',
            type: ''
        }
        this.setState({
            editingKey: newData.key,
            dataSource: [...dataSource, newData]
        });
    }

    delete = (record) => {
        const id = record.id;
        const key = record.key;
        if(id){
            reqwest({
                url: '/category/deleteById?id='+record.id,
                method: 'delete'
            }).then(response => {
                if(response){
                    this.fetchData();
                }
            });
        }else{
            const dataSource = [...this.state.dataSource];
            this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        }
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    }

    cancel = () => {
        this.setState({ editingKey: '' })
    }

    edit = (key) => {
        this.setState({ editingKey: key });
    }

    save = (form, id) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            row = {...row, id: id};
            reqwest({
                url: '/category/save',
                method: 'put',
                data: JSON.stringify(row),
                contentType: 'application/json'
            }).then(response => {
                if(response){
                    this.fetchData();
                }
            });
        })
    }

    render() {
        const components = {
            body: {
                cell: EditableCell
            }
        }

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            }
        });

        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加
                </Button>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{ onChange: this.cancel }}
                    />
                </EditableContext.Provider>
            </div>
        )
    }

}

const CategoryEditableFormTable = Form.create()(CategoryEditableTable);

export default CategoryEditableFormTable;

