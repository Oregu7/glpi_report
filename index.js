const fs = require("fs");
const { calculateTotalSum, groupByWorksAndCalculateTotalSum } = require("./appShared/utls");

calculateTotalSum()
    .then(console.log)
    .catch(console.error);

groupByWorksAndCalculateTotalSum()
    .then((worksList) => {
        fs.writeFileSync("workPrices.json", JSON.stringify(worksList));
        console.log(worksList);
    })
    .catch(console.error);