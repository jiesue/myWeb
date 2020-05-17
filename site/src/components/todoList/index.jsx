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
            hadDone: [4, 5, 6, 7],
            todoInputValue: '',
        }
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    todolistInput(e) {
        // console.log(e.target.value)
        this.setState({ todoInputValue: e.target.value })
    }
    enterHandle = (e) => {
        // console.log('enter', e.keyCode)

        if (e.keyCode == 13) {
            e.target.blur()
            let willDoL = this.state.willDo.unshift(this.state.todoInputValue)
            this.setState({ todoInputValue: '' })
        }
    }
    todolistFocus() {
        document.addEventListener('keydown', this.enterHandle, false)
    }
    todolistBlur() {
        document.removeEventListener('keydown', this.enterHandle, false)
    }
    delWilldo = (e) => {
        let i = e.currentTarget.dataset.index;
        this.state.willDo.splice(i, i + 1);
        this.setState({
            willdo: this.state.willDo,
        })
    }
    complete = (i,e) => {
        let t = this.state.willDo.splice(i, i + 1);
        let hadDone = this.state.hadDone.concat(t)
        this.setState({
            willdo: this.state.willDo,
            hadDone: hadDone
        })
    }
    render() {
        return (
            <div className="todo-list">
                <h3>ToDoList</h3>
                <p className="input-w" >
                    <input type="text" disabled={this.state.willDo.length > 4} value={this.state.todoInputValue} onBlur={this.todolistBlur.bind(this)} onFocus={this.todolistFocus.bind(this)} onChange={this.todolistInput.bind(this)} placeholder="添加任务" />
                </p>
                <div className="inner">
                    <h4><span>正在进行</span><span>{this.state.willDo.length}</span></h4>
                    <ul className="list">
                        {
                            this.state.willDo.map((item, index) => {
                                return (
                                    <li key={item}>
                                        <div className="bar"></div>
                                        <span className="del" data-index={index} onClick={this.delWilldo}><StopOutlined /></span>
                                        <Checkbox onChange={this.complete.bind(this,index)}>
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
                                    <li key={item} style={{ opacity: 0.5 }}>
                                        <div className="bar"></div>
                                        <span className="del"><StopOutlined /></span>
                                        <Checkbox checked>
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