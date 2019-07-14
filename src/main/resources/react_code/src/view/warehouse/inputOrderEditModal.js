import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import InputOrder from './inputOrder';

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
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    generateButton = (isEdit) => {
        if(isEdit){
            return <a href="javascript:void(0);" onClick={this.showModal}>编辑</a>
        }else{
            return <Button type="primary" onClick={this.showModal}>入库</Button>
        }
    }

    render(){
        const { isEdit, record } = this.props;

        return (
            <span>
                {this.generateButton(isEdit)}
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
    }

}

export default App;