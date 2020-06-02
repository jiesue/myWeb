import React, { /* Component */ } from 'react';
// import Button from 'antd/lib/button';
// import { Button } from 'antd';
import './home.scss'

import Header from "@/components/header";
import Banner from "@/components/banner";
import Section1 from "@/components/section1";

function MyWeb() {
    return (
        <div className="wrap">
            <Header />
            <Banner />
            <Section1 />
        </div>
    )
}

export default MyWeb;