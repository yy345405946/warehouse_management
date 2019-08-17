import React, {Component} from 'react';
import { Row, Col } from 'antd';

class FooterComponent extends Component{

    render(){
        return (
            <Row className="border">
                <Col span={8}>
                    <Row>
                        <img src="/images/weixin.png" style={{visibility: "hidden"}} />
                        <img src="/images/weibo.png" style={{visibility: "hidden"}} />
                    </Row>
                    <Row>
                        <Col span={2}>
                            <img src="/images/zhizhao.png" />
                        </Col>
                        <Col span={22}>
                            地址上海市靜安區鎮寧路200號欣安大廈西嵾27B-D浥ICP備11034040號
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row>
                        <img src="/images/weixin.png" style={{visibility: "hidden"}} />
                        <img src="/images/weibo.png" style={{visibility: "hidden"}} />
                    </Row>
                    <Row>
                        © 2018 Copyright Siwu tang. All rights seserved
                    </Row>
                </Col>
                <Col span={9}>
                    <Row style={{float: "right"}}>
                        <Row gutter={32}>
                            <Col span={16}></Col>
                            <Col span={4}>
                                <img src="/images/weixin.png" />
                            </Col>
                            <Col span={4}>
                                <img src="/images/weibo.png" />
                            </Col>
                        </Row>
                        <Row>
                            四物堂隸屬于上海朝華文化傳播有限公司
                        </Row>
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default FooterComponent;