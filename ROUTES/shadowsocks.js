const router = require("express").Router();
const axios = require("axios");

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
        // console.log(r.data);
        let ss = [];
        r.data.data.forEach(v => {
            let name = new Buffer(`${v[6]} - iShadowsocks`).toString("base64");
            let group = new Buffer("iShadowsocks").toString("base64");
            let s = "ssr://" + new Buffer(`${v[1]}:${v[2]}:origin:${v[3]}:plain:${v[4].toString()}/?obfsparam=&remarks=${name}&group=${group}`).toString("base64");
            console.log(`ssr://${v[1]}:${v[2]}:origin:${v[3]}:plain:${v[4].toString()}/?obfsparam=&remarks=${name}&group=${group}`);
            ss.push(s);
        });
        res.status(200).send(new Buffer(ss.join("\r\n")).toString("base64"));
    }).catch(err => {
        res.status(404).send(err.message);
    });
});