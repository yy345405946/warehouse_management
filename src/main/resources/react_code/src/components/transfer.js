import React, {Component} from 'react';
import { Transfer, Switch } from 'antd';

const mockData = [];
for(let i = 0; i < 20; i++){
    mockData.push({
        key: i.toString(),
        title: "content",
        description: "description of content"
    });
}

class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            targetKeys: [],
            selectedKeys: [],
            disabled: false
        }
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({
            targetKeys: nextTargetKeys
        });

        console.log("targetKeys: ", nextTargetKeys);
        console.log("direction: ", direction);
        console.log("moveKeys: ", moveKeys);
    }

    handleSelectChange = (sourceSelectKeys, targetSelectKeys) => {
        this.setState({
            selectedKeys: [...sourceSelectKeys, ...targetSelectKeys]
        });

        console.log("sourceSelectedKeys: ", sourceSelectKeys);
        console.log("targetSelectedKeys: ", targetSelectKeys);
    }

    handleScroll = (direction, e) => {
        console.log("direction: ", direction);
        console.log("target: ", e.target);
    }

    render() {
        const { targetKeys, selectedKeys, disabled } = this.state;

        return (
            <Transfer
                dataSource={mockData}
                title={["Source", "Target"]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.title}
                />
        )
    }

}

export default App;