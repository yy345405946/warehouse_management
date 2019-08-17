import React, { Component } from 'react';
import { Button, Modal, Tabs } from 'antd';
import InputOrder from './inputOrder';
import FileUpload from '../components/fileUploader';

const { TabPane } = Tabs;

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }
        this.newOrder = this.props.record? Object.assign(this.props.record) : {};
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    update = (dataIndex, value) => {
        if(dataIndex && value){
            this.newOrder[dataIndex] = value;
        }
    }

    reset = () => {
        this.newOrder = {};
    }

    handleOk = () => {
        const { onSave } = this.props;
        if(Object.keys(this.newOrder).length > 0){
            onSave(this.newOrder);
            this.setState({
                visible: false
            }, () => {
                this.props.onFetch();
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleChange = (key) => {
        console.log("tab switch", key);
    }

    generate = () => {
        const { isEdit, record } = this.props;

        const editModal = (
            <span>
                <a href="javascript:void(0);" onClick={this.showModal}>编辑</a>
                <Modal
                    title="入库"
                    visible={this.state.visible}
                    okText="入库"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <InputOrder onUpdate={this.update} onReset={this.reset} record={record}/>
                </Modal>
            </span>
        );

        const modal = (
            <span>
                <Button type="primary" onClick={this.showModal}>入库</Button>
                <Modal
                    title="入库"
                    visible={this.state.visible}
                    okText="入库"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                        <TabPane tab="手动上传" key="1">
                            <InputOrder onUpdate={this.update} onReset={this.reset} record={record}/>
                        </TabPane>
                        <TabPane tab="自动上传" key="2">
                            <FileUpload url="/upload/ruku" templateUrl="/template/RukuTemplate.xlsx" onFetch={this.props.onFetch}/>
                        </TabPane>
                    </Tabs>
                </Modal>
            </span>
        );

        if(isEdit){
            return editModal
        }else{
            return modal
        }
    }

    render(){

        return (
            <>
                {this.generate()}
            </>
        );
    }

}

export default App;