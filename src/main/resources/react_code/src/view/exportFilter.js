import React, { Component } from 'react';
import { Row, Col, Select, Button, DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
    { value: 'useType', label: '自用/他用' },
    { value: 'category', label: '分类' },
    { value: 'vendor', label: '供应商' },
    { value: 'name', label: '品名' },
    { value: 'unit', label: '单位' },
    { value: 'rukuDate', label: '入库时间' },
    { value: 'rukuNumber', label: '入库数量' },
    { value: 'cost', label: '单价' },
    { value: 'debate', label: '返利' },
    { value: 'checkoutDate', label: '结算时间' },
    { value: 'chukuNumber', label: '出库数量' },
    { value: 'chukuDate', label: '出库时间' },
    { value: 'price', label: '售价' }
];

export default class ExportFilter extends Component{
    constructor(props){
        super(props);

        this.params ={
            startDate: "",
            endDate: ""
        };
        this.defaultColumns = ["useType","category","vendor","name","unit","rukuDate","rukuNumber","cost","debate","checkoutDate","chukuNumber","chukuDate","price"]
    }

    dateChange = (date, dateString) => {
        this.params["startDate"] = dateString[0];
        this.params["endDate"] = dateString[1];
    }

    render(){
        return (
            <div>
                <Row style={{marginBottom: 8}}>
                    <Col span={2}>
                        <Select defaultValue="自用">
                            <Option value="自用">自用</Option>
                            <Option value="他用">他用</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <RangePicker ref={node => (this.globalRangePicker = node)} onChange={this.dateChange} size="default" placeholder={["开始日期", "结束日期"]}/>
                    </Col>
                    <Col span={14}></Col>
                </Row>
                <Row>
                    <Col span={23}>
                        <Select mode="tags" style={{width: '98%'}} defaultValue={this.defaultColumns}>
                            {
                                columns.map(item => {
                                    return <Option value={item.value}>{item.label}</Option>
                                })
                            }
                        </Select>
                        
                    </Col>
                    <Col span={1} style={{textAlign: 'right'}}>
                        <Button type="primary">查询</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}