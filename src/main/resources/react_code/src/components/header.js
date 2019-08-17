import React, {Component} from 'react';
import { Row, Col, Input } from 'antd';
import '../css/homepage.css';

class HeaderComponent extends Component{

    render(){

        return (
            <Row style={{marginBottom:10}}>
                <Col span={11}>
                    <Row>
                        <span className="huaWenKaiTi">謝朝華于已披, 啓夕秀于未振</span>
                    </Row>
                    <Row>
                        <div className="lineBorder"></div>
                    </Row>
                </Col>
                <Col span={2} style={{textAlign: "center"}}>
                    <img src="/images/logo.png" height="50px"/>
                </Col>
                <Col span={11}>
                    <Row>
                        <span className="huaWenKaiTi" style={{visibility: "hidden"}}>謝朝華于已披, 啓夕秀于未振</span>
                    </Row>
                    <Row>
                        <div className="lineBorder"></div>
                    </Row>
                </Col>
            </Row>
        )
    }

}

export default HeaderComponent;