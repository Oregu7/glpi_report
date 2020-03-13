const { getItilsolutions } = require("./db");
const WorksCollection = require("./components/works");

async function main() {
    const itilsolutions = await getItilsolutions();
    console.log(itilsolutions);
    const ticketsInfo = itilsolutions.map(createTicketInfo);
    const totalSum = calculateTotalSum(ticketsInfo);
    console.log(totalSum);
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

function calculateTotalSum(ticketsInfo) {
    const totalSum = ticketsInfo.reduce((accumulator, ticketInfo) => {
        return accumulator + ticketInfo.price;
    }, 0);
    return totalSum;
}

main().then(console.log);