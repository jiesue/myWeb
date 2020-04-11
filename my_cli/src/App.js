import React from 'react'
import "@/App.css";
import "@/App1";
var test = () => {
    alert('jie888888888888888888888888888888888')
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // this.my = my.bind(this)
    }

    my() {
        alert(process.env.NODE_ENV)
        console.log(jie14);
    }
    jie = (e) => {  }
   
    render() {
        return (
            <div>
                <h1>这个是自己搭建的脚手架 参考步骤 ：<a href='https://www.jianshu.com/p/68e849768d8e'>如何从零开始创建React项目（三种方式）</a> </h1>
                <h2><a href="https://segmentfault.com/a/1190000019711348">https://segmentfault.com/a/1190000019711348</a></h2>
                <h3>待后续学习webpack完善。。。。。</h3>
                <img src='./assets/img/assets.png'></img>
                <button onClick={this.my}> 点击 </button>

            </div>
        )
    }
}

export default App