const freeShadowsocks = require("free-shadowsocks");

freeShadowsocks().then(data => {
    console.log(data);
});