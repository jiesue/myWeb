import React, { Component } from 'react'
import './index.scss'
import { Checkbox } from 'antd';
import {
    StopOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
function willdo(props) {
    return (
        <li>


        </li>
    );
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            willDo: [1, 2, 3],
            hadDone: [4, 5, 6, 7]
        }
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        return (
            <div className="todo-list">
                <h3>ToDoList</h3>
                <img src="static/123.png"/>
                <div className="inner">
                    <h4><span>正在进行</span><span>{this.state.willDo.length}</span></h4>
                    <ul className="list">
                        {
                            this.state.willDo.map(item => {
                                return (
                                    <li key={item}>
                                        <div className="bar"></div>
                                        <span className="del"><StopOutlined /></span>
                                        <Checkbox onChange={this.onChange}>
                                            <span className="text"> {item}</span>
                                        </Checkbox>
                                    </li>
                                );
                            })

                        }
                    </ul>
                    <h4><span>已经完成</span><span>{this.state.hadDone.length}</span></h4>
                    <ul className="list">
                        {
                            this.state.hadDone.map(item => {
                                return (
                                    <li key={item}>
                                        <div className="bar"></div>
                                        <span className="del"><StopOutlined /></span>
                                        <Checkbox onChange={this.onChange}>
                                            <span className="text"> {item}</span>
                                        </Checkbox>
                                    </li>
                                );
                            })

                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default TodoList;