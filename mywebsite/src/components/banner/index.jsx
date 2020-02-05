import React, { Component } from 'react';
import './index.scss'
import configObj from '@/config'
import { Carousel } from 'antd';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [
                { src: configObj.cdn + '/banner/1.jpg', link: 'http://www.baidu.com' },
                { src: configObj.cdn + '/banner/2.jpg', link: 'http://www.baidu.com' },
                { src: configObj.cdn + '/banner/3.jpg', link: 'http://www.baidu.com' },
                { src: configObj.cdn + '/banner/4.jpg', link: 'http://www.baidu.com' },
                { src: configObj.cdn + '/banner/5.jpg', link: 'http://www.baidu.com' },
                { src: configObj.cdn + '/banner/6.jpg', link: 'http://www.baidu.com' },
            ]
        }
    }
    render() {
        return (
            <div className="banner-w">
                <Carousel effect="fade" autoplay>
                    {
                        this.state.bannerList.map(item =>{
                            return (<div key={item.link}> <a href={item.link} > <img src={item.src}/></a></div>)
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

export default Banner;