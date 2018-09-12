const router = require("express").Router();
const axios = require("axios");
const base64js = require('base64-js');

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
        // console.log(r.data);
        let ss = [];
        r.data.data.forEach(v => {
            let name = base64js(`${v[6]} - iShadowsocks`);
            let group = base64js("iShadowsocks");
            let ip = v[1],
                port = v[2],
                code = v[3],
                pass = v[4];
            let address = `${ip}:${port}:origin:${code}:plain:${pass}/?remarks=${name}&group=${group}`;
            let s = "ssr://" + base64js(address);
            console.log(`ssr://${address}`);
            ss.push(s);
        });
        res.status(200).send(base64js(ss.join("\r\n")));
    }).catch(err => {
        res.status(404).send(err.message);
    });
});