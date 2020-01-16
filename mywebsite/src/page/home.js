import React, { Component } from 'react';
// import Button from 'antd/lib/button';
import { Button } from 'antd';
import './home.scss'

import Header from "@/components/header";
import Banner from "@/components/banner";

function MyWeb() {
    return (
        <div className="wrap">
            <Header />
            <Banner />
        </div>
    )
}

export default MyWeb;