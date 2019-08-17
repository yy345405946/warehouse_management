import React, { Component } from 'react';
import { Row, Col, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

class InputOrder extends Component{

    reset = () => {
        const { onReset } = this.props;
        onReset();
        this.useType.setState({value: "自用"});
        this.category.setState({value: ""});
        this.vendor.setState({value: ""});
        this.name.setState({value: ""});
        this.cost.setState({value: ""});
        this.number.setState({value: ""});
        this.unit.setState({value: ""});
        this.rukuDate.picker.setState({value: ""});
        this.debate.setState({value: ""});
        this.checkoutDate.picker.setState({value: ""});
        this.memo.setState({value: ""})
    }

    render() {
        const { record } = this.props;

        return (
            <div>
                <Row>
                    <Col span={22}></Col>
                    <Col span={2}><a href="javascript:void(0);" onClick={this.reset}>重置</a></Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <div>使用</div>
                        <Select style={{ width: "100%" }} ref={node => (this.useType = node)} defaultValue={record? record.useType : ""} onChange={this.useTypeChange}>
                            <Option value="自用">自用</Option>
                            <Option value="他用">他用</Option>
                        </Select>
                    </Col>
                    <Col span={12}>
                        <div>商品归类</div>
                        <Input ref={node => (this.category = node)} defaultValue={record? record.category : ""} onChange={this.categoryChange}/>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <div>供应商</div>
                        <Input ref={node => (this.vendor = node)} defaultValue={record? record.vendor : ""} onChange={this.vendorChange}/>
                    </Col>
                    <Col span={12}>
                        <div>品名</div>
                        <Input ref={node => (this.name = node)} defaultValue={record? record.name : ""} onChange={this.nameChange}/>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <div>单价</div>
                        <InputNumber ref={node => (this.cost = node)} style={{ width: "100%" }} defaultValue={record? record.cost : ""} onChange={this.costChange}/>
                    </Col>
                    <Col span={12}>
                        <div>数量</div>
                        <InputNumber ref={node => (this.number = node)} style={{ width: "100%" }} defaultValue={record? record.number : ""} onChange={this.numberChange}/>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <div>单位</div>
                        <Input ref={node => (this.unit = node)} defaultValue={record? record.unit : ""} onChange={this.unitChange}/>
                    </Col>
                    <Col span={12}>
                        <div>入库时间</div>
                        {
                            record && record.rukuDate? (
                                <DatePicker style={{ width: "100%" }} placeholder="选择日期" ref={node => (this.rukuDate = node)} defaultValue={moment(record.rukuDate, dateFormat)} onChange={this.rukuDateChange} />
                            ) : (
                                <DatePicker style={{ width: "100%" }} placeholder="选择日期" ref={node => (this.rukuDate = node)} onChange={this.rukuDateChange} />
                            )
                        }
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <div>返利</div>
                        <InputNumber style={{ width: "100%" }} ref={node => (this.debate = node)} defaultValue={record? record.debate : ""} onChange={this.debateChange}/>
                    </Col>
                    <Col span={12}>
                        <div>结算时间</div>
                        {
                            record && record.checkoutDate? (
                                <DatePicker
                                    placeholder="选择日期"
                                    style={{ width: "100%" }}
                                    ref={node => (this.checkoutDate = node)}
                                    defaultValue={moment(record.checkoutDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={this.checkoutDateChange}
                                />
                            ) : (
                                <DatePicker style={{ width: "100%" }} placeholder="选择日期" ref={node => (this.checkoutDate = node)} format={dateFormat} onChange={this.checkoutDateChange} />
                            )
                        }
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col>
                        <div>备注</div>
                        <Input ref={node => (this.memo = node)} defaultValue={record? record.memo : ""} onChange={this.memoChange}/>
                    </Col>
                </Row>
            </div>
        )
    }

    useTypeChange = value => {
        const { onUpdate } = this.props;
        onUpdate("useType", value);
    }

    categoryChange = e => {
        const { onUpdate } = this.props;
        onUpdate("category", e.target.value);
    }

    vendorChange = e => {
        const { onUpdate } = this.props;
        onUpdate("vendor", e.target.value);
    }

    nameChange = e => {
        const { onUpdate } = this.props;
        onUpdate("name", e.target.value);
    }

    costChange = value => {
        const { onUpdate } = this.props;
        onUpdate("cost", value);
    }

    numberChange = value => {
        const { onUpdate } = this.props;
        onUpdate("number", value);
    }

    unitChange = e => {
        const { onUpdate } = this.props;
        onUpdate("unit", e.target.value);
    }

    rukuDateChange = (date, dateString) => {
        const { onUpdate } = this.props;
        onUpdate("rukuDate", dateString);
    }

    debateChange = value => {
        const { onUpdate } = this.props;
        onUpdate("debate", value);
    }

    checkoutDateChange = (date, dateString) => {
        const { onUpdate } = this.props;
        onUpdate("checkoutDate", dateString);
    }

    memoChange = e => {
        const { onUpdate } = this.props;
        onUpdate("memo", e.target.value);
    }
}

export default InputOrder;