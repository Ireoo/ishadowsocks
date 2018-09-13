const fs = require("fs");
const path = require("path");

const router = require("express").Router();
const axios = require("axios");
const {Base64} = require('js-base64');
const gitPullOrClone = require("git-pull-or-clone");

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {


 
    gitPullOrClone('git@github.com:feross/standard.git', path.join(process.cwd(), "sub"), (err) => {
        if (err) return res.status(404).send(err);
        let ss = fs.readFileSync(path.join(process.cwd(), "sub", "ssshare.com"), "utf8");
        res.status(200).send(ss);
    });

    // axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
    //     // console.log(r.data);
    //     // let ss = [];
    //     // r.data.data.forEach(v => {
    //     //     let name = Base64.encode(`${v[6]} - iShadowsocks`);
    //     //     let group = Base64.encode("iShadowsocks");
    //     //     let ip = v[1],
    //     //         port = v[2],
    //     //         code = v[3],
    //     //         pass = v[4];
    //     //     let address = `${ip}:${port}:origin:${code}:plain:${pass}/?remarks=${name}&group=${group}`;
    //     //     let s = "ssr://" + Base64.encode(address).replace("=", "");
    //     //     console.log(`ssr://${address}`);
    //     //     ss.push(s);
    //     // });
    //     // res.status(200).send(Base64.encode(ss.join("\r\n")));
    //     res.status(200).send(r.data);
    // }).catch(err => {
    //     res.status(404).send(err.message);
    // });
});