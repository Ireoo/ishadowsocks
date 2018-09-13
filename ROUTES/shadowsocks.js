const router = require("express").Router();
const axios = require("axios");
const {Base64} = require('js-base64');
const freeShadowsocks = require("free-shadowsocks");

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    freeShadowsocks().then(data => {
        // console.log(r.data);
        let ss = [];
        data.forEach(v => {
            let name = Base64.encode(`iShadowsocks free`);
            let group = Base64.encode("iShadowsocks");

            let address = `${v.address}:${v.port}:origin:${v.method}:plain:${v.password}/?remarks=${name}&group=${group}`;
            let s = "ssr://" + Base64.encode(address).replace("=", "");
            console.log(`ssr://${address}`);
            ss.push(s);
        });
        res.status(200).send(Base64.encode(ss.join("\r\n")));
    }).catch(err => {
        res.status(404).send(err.message);
    });
});