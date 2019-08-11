import React from 'react';
import { Layout, Menu, Breadcrumb, Form } from 'antd';
import HeaderContent from '../components/header';
import FooterContent from '../components/footer';
import InputOrderTable from './inputOrderTable';

const { Header, Content, Footer } = Layout;

class App extends React.Component{

    render(){
        return (
            <Layout className="layout">
                <Header>
                    <HeaderContent />
                </Header>
                <Content style={{padding: "0 10px"}}>
                    <div style={{ background: '#fff', padding:24, minHeight: 280 }}>
                        <InputOrderTable />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <FooterContent />
                </Footer>
            </Layout>
        )
    }
}

export default App;