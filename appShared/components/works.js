const _ = require("lodash");
const worksData = require("./works-data.json.js");

function getWorkByCode(code) {
    return _.find(worksData, { code });
}

function getWorkPrice(code) {
    const work = getWorkByCode(code);
    return work ? work.price : 0;
}

function calculateWorksSum(works) {
    const sum = works.reduce((accumulator, code) => {
        return accumulator + getWorkPrice(code);
    }, 0);
    return sum;
}

function createWorksDataCopy() {
    return worksData.map((workData) => Object.assign({}, workData, { sum: 0, count: 0 }));
}

module.exports = {
    getWorkByCode,
    getWorkPrice,
    calculateWorksSum,
    createWorksDataCopy,
};