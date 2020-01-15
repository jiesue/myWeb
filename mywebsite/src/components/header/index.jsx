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
                    <img style={{display:'block',zIndex:1111,border:'1px solid red', width: '100px', height: '100px' }} src={require('@/assets/img/menu-bg-1.jpg')}/>
                    <div className="nav-w">
                        <div className="side left-side"></div>
                        <div className="side right-side"></div>
                        <div className="nav">
                            <Row>
                                <Col span={8}>
                                    <div className="left">
                                        <div className="item">
                                            <a href="/"> <span className='iconfont'>&#xe701;</span></a>
                                        </div>
                                        <div className="item">
                                            <a href="/"> <span className=''>导航1</span></a>
                                        </div>
                                        <div className="item">
                                            <a href="/"> <span className=''>导航2</span></a>
                                        </div>
                                        <div className="item">
                                            <a href="/"> <span className=''>导航3</span></a>
                                        </div>
                                    </div>
                                </Col>
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