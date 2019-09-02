import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import reqwest from 'reqwest';
import ExportFilter from './exportFilter';
import PdfContainer from './exportPdfContainer';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false,
            tabIndex: ['useType','category','vendor','name','unit','rukuDate','rukuNumber','cost','debate','checkoutDate','chukuNumber','chukuDate','price'],
            tableDataSource: [],
            chartDataSource: []
        }
    }

    showModal = () => {
        this.fetchData();
        this.setState({
            visible: true
        });
    }

    reset = () => {
        this.newOrder = {};
    }

    handleOk = () => {
        const { isSummary } = this.props;
        if(isSummary){
            document.querySelector("#pdf-container-parent-chart input.pdf-html").value = document.querySelector("div#pdf-container-chart").outerHTML;
            document.querySelector("#pdf-container-parent-chart form").submit();
        }else{
            document.querySelector("#pdf-container-parent-table input.pdf-html").value = document.querySelector("div#pdf-container-table").outerHTML;
            document.querySelector("#pdf-container-parent-table form").submit();
        }
        this.setState( { visible: false } );
    }

    handleCancel = () => {
        this.setState( { visible: false } );
    }

    handleTransferChange = (targetKeys) => {
        this.setState( { tabIndex: targetKeys } );
    }

    fetchData = () => {
        const { keyWords, startDate, endDate } = this.props.params;
        reqwest({
            url: '/export/profile?keyWords='+keyWords+"&startDate="+startDate+"&endDate="+endDate,
            method: 'get',
            type: 'json',
        }).then(dataSource => {
            this.setState({
                tableDataSource: dataSource
            });
        });
    }

    render(){
        const { visible, tableDataSource, chartDataSource, tabIndex } = this.state;
        const { isSummary } = this.props;

        const btnText = isSummary? "汇总" : "明细";
        return (
            <span>
                <Button type="primary" onClick={this.showModal}>{btnText}</Button>
                <Modal
                    title="导出"
                    visible={visible}
                    okText="导出"
                    cancelText="取消"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="80%"
                >
                    <ExportFilter />
                    <PdfContainer isSummary={isSummary} tableDataSource={tableDataSource} chartDataSource={chartDataSource} tabIndex={tabIndex}/>
                </Modal>
            </span>
        );
    }

}

export default App;