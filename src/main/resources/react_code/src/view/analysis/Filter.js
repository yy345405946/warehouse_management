import React, { Component } from 'react';
import { Row, Col, Select, Button, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export default class ExportFilter extends Component{
    constructor(props){
        super(props);

        const today = moment().format('YYYY-MM-DD');

        this.params ={
            useType: "",
            startDate: props.isSummary === 'year'? moment().startOf('year').format('YYYY-MM-DD') : moment().startOf('month').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD')
        };
    }

    componentDidMount(){
        this.props.onSearch(this.params);
    }

    handleDateChange = (date, dateString) => {
        this.params["startDate"] = dateString[0];
        this.params["endDate"] = dateString[1];
    }

    handleUseTypeChange = (e) => {
        this.params["useType"] = e;
    } 

    handleClick = () => {
        const { onSearch } = this.props;
        onSearch(this.params);
    }

    handleReset = () => {
        this.params["useType"] = "";
        this.params["startDate"] = "";
        this.params["endDate"] = "";
        if(this.props.onSearch){
            this.props.onSearch(this.params);
        }
    }

    downloadPdf = () => {
        document.querySelector("#pdf-container-parent-chart input.pdf-html").value = document.querySelector("div#pdf-container-chart").outerHTML;
        document.querySelector("#pdf-container-parent-chart form").submit();
    }

    render(){
        const { isSummary } = this.props;

        return (
            <Row type="flex" style={{marginBottom: 20}}>
                <Col span={2}>
                    <Select defaultValue="" onChange={this.handleUseTypeChange} style={{width: '90%'}}>
                        <Option value="">所有</Option>
                        <Option value="自用">自用</Option>
                        <Option value="他用">他用</Option>
                    </Select>
                </Col>
                <Col span={8}>
                    <RangePicker 
                        ref={node => (this.globalRangePicker = node)} 
                        onChange={this.handleDateChange} 
                        size="default" 
                        placeholder={["开始日期", "结束日期"]}
                        defaultValue={[isSummary === 'year' || isSummary === 'month'? moment().startOf('year') : moment().startOf('month'), moment()]}
                        format={dateFormat}
                    />
                </Col>
                <Col span={10}></Col>
                <Col span={4}>
                    <Col span={8}>
                        <Button type="primary" onClick={this.handleClick}>查询</Button>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={this.downloadPdf}>下载PDF</Button>
                    </Col>
                </Col>
            </Row>
        )
    }

}