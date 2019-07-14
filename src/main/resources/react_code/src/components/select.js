import React, { Component } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;

class SelectFormItem extends Component{
    render() {
        const { dataIndex, title, value, getFieldDecorator } = this.props;

        return (
            <Form.Item style={{margin: 0}}>
                {getFieldDecorator(dataIndex, {
                    initialValue: value
                })(<Select style={{ width: "90%" }}>
                        <Option value="自用">自用</Option>
                        <Option value="他用">他用</Option>
                    </Select>)}
            </Form.Item>
        )
    }
}

export default SelectFormItem;