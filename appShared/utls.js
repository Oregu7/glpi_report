const { getItilsolutions } = require("./db");
const WorksCollection = require("./components/works");

// считаем общую сумму
async function calculateTotalSum() {
    const itilsolutions = await getItilsolutions();
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    const totalSum = ticketsInfo.reduce((accumulator, ticketInfo) => {
        return accumulator + ticketInfo.price;
    }, 0);

    return totalSum;
}

// считаем сумму по работам
async function groupByWorksAndCalculateTotalSum() {
    const worksList = WorksCollection.createWorksDataCopy();
    const itilsolutions = await getItilsolutions();
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    for (const ticketInfo of ticketsInfo) {
        for (const workCode of ticketInfo.works) {
            const work = WorksCollection.getWorkByCode(workCode, worksList);

            if (work) {
                work.count += 1;
            }
        }
    }
    return worksList.map((work) => {
        work.sum = work.price * work.count;
        return work;
    });
}

// парсим список работ по заявке
function parseTicketWorks(content) {
    const workRegexp = /\d{2}\.\d{2}\.\d{4}/g;
    const works = content.match(workRegexp);
    return works || [];
}

// создаем информацию о заявке
function createTicketInfo(ticket) {
    const { name, id, content } = ticket;
    const works = parseTicketWorks(content);
    const price = WorksCollection.calculateWorksSum(works);
    return { id, name, works, price };
}

module.exports = {
    calculateTotalSum,
    groupByWorksAndCalculateTotalSum,
};