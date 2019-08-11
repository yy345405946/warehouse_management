import React, {Component} from 'react';
import { Row, Col } from 'antd';

class FooterComponent extends Component{

    render(){
        return (
            <Row className="swt-footer border" gutter={128}>
                <Col span={8}>
                    <Row>
                        <Col span={3}>
                            <img src="http://localhost:8443/images/homepage/zhizhao.png" />
                        </Col>
                        <Col span={21}>
                            地址上海市靜安區鎮寧路200號欣安大廈西嵾27B-D浥ICP備11034040號
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row>
                        <img src="/weixin.png" style={{visibility: "hidden"}} />
                        <img src="/weibo.png" style={{visibility: "hidden"}} />
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
                                <img src="http://localhost:8443/images/homepage/weixin.png" />
                            </Col>
                            <Col span={4}>
                                <img src="http://localhost:8443/images/homepage/weibo.png" />
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