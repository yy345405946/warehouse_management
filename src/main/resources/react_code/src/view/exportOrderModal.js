import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import reqwest from 'reqwest';
import Transfer from '../components/transfer';
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
        document.querySelector("input.pdf-html").value = document.querySelector("div#pdf-container").outerHTML;
        document.querySelector("#pdf-container-parent form").submit();
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
        debugger;
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

        return (
            <span>
                <Button type="primary" onClick={this.showModal}>报表</Button>
                <Modal
                    title="导出"
                    visible={visible}
                    okText="导出"
                    cancelText="取消"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Transfer onChange={this.handleTransferChange}/>
                    <PdfContainer tableDataSource={tableDataSource} chartDataSource={chartDataSource} tabIndex={tabIndex}/>
                </Modal>
            </span>
        );
    }

}

export default App;