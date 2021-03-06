const Sequelize = require("sequelize");
const config = require("config");
const database = config.get("database");

const sequelize = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    dialect: "mysql",
    logging: false,
});


async function getItilsolutions(dateFrom, dateTo) {
    let dateWhere = createDateWhere(dateFrom, dateTo);
    let sqlQuery = "SELECT id, items_id, content FROM glpi_itilsolutions WHERE itemtype='Ticket'";

    if (dateWhere) {
        sqlQuery += ` AND ${dateWhere}`;
    }

    const [data] = await sequelize.query(sqlQuery);
    return data;
}

function createDateWhere(dateFrom, dateTo, fieldName = "date_creation") {
    let where = fieldName;
    if (!isDate(dateFrom) && !isDate(dateTo)) {
        return "";
    } else if (isDate(dateFrom) && isDate(dateTo)) {
        where += ` BETWEEN '${dateFrom}' AND '${dateTo}'`;
    } else if (isDate(dateFrom) && !isDate(dateTo)) {
        where += ` >= '${dateFrom}'`;
    } else {
        where += ` <= '${dateTo}'`;
    }

    return where;
}

function isDate(date) {
    return Date.parse(date);
}

module.exports = {
    sequelize,
    getItilsolutions,
};