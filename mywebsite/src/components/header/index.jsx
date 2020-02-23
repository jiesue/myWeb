import React, { Component } from 'react';
import './index.scss'
import BaiduSearch from '../baiduSearch'
import Ajax from '@/ajax'
import { Row, Col } from 'antd';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        Ajax('getWeather', {
            appid: '98634563',
            appsecret: 'GAE2VAcM',
            version: 'v6',
            vue: 1
        });
    }
    render() {
        return (
            <div className="header">
                <div className="con">

                    <section className="stage">
                        <figure className="ball">
                            <span className="shadow"></span>
                            <span className="eight"></span>
                        </figure>
                    </section>
                    <section className="stage2">
                        <figure className="ball">
                            <span className="shadow"></span>
                            {/* <span className="eight"></span> */}
                            <span className="iris"></span>
                        </figure>
                    </section>

                    <div className="weather">
                        <iframe title="天气" scrolling="no" src="https://tianqiapi.com/api.php?style=tr&skin=grape&city=广州" frameBorder="0" width="300" height="190" allowtransparency="true"></iframe>˝
                    </div>
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
                                        <div className="item">
                                            <a href="/"> <span className=''>导航4</span></a>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="center">
                                        <div className="item">
                                            <a href="/"> <span className=''>导航0</span></a>
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
                                        <div className="item">
                                            <a href="/"> <span className=''>导航4</span></a>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="right">
                                        <BaiduSearch />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;