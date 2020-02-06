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
    }
}