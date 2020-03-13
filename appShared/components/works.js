const _ = require("lodash");
const worksData = require("./works-data.json");

function getWorkByCode(code, data = worksData) {
    return _.find(data, { code });
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