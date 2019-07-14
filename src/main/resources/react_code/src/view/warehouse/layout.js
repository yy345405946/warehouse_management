import React from 'react';
import { Layout, Menu, Breadcrumb, Form } from 'antd';
import InputOrderTable from './inputOrderTable';

const { Header, Content, Footer } = Layout;

class App extends React.Component{

    render(){
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: "0 10px"}}>
                    <Breadcrumb style={{margin: "16px 0"}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <InputOrderTable />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Si Wu Tang</Footer>
            </Layout>
        )
    }
}

export default App;