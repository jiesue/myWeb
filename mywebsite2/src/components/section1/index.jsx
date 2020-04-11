import React, { Component } from 'react';
import './index.scss'
import { Progress } from 'antd';
import Ajax from '../../ajax'

export default class Section1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress:100
    }
  }
  componentDidMount(){
    Ajax('getSystem').then(res=>{
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
