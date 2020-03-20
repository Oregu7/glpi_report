const http = require("http");
const Koa = require("koa");
const app = new Koa();

app.use((ctx, next) => {
    if (ctx.request.URL !== "/") return next();

    return ctx.response = "Hello World";
});

http.createServer(app.callback()).listen(3000);