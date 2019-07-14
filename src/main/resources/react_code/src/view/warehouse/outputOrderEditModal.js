import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import reqwest from 'reqwest';
import OutputOrder from './outputOrder';

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
        console.log(this.newOrder);
    }

    handleOk = () => {
        const { inputOrderId, onSave } = this.props;
        if(Object.keys(this.newOrder).length > 0){
            this.newOrder.inputOrderId = inputOrderId;
            if(onSave){
                onSave(this.newOrder);
            }else{
                reqwest({
                    url: '/chukuOrder/save',
                    method: 'put',
                    data: JSON.stringify(this.newOrder),
                    contentType: "application/json"
                }).then(dataSource => {
                    console.log(dataSource)
                    this.setState({
                        visible: false
                    });
                });
            }
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
            return <a href="javascript:void(0);" onClick={this.showModal}>出库</a>
        }

    }

    render(){
        const { isEdit } = this.props;

        return (
            <span>
                {this.generateButton(isEdit)}
                <Modal
                    title="出库"
                    visible={this.state.visible}
                    okText="出库"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <OutputOrder onUpdate={this.update}/>
                </Modal>
            </span>
        );
    }

}

export default App;