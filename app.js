const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const json2xls = require("json2xls");
const { getItilsolutions } = require("./appShared/db");
const { createTotalReport, createTotalWorksReport } = require("./appShared/reports");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/reports", async(req, res) => {
    const { id = 0, dateFrom = "", dateTo = "" } = req.body;

    if (!id)
        return res.status(404);

    const response = await reportResponseHandler(id, dateFrom, dateTo);
    return res.status(200).json(response);
});

app.get("/download/report", async(req, res) => {
    const { id = 0, dateFrom = "", dateTo = "" } = req.query;
    
    const response = await reportResponseHandler(id, dateFrom, dateTo);
    const xlsx = json2xls(response.rows);

    res.writeHead(200, {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-disposition": "attachment;filename=" + `${response.name}.xlsx`,
        "Content-Length": xlsx.length,
    });
    res.end(Buffer.from(xlsx, "binary"));
});

async function reportResponseHandler(id, dateFrom, dateTo) {
    let response = {};
    const itilsolutions = await getItilsolutions(dateFrom, dateTo);
    switch (id) {
        case "1":
            response = createTotalReport(itilsolutions);
            response.name = "total_report";
            break;
        case "2":
            response = createTotalWorksReport(itilsolutions);
            response.name = "works_report";
            break;
        default:
            response = createTotalReport(itilsolutions);
            response.name = "total_report";
    }

    return response;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;