import React, { Component } from 'react';
import './index.scss'
import { Row, Col } from 'antd';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="header">
                <div className="con">
                    <img style={{width:'100px',height:'100px'}} src="../../assets/img/menu-bg-1.jpg" alt="" srcset="" />
                    <div className="nav-w">
                        <div className="side left-side"></div>
                        <div className="side right-side"></div>
                        <div className="nav">
                            <Row>
                                <Col span={8}><div className="left">1</div></Col>
                                <Col span={8}><div className="center">2</div></Col>
                                <Col span={8}><div className="right">3</div></Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;