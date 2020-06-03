import React, { Component } from 'react';

// import Button from 'antd/lib/button';
// import { Button } from 'antd';
import MD5 from 'md5';

import './index.scss'
const axios = require('axios')
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault();
        // console.log(this.refs.form);
        var fd = new FormData(document.getElementById('form'));
        console.log(fd);
        axios.post('http://10.0.147.180:3000/v1/register', { params: fd }).then(res=>{
            console.log(res);
            
        })
    }
    render() {
        return (
            <div className="register">
                <form id="form" ref='form' method="post" action="http://10.0.147.180:3000/v1/register" enctype="multipart/form-data">
                    选择文件:<input type="file" accept='image/png,image/jpeg' multiple name="avatar" />
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
