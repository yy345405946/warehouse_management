import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import reqwest from 'reqwest';
import CategoryTable from './categoryTable';

class App extends Component{
    constructor(props){
        super(props);

        this.state = { visible: false }
    }

    showModal = () => {
        this.setState( { visible: true } );
    }

    handleOk = () => {
        this.setState( { visible: false } );
    }

    handleCancel = () => {
        this.setState( { visible: false } );
    }

    render(){
        return (
            <span>
                <Button type="primary" onClick={this.showModal}>字典</Button>
                <Modal
                    title="类别维护"
                    visible={this.state.visible}
                    cancelText="关闭"
                    onCancel={this.handleCancel}
                >
                    {
                        this.state.visible? (
                            <CategoryTable />
                        ) : (<></>)
                    }
                </Modal>
            </span>
        );
    }

}

export default App;