import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import JSONP from 'jsonp'
import './index.scss'
//封装jonsp为promise对象
function jsonp(url, opts = {}) {
    return new Promise((resolve, reject) => {
        JSONP(url, opts, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

class SearchCom extends Component {
    constructor() {
        super();
        this.state = {
            val: "",
            arr: [],
            index: -1,
        }
    }
    handleChange = async (e) => {
        this.setState({ val: e.target.value });
        let { s } = await jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + this.state.val, { param: "cb" });
        this.setState({ arr: s });
    }
    handleKeyUp = (e) => {
        let keyCode = e.keyCode;
        if (keyCode === 38 || keyCode === 40) {
            if (keyCode === 38) {
                this.setState({ index: this.state.index - 1 })
                if (this.state.index < 0) {
                    this.setState({ index: this.state.arr.length - 1 });
                }
                //根据上下键切换，则给表单时面赋不同的值
                e.target.value = this.state.arr[this.state.index + 1];
                this.setState({ val: e.target.value });
            } else {
                this.setState({ index: this.state.index + 1 })
                if (this.state.index >= this.state.arr.length - 1) {
                    this.setState({ index: -1 });
                }
                //根据上下键切换，则给表单时面赋不同的值
                e.target.value = this.state.arr[this.state.index + 1];
                this.setState({ val: e.target.value });
            }
        }
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            //https://www.baidu.com/s?wd=xxx  百度的查询接口
            window.open('https://www.baidu.com/s?wd=' + this.state.val, '_blank');
            this.refs.input.focus();
        }
    }
    handleSearchBtn = (e) => {
        //https://www.baidu.com/s?wd=xxx  百度的查询接口
        window.open('https://www.baidu.com/s?wd=' + this.state.val, '_blank');
        this.refs.input.focus();
    }
    componentDidMount() {
        //生命周期，在组件加载完成后，让input聚焦 (focus)
        // this.refs.input.focus();
    }
    handleMouseEnter = (key, item, event) => {
        // this.setState({ index: key, val: item });
        // this.refs.input.value = item;
    }
    handleTipsClick = (item) => {

        this.setState({ val: item });
        this.refs.input.focus();
    }
    handleBlur = () => {
        setTimeout(() => {
            this.setState({
                arr: []
            })
        }, 300);

    }
    render() {
        return (
            <div className='SearchCom'>

                <img className="baidu-log" src="https://www.baidu.com/img/pc_1c6e30772d5e4103103bd460913332f9.png" alt="jie"></img>
                <div className="search-area">
                    <input type="text" ref='input' onBlur={this.handleBlur} value={this.state.val} onChange={this.handleChange} onKeyDown={this.handleKeyDown} className='form-control' placeholder='please input your keyword' />
                    {

                        this.state.arr.length > 0 && <ul className='list-group'>
                            {this.state.arr.map((item, key) => {
                                return <li onClick={() => this.handleTipsClick(item)} className={key === this.state.index ? 'list-group-item active' : "list-group-item"} key={key}>{item}</li>
                            })}
                        </ul>
                    }
                    <span className="search-btn" onClick={this.handleSearchBtn}>搜索</span>

                </div>

            </div>
        )
    }
}

//简单的实现数据v-model实现   一定要用defaultValue  如果直接用value 则会将值写死，不会再改变了
export default SearchCom;
