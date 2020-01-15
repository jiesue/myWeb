import React, { Component } from 'react';
// import Button from 'antd/lib/button';
import { Button } from 'antd';
import './home.scss'

import Header from "@/components/header";

function MyWeb() {
    return (
        <div className="wrap">
            <Header />
            <Button type="primary">Button</Button>
        </div>
    )
}

export default MyWeb;