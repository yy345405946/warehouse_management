import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import Transfer from '../components/transfer';
import PdfContainer from '../components/pdfContainer';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    reset = () => {
        this.newOrder = {};
    }

    handleOk = () => {
        document.querySelector("#pdf-container-parent form").submit();
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render(){

        return (
            <span>
                <Button type="primary" onClick={this.showModal}>报表</Button>
                <Modal
                    title="导出"
                    visible={this.state.visible}
                    okText="导出"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Transfer />
                    <PdfContainer />
                </Modal>
            </span>
        );
    }

}

export default App;