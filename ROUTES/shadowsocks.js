const router = require("express").Router();
const axios = require("axios");

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
        // console.log(r.data);
        let ss = [];
        if(r.data) {
            r.data.forEach(v => {
                let name = new Buffer(`${v[6]} - ${v[5]}`).toString('base64');
                let s = new Buffer(`${v[1]}:${v[2]}:origin:${v[3]}:plain:${v[4]}/?obfsparam=&remarks=${name}&group=aXNoYWRvd3NvY2tzLmhlcm9rdWFwcC5jb20vc2hhZG93c29ja3MK`).toString("base64");
                // console.log(s);
                ss.push(s);
            });
            res.status(200).send(ss.join("\r\n"));
        } else {
            res.status(404).send(r);
        }
    }).catch(err => {
        res.status(404).send(err.message);
    });
});