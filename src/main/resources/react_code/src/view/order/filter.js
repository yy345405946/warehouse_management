import React from 'react';
import { Input, Button, DatePicker, Row, Col, Icon } from 'antd';
import InputModal from './inputOrderEditModal';
import OutputModal from './outputOrderEditModal';

const { RangePicker } = DatePicker;

class Filter extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: "",
            keysWordsMessageVisible: false,
            dateMessageVisible: false
        }

        this.params ={
            keyWords: "",
            startDate: "",
            endDate: ""
        };
    }

    search = () => {
        const { onSearch } = this.props;
        if(Object.keys(this.params).length > 0){
            onSearch(this.params);
        }
    }

    reset = () => {
        const { onFetch } = this.props;
        this.globalFilter.setState({
            value: ""
        });
        this.globalRangePicker.picker.setState({
            value: []
        });
        this.params ={
            keyWords: "",
            startDate: "",
            endDate: ""
        };
        onFetch();
    }

    render() {
        const { onAddHandle } = this.props;
        return (
            <div>
                <Row type="flex" style={{marginBottom: 16}}>
                    <Col span={4}>
                        <Input
                            ref={node => (this.globalFilter = node)}
                            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="关键字"
                            onChange={this.keyWordsChange}
                            onPressEnter={this.search}
                            style={{width: '90%'}}
                        />
                    </Col>
                    <Col span={17}>
                    </Col>
                    <Col span={3}>
                        <Col span={12}>
                            <Button type="primary" style={{marginRight: 16}} onClick={this.search}>查询</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" style={{marginRight: 16}} onClick={this.reset}>重置</Button>
                        </Col>
                    </Col>
                </Row>
                <Row type="flex" style={{marginBottom: 16}}>
                    <Col span={21}>
                        <RangePicker ref={node => (this.globalRangePicker = node)} onChange={this.dateChange} size="default" placeholder={["开始日期", "结束日期"]}/>
                    </Col>
                    <Col span={3}>
                        <Col span={12}>
                            <InputModal isEdit={false} onSave={this.props.onSave} onFetch={this.props.onFetch} />
                        </Col>
                        <Col span={12}>
                            <OutputModal isEdit={false} onFetch={this.props.onFetch} />
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }

    keyWordsChange = e => {
        this.params["keyWords"] = e.target.value;
    }

    dateChange = (date, dateString) => {
        this.params["startDate"] = dateString[0];
        this.params["endDate"] = dateString[1];
    }

}

export default Filter;