/*const fs = require("fs");
const { getItilsolutions } = require("./appShared/db");
const { createTotalReport, createTotalWorksReport } = require("./appShared/reports");

async function main() {
    const itilsolutions = await getItilsolutions();
    const totalReport = createTotalReport(itilsolutions);
    const totalWorksReport = createTotalWorksReport(itilsolutions);

    console.log(totalReport);
    fs.writeFileSync("workPrices.json", JSON.stringify(totalWorksReport));
}

main().catch(console.error);*/
const http = require("http");
const app = require("../app");

http.createServer(app).listen(3000);