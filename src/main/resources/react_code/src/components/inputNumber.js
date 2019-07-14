import React, { Component } from 'react';
import { InputNumber, Form } from 'antd';

class InputNumberFormItem extends Component{
    onChangeHandle = (e) => {
        console.log('form item change:', e);
    }

    render() {
        const { dataIndex, title, value, getFieldDecorator } = this.props;

        return (
            <Form.Item style={{margin: 0}}>
                {getFieldDecorator(dataIndex, {
                    initialValue: value
                })(<InputNumber onChange={this.onChangeHandle} />)}
            </Form.Item>
        )
    }
}

export default InputNumberFormItem;