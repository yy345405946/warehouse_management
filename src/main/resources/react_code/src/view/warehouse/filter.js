import React from 'react';
import { Input, Button, DatePicker, Row, Col } from 'antd';
import InputOrderEditModal from './inputOrderEditModal';
import OutputOrderEditModal from './outputOrderEditModal';

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
                <Row style={{marginBottom: 16}}>
                    <Col span={3}>
                        <Input
                            ref={node => (this.globalFilter = node)}
                            placeholder="关键字"
                            onChange={this.keyWordsChange}
                        />
                    </Col>
                    <Col span={18}>
                    </Col>
                    <Col span={1}>
                        <Button type="primary" style={{marginRight: 16}} onClick={this.search}>查询</Button>
                    </Col>
                    <Col span={1}>
                        <Button type="primary" style={{marginRight: 16}} onClick={this.reset}>重置</Button>
                    </Col>
                    <Col span={1}>
                        <InputOrderEditModal onSave={this.props.onSave}/>
                    </Col>
                </Row>
                <Row type="flex" style={{marginBottom: 16}}>
                    <Col span={23}>
                        <RangePicker ref={node => (this.globalRangePicker = node)} onChange={this.dateChange} size="default" />
                    </Col>
                    <Col span={1}>
                        <Button type="primary" style={{marginRight: 16}}>报表</Button>
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