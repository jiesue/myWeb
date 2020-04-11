export default {
    getData: {
        url: "learningCenter/webapi/replayList",
        headers: [{
            key: "Content-Type",
            value: "application/json"
        }],
        method: "get",
        params: {}
    },
    getWeather: {
        url: "https://tianqiapi.com/api",
        interFaceType: 'full',//完整链接
        headers: [{
            key: "Content-Type",
            value: "application/json"
        }],
        method: "get",
    },
    getSystem: {
        url: "http://bt.zyj1221.club/system?action=GetNetWork",
        interFaceType: 'full',//完整链接
        headers: [{
            key: "Content-Type",
            value: "application/json"
        }, {
            key: 'x-cookie-token',
            value: 'oBXMHFbmcz9mXcdOw7ZqdkTSDznG1YaATuSxSx9QVoqCxuVS'
        }],
        method: "post",
    }
}