/**
 * Created by S2 on 15/7/7.
 */
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");

/**
 * 显示访问信息
 */
app.use(
	morgan(
		'[:date[iso]] :remote-addr[:remote-user] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
	)
);

/**
 * 添加gzip
 */
app.use(compression());

/**
 * 允许跨域访问
 */
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

/**
 * 路由规则
 */
app.use("/", require("./SERVER/routes"));

/**
 * 设置服务器端口默认为80
 */
const server = app.listen(process.env.PORT || 2018, () => {
	console.log("Listening on port %s:%d", server.address().address, server.address().port);
});

/**
 * 处理错误
 */
process.on("uncaughtException", error => {
	console.log("Caught exception: ", error);
});