import React, { Component } from 'react';
import { Button, Modal, Tabs } from 'antd';
import reqwest from 'reqwest';
import OutputOrder from './outputOrder';
import FileUpload from '../components/fileUploader';

const { TabPane } = Tabs;

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }

        this.order = this.props.record? Object.assign(this.props.record) : {};
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    update = (dataIndex, value) => {
        if(dataIndex && value){
            this.order[dataIndex] = value;
        }
        console.log("new order" ,this.order);
    }

    handleOk = () => {
        if(Object.keys(this.order).length > 0){
            if(!this.props.isEdit){
                this.order.inputOrderId = this.getInputOrderId();
            }else{
                this.save();
            }
        }
    }

    getInputOrderId = () => {
        const { useType, category, vendor, name, unit } = this.order;

        const params = {
            useType: useType,
            category: category,
            vendor: vendor,
            name: name,
            unit: unit
        }

        reqwest({
            url: '/ruku/findRukuByParams',
            method: 'get',
            data: params,
            contentType: "application/json"
        }).then(response => {
            this.order.inputOrderId = response;
            this.save();
        });
    }

    save = () => {
        let newOrder = {};
        Object.keys(this.order).forEach(key => {
            if( key !== "useType" && key !== "category"
             && key !== "vendor"  && key !== "name"
             && key !== "unit"){
                newOrder[key] = this.order[key];
            }
        });
        reqwest({
            url: '/chuku/save',
            method: 'put',
            data: JSON.stringify(newOrder),
            contentType: "application/json"
        }).then(dataSource => {
            console.log(dataSource)
            this.setState({
                visible: false
            }, () => {
                this.props.onFetch();
            });
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleChange = (key) => {
        console.log("switch tab", key);
    }

    generate = () => {
        const { isEdit, record } = this.props;

        const editModal = (
            <span>
                <a href="javascript:void(0);" onClick={this.showModal}>编辑</a>
                <Modal
                    title="出库"
                    visible={this.state.visible}
                    okText="出库"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <OutputOrder onUpdate={this.update} isEdit={isEdit} record={record}/>
                </Modal>
            </span>
        );

        const modal = (
            <span>
                <Button type="primary" onClick={this.showModal}>出库</Button>
                <Modal
                    title="出库"
                    visible={this.state.visible}
                    okText="出库"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                        <TabPane tab="手动上传" key="1">
                            <OutputOrder onUpdate={this.update} isEdit={isEdit}/>
                        </TabPane>
                        <TabPane tab="自动上传" key="2">
                            <FileUpload url="/upload/chuku" templateUrl="/template/ChukuTemplate.xlsx"/>
                        </TabPane>
                    </Tabs>
                </Modal>
            </span>
        );

        if(isEdit){
            return editModal;
        }else{
            return modal;
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