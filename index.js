const { getItilsolutions } = require("./db");
const WorksCollection = require("./components/works");

async function main() {
    const itilsolutions = await getItilsolutions();
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    const totalSumm = calculateTotalSumm(ticketsInfo);
}

// парсим список работ по заявке
function parseTicketWorks(content) {
    const workRegexp = /\d{2}\.\d{2}\.\d{4}/g;
    const works = content.match(workRegexp);
    return works || [];
}

// считаем общую цену по заявке
function calculateTicketPrice(works) {
    let summ = 0;
    for (const work of works) {
        summ += WorksCollection.getPrice(work);
    }
    return summ;
}

// создаем информацию о заявке
function createTicketInfo(ticket) {
    const { name, id, content } = ticket;
    const works = parseTicketWorks(content);
    const price = calculateTicketPrice(works);
    return { id, name, works, price };
}

function calculateTotalSumm(ticketsInfo) {
    const totalSumm = ticketsInfo.reduce((accumulator, ticketInfo) => {
        return accumulator + ticketInfo.price;
    }, 0);
    return totalSumm;
}
