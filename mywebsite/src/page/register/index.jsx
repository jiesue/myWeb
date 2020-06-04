import React, { Component } from 'react';

// import Button from 'antd/lib/button';
// import { Button } from 'antd';
import MD5 from 'md5';

import './index.scss'
const axios = require('axios')
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            username: '',
            password: '',
            hobby: ''
        }
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault();
        // console.log(this.refs.form);
        var fd = new FormData(document.getElementById('form'));
        // fd.append('file2',this.file)
        // fd.append('jie',111)
        let pwd = MD5(fd.get('password'))
        fd.delete('password')
        fd.append('pwd',pwd)
        axios.post('http://10.0.147.180:3000/v1/register', fd).then(res => {
            console.log(res);
        })
    }
    file = (e) => {
        this.file = e.target.value
        console.log(this.file);

    }
    render() {
        return (
            <div className="register">
                <form id="form" ref='form' method="post" action="http://10.0.147.180:3000/v1/register" encType="multipart/form-data">
                    选择文件:<input onChange={this.file} type="file" accept='image/png,image/jpeg' multiple name="avatar" />
                    <br />
                username：<input type="text" name="username" /> <br />
                password:<input type="password" name="password" /> <br />
                hobby：<input type="text" name="hobby" /> <br />
                    <br />
                    <button type="submit" onClick={this.submit}>提交</button>
                </form>

            </div>

        );
    }
}

export default Register;


// function j() {
//     $('#uploadFile').on('change', function (e) {
//         var file = this.files[0]

//         var formData = new FormData()
//         formData.append('file', file)

//         $.ajax({
//             url: 'xxxx',
//             type: 'post',
//             data: formData,
//             cache: false,
//             contentType: false,
//             processData: false,
//             success: function (res) {
//                 //
//             },
//         })
//     })
// }
