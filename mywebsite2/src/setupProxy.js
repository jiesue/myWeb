const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/bt", {
            target: "http://bt.zyj1221.club",
            autoRewrite:'',
            changeOrigin: true
        })
    );
};