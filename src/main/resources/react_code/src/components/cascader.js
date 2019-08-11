import React, { Component } from 'react';
import { Cascader } from 'antd';
import reqwest from 'reqwest';

class App extends Component{

    constructor(props){
        super(props);

        this.state={
            options: []
        }
    }

    componentDidMount(){
        this.fetch();
    }

    fetch(){
        reqwest({
            url: '/ruku/findForChuku',
            method: 'get',
            type: 'json',
        }).then(response => {
            if(response){
                this.setState({
                    options: response
                });
            }
        });
    }

    onChange = (value, selectedOptions) => {
        const { onChange } = this.props;
        onChange(value);
    }

    filter = (inputValue, path) => {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }

    render(){
        return (
            <Cascader
                options={this.state.options}
                onChange={this.onChange}
                placeholder="请选择"
                showSearch={{filter: this.filter}}
            />
        )
    }

}

export default App;