const router = require("express").Router();
const axios = require("axios");

exports = module.exports = router;

router.auth = true;
// router.path = "/";

router.all("/", (req, res, next) => {
    console.log(req.body, req.params, req.query, req.data);
    axios.get(`https://free-ss.site/ss.json?_=${new Date().getTime()}`).then(r => {
        console.log(r);
        res.status(200).send(r.data);
    }).catch(err => {
        res.status(404).send(err);
    });
});