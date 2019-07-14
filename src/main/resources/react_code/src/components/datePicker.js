import React, { Component } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

class DatePickerFormItem extends Component{
    render() {
        const { dataIndex, title, value, getFieldDecorator } = this.props;

        return (
            <Form.Item style={{margin: 0}}>
                {getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            type: 'object',
                            required: true,
                            message: " 请输入" + title
                        }
                    ],
                    initialValue: moment(value, dateFormat)
                })(<DatePicker size="default" />)}
            </Form.Item>
        )
    }
}

export default DatePickerFormItem;