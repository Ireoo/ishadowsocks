const router = require("express").Router();
const axios = require("axios");
const base64_encode = require('base64').encode;

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
        console.log(r.data);
        let ss = [];
        r.data.forEach(v => {
            let name = base64_encode(`${v[6]} - ${v[5]}`);
            let s = `${v[1]}:${v[2]}:origin:${v[3]}:plain:${v[4]}/?obfsparam=&remarks=${name}&group=aXNoYWRvd3NvY2tzLmhlcm9rdWFwcC5jb20vc2hhZG93c29ja3MK`;
            ss.push(s);
        });
        res.status(200).send(ss.join("\r\n"));
    }).catch(err => {
        res.status(404).send(err);
    });
});