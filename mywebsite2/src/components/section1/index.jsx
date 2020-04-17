import React, { Component } from 'react';
import './index.scss'
import { Progress } from 'antd';
import Ajax from '../../ajax'
import md5 from 'md5'
import Cookie from 'js-cookie'
export default class Section1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 100
    }
  }
  componentDidMount() {

    this.getSystem()



  }
  getSystem = () => {
    let api_sk = 'EV15kZLxyWnKyjbWHxdFmAaLVksmIiAI';
    let request_time = Math.round(new Date().getTime() / 1000);
    let request_token = md5(request_time.toString() + md5(api_sk))
    Cookie.set('request_token',request_token)
    Ajax('getSystem', {
      // api_sk,
      // request_time,
      // request_token
    }).then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <div className="section1">
        <div className="con">
          <Progress
            type="circle"
            width={200}
            status="normal"
            strokeWidth="10"
            strokeColor={{
              '0%': '#f0f',
              '100%': '#f0f',
            }}
            percent={this.state.progress}
          />
        </div>
      </div>
    );
  }
}
