import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import OutputOrderTable from './outputOrderTable';

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

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render(){
        return (
            <span>
                <a href="javascript:void(0);" onClick={this.showModal}>出库单</a>
                <Modal
                    title="出库单"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <OutputOrderTable inputOrderId={this.props.inputOrderId}/>
                </Modal>
            </span>
        );
    }

}

export default App;