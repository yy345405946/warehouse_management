import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import InputOrderTable from './order/inputOrderTable';
import CategoryTable from './category/categoryTable';
import Analysis from './analysis/Analysis';

const { Sider, Header, Content, Footer } = Layout;

const menuMap = {
  "1" : <InputOrderTable />,
  "2" : <CategoryTable />,
  "3" : <Analysis isSummary="year" />,
  "4" : <Analysis isSummary="month"/>,
  "5" : <Analysis />
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      selectedKey: '1'
    }
  }

  handleChange = e => {
    this.setState( { selectedKey: e.key } );
  }

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider width={150}>
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onSelect={this.handleChange}
            >
              <Menu.Item key="1">
                <span>
                  <Icon type="cluster" />
                  <span>仓库管理</span>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>
                  <Icon type="cluster" />
                  <span>类别管理</span>
                </span>
              </Menu.Item>
              <Menu.SubMenu 
                key="sub2" 
                title={
                  <span>
                    <Icon type="pie-chart" />
                    <span>报表分析</span>
                  </span>
                }
              >
                <Menu.Item key="3">年度总结</Menu.Item>
                <Menu.Item key="4">月度总结</Menu.Item>
                <Menu.Item key="5">月度详细</Menu.Item>
              </Menu.SubMenu>
            </Menu>
        </Sider>
        <Layout className="swt-layout">
          <Content>
            <div style={{ background: '#fff', padding: 24, minHeight: '100%' }}>
              {
                menuMap[this.state.selectedKey]
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}