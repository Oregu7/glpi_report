const config = require("config");
const https = require("https");
const fs = require("fs");

const app = require("../app");
const httpsOptions = {
    key: fs.readFileSync(config.get("server.serverKey")),
    cert: fs.readFileSync(config.get("server.serverCrt")),
};

https.createServer(httpsOptions, app).listen(3000);