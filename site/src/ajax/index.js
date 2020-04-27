import axios from "axios";
import api from "../api/index";
import configObj from "../config";
import { message } from 'antd';
const service = axios.create({
    timeout: 50000,
    headers: {
        "Content-Type": "application/json"
    }
});

// request拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    res => {
        if (!res) {
            message.error('服务器无响应');
        }

        if (res.status !== 200) { //status =200 代表响应成功
            message.error('提示' + res.message)
            return Promise.reject(res)
        } else {
            // let msg = res.data.message;
            // res.data.code === 400 && $alert(msg);
            // res.data.code === 401 && window.$LoginModule.show('login', true);
            // res.data.code === 405 && $alert(msg);
            // res.data.code === 500 && $alert(msg);
            // if (res.data.code === 404) {
            //     $alert(msg);
            //     window.location.href = window.location.origin + "/404"
            // }
            // 200  正常
            // 500  服务器内部错误
            // 400  错误的请求
            // 401   登录态失效
            // 404  请求路径错误或商品不存在
            // 405   请求方式错误，POST请求或GET请求不符合接口规定
            return res.data
        }
    },
    error => {
        console.log(error.message);

        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            message.error('网络超时')
            return Promise.reject(error); // reject这个错误信息
        }
        return Promise.reject(error);
    }
);


/**
 * 统一请求方法
 * @param apiName {string} 方法名
 * @param params {string} 参数
 * @param config {object} 自定义配置请求
 * @return {promise}
 */
const Ajax = async (apiName, params, config) => {
    if (typeof api[apiName] !== "object") { //检查 方法名是否写错
        throw new Error("调用api函数函数错误，请检查函数名称是否错误" + apiName);
    }

    let newConfig = JSON.parse(JSON.stringify(api[apiName])); //深拷贝方法名

    //存headers
    const { headers = [] } = newConfig;
    //清空
    newConfig.headers = {};
    //再循环遍历复制 意义何在？？
    if (headers.length > 0) {
        headers.forEach(({ key, value }) => {
            newConfig.headers[key] = value;
        });
    }

    newConfig.params = Object.assign({}, api[apiName].params, params || {}) //合并参数

    /* 
     configObj[newConfig.interFaceType] : url配置中有对应的key  如：jie:'/jie' 则API配置中这样  interFaceType:'jie' 用于代理
    */
    if (newConfig.interFaceType && configObj[newConfig.interFaceType]) {
        newConfig.url = configObj[newConfig.interFaceType] + newConfig.url;
    } else if (newConfig.interFaceType === 'full') {
    } else {
        (!process.client) && (newConfig.url = configObj.baseUrl + newConfig.url)
    }

    return service(newConfig);
};

export default Ajax;