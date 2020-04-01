const WorksCollection = require("./components/works");

// Report: считаем общую сумму
function createTotalReport(itilsolutions) {
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    const totalSum = ticketsInfo.reduce((accumulator, ticketInfo) => {
        return accumulator + ticketInfo.price;
    }, 0);
    const worksCount = ticketsInfo.reduce((accumulator, ticketInfo) => {
        return accumulator + ticketInfo.works.length;
    }, 0);
    const result = [{ worksCount, totalSum, ticketsCount: ticketsInfo.length }];

    return compileReport(result);
}

// Report: считаем сумму по работам
function createTotalWorksReport(itilsolutions) {
    const worksList = WorksCollection.createWorksDataCopy();
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    for (const ticketInfo of ticketsInfo) {
        for (const workCode of ticketInfo.works) {
            const work = WorksCollection.getWorkByCode(workCode, worksList);

            if (work) {
                work.count += 1;
                work.ticketList.push(ticketInfo.itemID);
            }
        }
    }
    const result = worksList.map((work) => {
        work.sum = work.price * work.count;
        work.ticketList = work.ticketList.join(",");
        delete work.type;

        return work;
    });

    return compileReport(result);
}

// парсим список работ по заявке
function parseTicketWorks(content) {
    const workRegexp = /\d{2}\.\d{2}\.\d{4}/g;
    const works = content.match(workRegexp);
    return works || [];
}

// создаем информацию о заявке
function createTicketInfo(ticket) {
    const { name, id, content, items_id: itemID } = ticket;
    const works = parseTicketWorks(content);
    const price = WorksCollection.calculateWorksSum(works);
    return { id, itemID, name, works, price };
}

// компилируем отчет
function compileReport(data) {
    const fields = Object.keys(data[0]);
    return { fields, rows: data };
}

module.exports = {
    createTotalReport,
    createTotalWorksReport,
};