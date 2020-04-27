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
        //http://bt.zyj1221.club
        url: "/system?action=GetNetWork",
        interFaceType: 'bt',
        // headers: [{
        //     key: "Content-Type",
        //     value: "application/json"
        // }, {
        //     key: 'x-cookie-token',
        //     value: 'j2x0DtLvU8xzBXDqk5XBuFFadhapVtkn9BkzUKhuYw2eWEQK'
        // }],
        method: "post",
    }
}