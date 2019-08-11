import React, { Component } from 'react';
import { Row, Col, Input, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import Cascader from '../components/cascader';

const dateFormat = 'YYYY-MM-DD';

class OutputOrder extends Component{

    render() {
        const { record, isEdit } = this.props;
        return (
            <div>
                {
                    !isEdit? (
                        <Row>
                            <div>入库单</div>
                            <Cascader style={{width: "100%"}} onChange={this.inputOrderChange}/>
                        </Row>
                    ) : (<span></span>)
                }

                <Row gutter={64}>
                    <Col span={12}>
                        <div>售单价</div>
                        <InputNumber style={{ width: "100%" }} defaultValue={record? record.price : ""} onChange={this.priceChange}/>
                    </Col>
                    <Col span={12}>
                        <div>数量</div>
                        <InputNumber style={{ width: "100%" }} defaultValue={record? record.number : ""} onChange={this.numberChange}/>
                    </Col>
                </Row>
                <Row gutter={64}>
                    <Col span={12}>
                        <div>出库日期</div>
                        {
                            record && record.chukuDate? (
                                <DatePicker
                                    style={{ width: "100%" }}
                                    defaultValue={moment(record.chukuDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={this.priceChange}
                                />
                            ) : (
                                <DatePicker style={{ width: "100%" }} format={dateFormat} onChange={this.chukuDateChange}/>
                            )
                        }
                    </Col>
                    <Col span={12}>
                        <div>备注</div>
                        <Input defaultValue={record? record.memo : ""} onChange={this.memoChange}/>
                    </Col>
                </Row>
            </div>
        )
    }

    inputOrderChange = array => {
        const { onUpdate } = this.props;

        onUpdate("useType", array[0]);
        onUpdate("category", array[1]);
        onUpdate("vendor", array[2]);
        onUpdate("name", array[3]);
        onUpdate("unit", array[4]);
    }

    priceChange = value => {
        const { onUpdate } = this.props;
        onUpdate("price", value);
    }

    numberChange = value => {
        const { onUpdate } = this.props;
        onUpdate("number", value);
    }

    chukuDateChange = (date, dateString) => {
        const { onUpdate } = this.props;
        onUpdate("chukuDate", dateString);
    }

    memoChange = e => {
        const { onUpdate } = this.props;
        onUpdate("memo", e.target.value);
    }
}

export default OutputOrder;