import React, { Component } from 'react';
import { Input, Form } from 'antd';

class InputFormItem extends Component{
    onChangeHandle = (e) => {
        console.log('form item change:', e);
    }

    render() {
        const { dataIndex, title, value, getFieldDecorator } = this.props;

        return (
            <Form.Item style={{margin: 0}}>
                {getFieldDecorator(dataIndex, {
                    initialValue: value
                })(<Input onChange={this.onChangeHandle} />)}
            </Form.Item>
        )
    }
}

export default InputFormItem;