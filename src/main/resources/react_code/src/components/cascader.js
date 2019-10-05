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
        }, (err, msg) => {
            console.error(msg);
        }).always(response => {
            //console.log()
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
                style={{width: '100%'}}
            />
        )
    }

}

export default App;