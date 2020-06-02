import React, { /* Component */ } from 'react';
// import Button from 'antd/lib/button';
// import { Button } from 'antd';
import './index.scss'
function Register() {
    return (
        <div className="register">
            <form method="post" action="http://10.0.147.180:3000/v1/register" enctype="multipart/form-data">
                选择文件:<input type="file" name="jie1" />
                <br />
                标题：<input type="text" name="title" />
                <br />
                <button type="submit">提交</button>
            </form>

        </div>
    )
}

export default Register;